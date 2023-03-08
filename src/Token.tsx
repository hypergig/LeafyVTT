import React from "react";
import {FeatureGroup as LeafletFeatureGroup, LatLng, LatLngBounds, Layer} from "leaflet";
import {Circle, FeatureGroup, ImageOverlay} from "react-leaflet";
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

interface Props {
    /** the token image */
    imgUrl: string
    /** the grid position */
    coordinate: LatLng
    /** the size of the token in feet (5 feet per grid square) */
    sizeFt: number
}

function Token(props: Props) {
    const upperBound = new LatLng(
        props.coordinate.lat + (props.sizeFt / 5),
        props.coordinate.lng + (props.sizeFt / 5))

    const bounds = new LatLngBounds(props.coordinate, upperBound)

    const ref = React.useRef<LeafletFeatureGroup>(null)
    React.useEffect(() => {
        ref.current?.pm.getLayers(true).forEach((l: Layer) => {
            // Layer doesn't extend PMDragLayer?
            // @ts-ignore
            l.pm.enableLayerDrag()
        })
        ref.current?.pm.setOptions({syncLayersOnDrag: true})
    })
    return (
        <FeatureGroup ref={ref}>
            <Circle fillOpacity={0} center={bounds.getCenter()} radius={.5}></Circle>
            <ImageOverlay url={props.imgUrl} bounds={bounds}/>
        </FeatureGroup>
    )
}

export default Token
