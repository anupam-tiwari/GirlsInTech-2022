import React from 'react'
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX; 

const Maps = (props) => {
    const [viewState, setViewState] = React.useState({
        longitude: props.longitude,
        latitude: props.latitude,
        zoom: 4
      });


      console.log(props.latitude)
      console.log(props.longitude)

  return (
    <div>
        <Map
    {...viewState}
    onMove={evt => setViewState(evt.viewState)}
    style={{width: '100vw', height: '60vh'}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={MAPBOX_TOKEN}
  >
    <Marker longitude={props.longitude} latitude={props.latitude} color='red' anchor="bottom" >
    </Marker>
    <Marker longitude={props.longitude} latitude={props.latitude} color='red' anchor="bottom">
        <div className='font-bold text-2xl text-red-500 p-14 flex'><div>level:</div>{props.alert}</div>
    </Marker>
    </Map>
    </div>
  )
}

export default Maps