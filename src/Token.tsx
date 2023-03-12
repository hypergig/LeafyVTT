import React from "react";
import L from "leaflet";
import {Circle, ImageOverlay, LayerGroup} from "react-leaflet";
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';


interface Props {
    /** the token image */
    imgUrl: string
    /** the grid position */
    latLang: L.LatLng
    /** the size of the token in squares */
    size: number
}

const toCenter = (latLang: L.LatLng, size: number) => {
    const offset = size / 2
    return new L.LatLng(latLang.lat + offset, latLang.lng + offset)
}

const toSouthwest = (latLang: L.LatLng, size: number) => {
    const offset = size / 2
    return new L.LatLng(latLang.lat - offset, latLang.lng - offset)
}

const toBounds = (latLang: L.LatLng, size: number) => {
    return new L.LatLngBounds(latLang, [latLang.lat + size, latLang.lng + size])
}

const toSnap = (latLang: L.LatLng) => {
    return new L.LatLng(Math.round(latLang.lat), Math.round(latLang.lng))
}

function Token(props: Props) {

    const circleRef = React.useRef<L.Circle>(null)
    const imageRef = React.useRef<L.ImageOverlay>(null)

    React.useEffect(() => {
        circleRef.current?.pm.enableLayerDrag()

        const move = (latLang: L.LatLng) => {
            circleRef.current?.setLatLng(toCenter(latLang, props.size))
            imageRef.current?.setBounds(toBounds(latLang, props.size))
        }

        const change = (e: L.LeafletEvent) => {
            if (circleRef.current && imageRef.current) {
                imageRef.current?.setBounds(toBounds(toSouthwest(circleRef.current.getLatLng(), props.size), props.size))
            }
        }

        const dragend = (e: L.LeafletEvent) => {
            if (circleRef.current && imageRef.current) {
                move(toSnap(toSouthwest(circleRef.current.getLatLng(), props.size)))
            }
        }

        circleRef.current?.on("pm:change", change)
        circleRef.current?.on("pm:dragend", dragend)
        return () => {
            circleRef.current?.off("pm:change", change)
            circleRef.current?.off("pm:dragend", dragend)
        }
    })

    return (
        <LayerGroup>
            <Circle ref={circleRef} fillOpacity={0} center={toCenter(props.latLang, props.size)}
                    radius={props.size / 2}/>
            <ImageOverlay ref={imageRef} url={props.imgUrl}
                          bounds={toBounds(props.latLang, props.size)}/>
        </LayerGroup>
    )
}

export default Token
