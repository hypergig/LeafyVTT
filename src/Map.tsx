import "leaflet/dist/leaflet.css";
import {MapContainer} from "react-leaflet";
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

function Map() {
    return (
        <MapContainer id={"map"}>
        </MapContainer>
    )
}

export default Map;
