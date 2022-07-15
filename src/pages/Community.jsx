import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX; 

const Community = () => {
  const [viewState, setViewState] = React.useState({
    longitude: 11,
    latitude: 11,
    zoom: 3,
  });
  const [mapdata, setMapData] = useState([]);

  axios.get("http://localhost:4000/alerts").then((response) => {
    console.log(response.data);
    setMapData(response.data)
  });

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: "100vw", height: "90vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
        > 
            {mapdata.map((items) => (
                <div>
                     <Marker latitude={items.lat} longitude={items.long} color='red'></Marker>
                     <Marker latitude={items.lat} longitude={items.long} color='red'>
                     <div className='font-bold  text-red-500  flex pt-9'><div>level:</div>{items.alert}</div>
                     <div className='font-bold  text-red-500  flex'><div>info:</div>{items.info}</div>
                     <div className='font-bold  text-red-500  flex'><div>contact:</div>{items.email}</div>
                     </Marker>
                </div>  
            ))}
        </Map>
      </div>
    </div>
  );
};

export default Community;
