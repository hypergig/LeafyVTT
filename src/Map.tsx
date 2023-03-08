import React from "react";
import {CRS, LatLngBounds} from "leaflet";
import "leaflet/dist/leaflet.css";
import {ImageOverlay, MapContainer} from "react-leaflet";
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

interface Props {
    children?: React.ReactNode;
    /** background base image of the map */
    imgUrl: string;
    /** grid size in pixels */
    gridPx: number
    /** grid height offset in pixels */
    offsetHeightPx: number
    /** grid width offset in pixels */
    offsetWidthPx: number
}

interface Boundaries {
    map: LatLngBounds
    img: LatLngBounds
}

function Map(props: Props) {
    const [boundaries, setboundaries] = React.useState<undefined | Boundaries>()

    React.useEffect(() => {
        const img = new Image()
        img.onload = () => {
            const offsetHeight = (props.offsetHeightPx / props.gridPx) % 1
            const offsetWidth = (props.offsetWidthPx / props.gridPx) % 1
            setboundaries({
                map: new LatLngBounds([[0, 0],
                    [Math.ceil(img.height / props.gridPx), Math.ceil(img.width / props.gridPx)]]),
                img: new LatLngBounds([[offsetHeight, offsetWidth],
                    [offsetHeight + (img.height / props.gridPx), offsetWidth + (img.width / props.gridPx)]])
            })
        }
        img.src = props.imgUrl
    }, [props])

    if (!boundaries) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <MapContainer zoomSnap={.5} id={"map"} crs={CRS.Simple} bounds={boundaries.map}>
            <ImageOverlay url={props.imgUrl} bounds={boundaries.img}/>
            {props.children}
        </MapContainer>
    )
}

export default Map;
