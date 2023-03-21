import { useState } from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const position = [52.509, 13.416];

  function getUserCoordinates() {
    const geolocationAPI = navigator.geolocation;
    if (!geolocationAPI) {
      setError("Geolocation API is not available in your browser!");
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position;
          setLat(coords.latitude);
          setLong(coords.longitude);
        },
        (error) => {
          setError("Something went wrong getting your position!");
        }
      );
    }
  }
  getUserCoordinates();
  return (
    <div>
      <p>Your coordinates are: </p>
      <p>Latitude: {lat}</p>
      <p>Longitude: {long}</p>
      <MapContainer
        className="map"
        center={position}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Here you are.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
