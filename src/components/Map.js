import { useState } from "react";

export default function Map() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

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
    <div className="App">
      <p>Your coordinates are: </p>
      <p>Latitude: {lat}</p>
      <p>Longitude: {long}</p>
    </div>
  );
}
