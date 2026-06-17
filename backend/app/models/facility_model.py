from pydantic import BaseModel
from typing import Optional

class FacilityRequest(BaseModel):
    lat: float
    lng: float
    radius: int = 5000
    facility_type: Optional[str] = "all"

class Facility(BaseModel):
    id: str
    name: str
    type: str
    lat: float
    lng: float
    address: str
    phone: Optional[str] = "—"
    hours: Optional[str] = "—"
    philhealth: bool = False
    free: Optional[bool] = None
    distance: str
    distanceKm: float  # ← dagdag para sa proper sorting