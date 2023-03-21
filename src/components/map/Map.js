import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useGeolocation from "./useGeolocation";

export default function Map() {
  const position = [52.509, 13.416];
  const customerLocation = useGeolocation();

  return (
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
      {customerLocation.loaded && !customerLocation.error && (
        <Marker
          position={[
            customerLocation.coordinates.lat,
            customerLocation.coordinates.lng,
          ]}
        >
          <Popup>Here you are.</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
