import { useEffect, useRef,useState } from 'react';
import {MapContainer,TileLayer,Marker,useMapEvents,useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface LocationMapProps {
  onLocationSelect: (lat: number, lng: number, address?: string) => void;
  selectedCoordinates: { lat: number; lng: number } | null;
}


function LocationMarker({ setLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ lat, lng });
    },
  });

  return null;
}


export function LocationMap({ location, setLocation,center }: LocationMapProps) {


  
function Recenter({ lat, lng,zoom }) {
  const map = useMap();
 
  useEffect(() => {

  
    map.flyTo([lat, lng], zoom ?? map.getZoom());
  }, [lat, lng, zoom,map]);

  return null;
}
  
  const zoom = 13
  

  return (
   <div>
        <MapContainer center={center} zoom={zoom}>
           <TileLayer
  url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=OZEa61WSyXmjJ1oVz3Xc"
/>
             <LocationMarker setLocation={setLocation} />

             <Recenter lat = {center.lat} lng ={center.lng} zoom={18}/>

             {location && (
        <Marker position={[location.lat, location.lng]} ></Marker>
      )}
        </MapContainer>
         
        
   </div>
  );
}
