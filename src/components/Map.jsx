import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './Map.module.css';

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  function handleClick() {
    navigate('form');
  }

  return (
    <div className={styles.mapContainer} onClick={handleClick}>
      <h1>Map</h1>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lng}</p>
    </div>
  );
}

export default Map;
