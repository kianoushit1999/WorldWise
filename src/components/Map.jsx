// import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import {useGeolocation} from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
  const [position, setPosition] = useState([40, 0]);
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const {isLoading, position:userPosition, getPosition} = useGeolocation();

  const lng = searchParams.get("lng");
  const lat = searchParams.get("lat");

  useEffect(()=>{
    if(lng && lat) setPosition([lat, lng])
  }, [lat, lng])

  useEffect(()=>{
    if(userPosition) {
      setPosition([position.lat, position.lng])
      console.log(position.lat, position.lng)
    }
  }, [position, userPosition])

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>{isLoading ? "Loading" : "Current location"}</Button>
      <MapContainer
        className={styles.mapContainer}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          className={styles.map}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Arcgis Topo</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(){
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      const {lat, lng} = e.latlng
      navigate(`form?lat=${lat}&lng=${lng}`)
    }
  })
}

export default Map;
