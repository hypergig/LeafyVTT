import React from 'react';
import './App.css';
import Map from './Map'

function App() {
    return (
        <Map imgUrl={"https://i.pinimg.com/originals/a2/04/d4/a204d4a2faceb7f4ae93e8bd9d146469.jpg"}
             gridPx={72} offsetHeightPx={30} offsetWidthPx={30}/>
    );
}

export default App;
