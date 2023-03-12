import React from "react";
import L from "leaflet";
import {Circle, FeatureGroup, ImageOverlay} from "react-leaflet";
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';


interface Props {
    /** the token image */
    imgUrl: string
    /** the grid position */
    latLng: L.LatLng
    /** the size of the token in squares */
    size: number
}

const toCenter = (latLang: L.LatLng, size: number) => {
    const offset = size / 2
    return new L.LatLng(latLang.lat + offset, latLang.lng + offset)
}

const toBounds = (latLang: L.LatLng, size: number) => {
    return new L.LatLngBounds(latLang, [latLang.lat + size, latLang.lng + size])
}

const toSnap = (latLang: L.LatLng) => {
    return new L.LatLng(Math.round(latLang.lat), Math.round(latLang.lng))
}

function Token(props: Props) {
    const [latlng, setLatlng] = React.useState(props.latLng)

    const groupRef = React.useRef<L.FeatureGroup>(null)
    const imageRef = React.useRef<L.ImageOverlay>(null)

    React.useEffect(() => {
        groupRef.current?.getLayers().forEach((l: L.Layer) => {
            // @ts-ignore
            l.pm.enableLayerDrag()
        })

        groupRef.current?.pm.setOptions({syncLayersOnDrag: true})

        const dragend = (e: L.LeafletEvent) => {
            if (imageRef.current) {
                setLatlng(toSnap(imageRef.current?.getBounds().getSouthWest()))
            }
        }

        imageRef.current?.on("pm:dragend", dragend)
        return () => {
            imageRef.current?.off("pm:dragend", dragend)
        }
    })

    return (
        <FeatureGroup ref={groupRef}>
            <Circle className={"token"} fillOpacity={0} center={toCenter(latlng, props.size)}
                    radius={props.size / 2}/>
            <ImageOverlay className={"token"} ref={imageRef} url={props.imgUrl}
                          bounds={toBounds(latlng, props.size)}/>
        </FeatureGroup>
    )
}

export default Token
