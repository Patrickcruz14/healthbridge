from fastapi import APIRouter, HTTPException
from app.models.facility_model import FacilityRequest, Facility
from typing import Optional, List
import httpx
import math

router = APIRouter(prefix="/facilities", tags=["Facilities"])

def haversine(lat1, lng1, lat2, lng2) -> float:
    R = 6371000
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lng2 - lng1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

def format_distance(meters: float) -> str:
    if meters < 1000:
        return f"{int(meters)} m"
    return f"{meters/1000:.1f} km"

def classify_facility(tags: dict) -> str:
    amenity = tags.get("amenity", "")
    healthcare = tags.get("healthcare", "")
    name = tags.get("name", "").lower()
    if "dots" in name or "tuberculosis" in name or " tb " in name:
        return "dots"
    if amenity == "hospital" or healthcare == "hospital":
        return "hospital"
    if "barangay" in name or "bhc" in name or "brgy" in name:
        return "bhc"
    if (amenity == "clinic" or healthcare in ["clinic", "health_centre"]
            or "health center" in name or "health centre" in name):
        return "health_center"
    return "health_center"

def is_free(tags: dict, facility_type: str) -> Optional[bool]:
    fee = tags.get("fee", "")
    if fee == "no":
        return True
    if fee == "yes":
        return False
    name = tags.get("name", "").lower()
    if any(k in name for k in ["barangay", "brgy", "health center", "bhc", "rural"]) or facility_type in ["bhc", "dots"]:
        return True
    return None

def has_philhealth(tags: dict) -> bool:
    name = tags.get("name", "").lower()
    return any(k in name for k in ["hospital", "medical", "clinic", "health center"])

@router.post("/nearby", response_model=List[Facility])
async def get_nearby_facilities(request: FacilityRequest):
    if request.facility_type == "hospital":
        query_filter = '["amenity"="hospital"]'
    elif request.facility_type in ["health_center", "bhc"]:
        # pinagsama na para hindi masyadong strict, i-filter na lang sa Python side
        query_filter = '["amenity"~"clinic|health_post"]'
    elif request.facility_type == "dots":
        query_filter = '["name"~"DOTS|tuberculosis|TB",i]'
    else:
        query_filter = '["amenity"~"hospital|clinic|health_post"]'

    overpass_query = f"""
    [out:json][timeout:25];
    (
      node{query_filter}(around:{request.radius},{request.lat},{request.lng});
      way{query_filter}(around:{request.radius},{request.lat},{request.lng});
    );
    out center tags;
    """

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                "https://overpass-api.de/api/interpreter",
                data={"data": overpass_query},
                headers={"User-Agent": "HealthBridge/1.0 (health facility locator app)"}
            )
            response.raise_for_status()
            data = response.json()
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Overpass API timeout. Subukan ulit.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching facilities: {str(e)}")

    facilities = []
    for element in data.get("elements", []):
        tags = element.get("tags", {})
        name = tags.get("name")
        if not name:
            continue

        if element["type"] == "node":
            fac_lat = element.get("lat")
            fac_lng = element.get("lon")
        else:
            center = element.get("center", {})
            fac_lat = center.get("lat")
            fac_lng = center.get("lon")

        if not fac_lat or not fac_lng:
            continue

        fac_type = classify_facility(tags)

        # mas loose na yung filtering — bhc at health_center magkasama na lang
        if request.facility_type == "bhc" and fac_type not in ["bhc", "health_center"]:
            continue
        if request.facility_type == "health_center" and fac_type not in ["health_center", "bhc"]:
            continue

        distance_m = haversine(request.lat, request.lng, fac_lat, fac_lng)

        address_parts = [
            tags.get("addr:full", ""),
            tags.get("addr:street", ""),
            tags.get("addr:city", ""),
        ]
        address = next((p for p in address_parts if p), "Tingnan sa mapa")

        facilities.append(Facility(
            id=str(element["id"]),
            name=name,
            type=fac_type,
            lat=fac_lat,
            lng=fac_lng,
            address=address,
            phone=tags.get("phone", tags.get("contact:phone", "—")),
            hours=tags.get("opening_hours", "—"),
            philhealth=has_philhealth(tags),
            free=is_free(tags, fac_type),
            distance=format_distance(distance_m),
            distanceKm=distance_m / 1000
        ))

    facilities.sort(key=lambda f: f.distanceKm)
    return facilities