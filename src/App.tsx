import React from 'react';
import './App.css';
import Map from './Map'
import Token from "./Token";
import {LatLng} from "leaflet";

function App() {
    const img = "https://i.redd.it/ew8lwfx2o1361.png"
    return (
        <Map imgUrl={"https://i.pinimg.com/originals/a2/04/d4/a204d4a2faceb7f4ae93e8bd9d146469.jpg"}
             gridPx={72} offsetHeightPx={42} offsetWidthPx={38}>
            <Token key={"1"} imgUrl={img} latLng={new LatLng(10, 12)} size={1}/>
            <Token key={"2"} imgUrl={img} latLng={new LatLng(10, 14)} size={1}/>
            <Token key={"3"} imgUrl={img} latLng={new LatLng(12, 12)} size={1}/>
            <Token key={"4"} imgUrl={img} latLng={new LatLng(12, 14)} size={1}/>
        </Map>
    );
}

export default App;
