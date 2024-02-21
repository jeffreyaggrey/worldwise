import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './Map.module.css';
import { useState } from 'react';

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPostion, setMapPositon] = useState([51.505, -0.09]);

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  function handleClick() {
    navigate('form');
  }

  return (
    <div className={styles.mapContainer} onClick={handleClick}>
      <MapContainer
        className={styles.mapContainer}
        center={mapPostion}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={mapPostion}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
