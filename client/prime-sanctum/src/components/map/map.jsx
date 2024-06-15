import { MapContainer, Popup, TileLayer } from 'react-leaflet'
import { Marker } from 'react-leaflet';
import './map.scss'
import "leaflet/dist/leaflet.css";


function Map(){
    return(
        <MapContainer center={[17.527465,78.387386]} zoom={7} scrollWheelZoom={false} className='map'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[17.527465,78.387386]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    )
}

export default Map