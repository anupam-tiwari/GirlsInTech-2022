import React, { useState } from "react";
import Navbar from "../components/Navbar";
import GoogleMapReact from "google-map-react";
import Maps from "../components/Maps";
import axios from 'axios';
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import mapboxgl from "mapbox-gl";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Dashboard = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [sliderLevel, SetLevel] = useState(0);
  const [info, SetInfo] = useState('');
  const [user, loading, error] = useAuthState(auth)
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  async function sendAlert(){
    let data ={
      email:user.email, 
	    name:user.displayName, 
	    lat:lat, 
	    long:lng, 
	    alert:sliderLevel,
	    info:info
    }
    console.log(data)
    await axios.post("http://localhost:4000/alerts", data).then((response) => {
      console.log(response.data)
    }
    )
  }

  

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("loading...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retreive your location");
        }
      );
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="items-center pt-2 ">
        {lat && <Maps latitude={lat} longitude={lng} alert={sliderLevel}></Maps>}
        {!lat && <Maps latitude={lat} longitude={lng}></Maps>}
      </div>

      <div className="flex justify-center">
        <div className="items">
        <p>{status}</p>
        <div className="flex">
        {lat && <p>Latitude: {lat}</p>}
        {lng && <p>Longitude: {lng}</p>}
        </div>
        <div className="flex py-2 justify-center"><input type="range" min={0} max={5} step={1} value={sliderLevel} onChange={e => SetLevel(e.target.value)}></input></div>
        <div className="flex py-2 justify-center"><input type="text" placeholder="relevent info" onChange={e => SetInfo(e.target.value)}></input></div>
        <div className="py-2"><div className="bg-black w-30 px-6 p-2 rounded-xl text-white text-center cursor-pointer" onClick={getLocation}>Current location</div></div>
        <div className="bg-black w-30 px-6 py-2 rounded-xl text-white text-center cursor-pointer" onClick={sendAlert}>Send Alert: {sliderLevel}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
