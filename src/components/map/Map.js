import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Routing from "./Routing";
import useGeolocation from "./useGeolocation";

export default function Map() {
  const position = [52.51715, 13.4288];
  const customerLocation = useGeolocation();
  const customerLat = customerLocation.coordinates.lat;
  const customerLng = customerLocation.coordinates.lng;

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="map"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {customerLocation.loaded && !customerLocation.error && (
        <Routing customerLat={customerLat} customerLng={customerLng} />
      )}
    </MapContainer>
  );
}
