import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import {
  userIcon,
  hospitalIcon,
  clinicIcon,
  pharmacyIcon,
} from "../assets/mapIcons";

function FacilitiesPage() {
  const navigate = useNavigate();

  const [position, setPosition] = useState([
    14.5995,
    120.9842,
  ]);

  const [loading, setLoading] = useState(true);

  const [facilities, setFacilities] = useState([]);

  const getDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const R = 6371e3;

    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;

    const Δφ =
      ((lat2 - lat1) * Math.PI) / 180;

    const Δλ =
      ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) *
        Math.sin(Δφ / 2) +
      Math.cos(φ1) *
        Math.cos(φ2) *
        Math.sin(Δλ / 2) *
        Math.sin(Δλ / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return Math.round(R * c);
  };

  const fetchNearbyFacilities = async (
    lat,
    lon
  ) => {
    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:10000,${lat},${lon});
        node["amenity"="clinic"](around:10000,${lat},${lon});
        node["amenity"="pharmacy"](around:10000,${lat},${lon});
      );
      out;
    `;

    try {
      const response = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          body: query,
        }
      );

      const data =
        await response.json();

      const processed =
        data.elements.map(
          (facility) => ({
            ...facility,
            distance: getDistance(
              lat,
              lon,
              facility.lat,
              facility.lon
            ),
          })
        );

      processed.sort(
        (a, b) =>
          a.distance - b.distance
      );

      setFacilities(processed);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const lat =
          location.coords.latitude;

        const lon =
          location.coords.longitude;

        setPosition([
          lat,
          lon,
        ]);

        fetchNearbyFacilities(
          lat,
          lon
        );

        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
  }, []);

  const hospitals = facilities
    .filter(
      (f) =>
        f.tags?.amenity ===
        "hospital"
    )
    .sort(
      (a, b) =>
        a.distance - b.distance
    )
    .slice(0, 3);

  const clinics = facilities
    .filter(
      (f) =>
        f.tags?.amenity ===
        "clinic"
    )
    .sort(
      (a, b) =>
        a.distance - b.distance
    )
    .slice(0, 3);

  const pharmacies = facilities
    .filter(
      (f) =>
        f.tags?.amenity ===
        "pharmacy"
    )
    .sort(
      (a, b) =>
        a.distance - b.distance
    )
    .slice(0, 3);

  const getIcon = (type) => {
    if (type === "hospital")
      return hospitalIcon;

    if (type === "clinic")
      return clinicIcon;

    if (type === "pharmacy")
      return pharmacyIcon;

    return userIcon;
  };

  const displayedFacilities = [
    ...hospitals,
    ...clinics,
    ...pharmacies,
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">
            Nearby Health Facilities
          </h1>

          <p className="text-gray-500">
            3 Nearest Hospitals,
            Clinics, and Pharmacies
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
        >
          Dashboard
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-4xl font-bold text-red-600">
              {hospitals.length}
            </h2>
            <p>Hospitals</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-4xl font-bold text-green-600">
              {clinics.length}
            </h2>
            <p>Clinics</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-4xl font-bold text-orange-500">
              {pharmacies.length}
            </h2>
            <p>Pharmacies</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-4xl font-bold text-blue-600">
              9
            </h2>
            <p>Recommended Facilities</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
          {loading ? (
            <div className="p-10 text-center">
              Loading Map...
            </div>
          ) : (
            <MapContainer
              center={position}
              zoom={13}
              style={{
                height: "650px",
                width: "100%",
              }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                position={position}
                icon={userIcon}
              >
                <Popup>
                  📍 Your Location
                </Popup>
              </Marker>

              {displayedFacilities.map(
                (
                  facility,
                  index
                ) => (
                  <Marker
                    key={index}
                    position={[
                      facility.lat,
                      facility.lon,
                    ]}
                    icon={getIcon(
                      facility.tags
                        ?.amenity
                    )}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">
                          {facility.tags
                            ?.name ||
                            "Healthcare Facility"}
                        </h3>

                        <p>
                          Type:{" "}
                          {
                            facility
                              .tags
                              ?.amenity
                          }
                        </p>

                        <p>
                          Distance:{" "}
                          {
                            facility.distance
                          }
                          m
                        </p>

                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${facility.lat},${facility.lon}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 font-semibold"
                        >
                          Open Directions
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                )
              )}
            </MapContainer>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">
            Recommended Nearby Facilities
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-red-600 font-bold text-xl mb-4">
                🏥 Hospitals
              </h3>

              {hospitals.map(
                (
                  facility,
                  index
                ) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 mb-3"
                  >
                    <h4 className="font-semibold">
                      {facility.tags?.name ||
                        "Hospital"}
                    </h4>

                    <p className="text-gray-500">
                      {facility.distance} m away
                    </p>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${facility.lat},${facility.lon}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600"
                    >
                      Directions
                    </a>
                  </div>
                )
              )}
            </div>

            <div>
              <h3 className="text-green-600 font-bold text-xl mb-4">
                🩺 Clinics
              </h3>

              {clinics.map(
                (
                  facility,
                  index
                ) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 mb-3"
                  >
                    <h4 className="font-semibold">
                      {facility.tags?.name ||
                        "Clinic"}
                    </h4>

                    <p className="text-gray-500">
                      {facility.distance} m away
                    </p>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${facility.lat},${facility.lon}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600"
                    >
                      Directions
                    </a>
                  </div>
                )
              )}
            </div>

            <div>
              <h3 className="text-orange-500 font-bold text-xl mb-4">
                💊 Pharmacies
              </h3>

              {pharmacies.map(
                (
                  facility,
                  index
                ) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 mb-3"
                  >
                    <h4 className="font-semibold">
                      {facility.tags?.name ||
                        "Pharmacy"}
                    </h4>

                    <p className="text-gray-500">
                      {facility.distance} m away
                    </p>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${facility.lat},${facility.lon}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600"
                    >
                      Directions
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilitiesPage;