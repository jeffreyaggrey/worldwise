import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext/useCities';
import { useGeolocation } from '../hooks/useGeolocation';

import styles from './Map.module.css';
import Button from './Button';
import { useUrlPositon } from '../hooks/useUrlPostion';

function Map() {
  // Get the cities from the context
  const { cities } = useCities();
  // Get the user's location from the custom hook
  const {
    isLoading: isLoadingPosition,
    position: geolocationPositon,
    getPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const [mapLat, mapLng] = useUrlPositon();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng],
  );

  useEffect(
    function () {
      if (geolocationPositon)
        setMapPosition([geolocationPositon.lat, geolocationPositon.lng]);
    },
    [geolocationPositon],
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPositon && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Get your position'}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// Custom component to change the center of the map since leaflet doesn't provide a way to do it
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

// Custom component to detect a click on the map and navigate to the form page since leaflet doesn't provide a way to do it
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
