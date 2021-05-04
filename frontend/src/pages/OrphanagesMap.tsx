import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';


import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import api from '../services/api';

interface Orphanage {
  id: number;
  longitude: number;
  latitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(()=> {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    } );
  }, [])


  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="" />

          <h2>Escolha um orfanato do mapa</h2>
          <p>Muitas Crianças estão esperando sua visita</p>
        </header>

        <footer>
          <strong>Colombo </strong>
          <span>Parana</span>
        </footer>
      </aside>
      <MapContainer center={[-25.3683792, -49.1727187]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

         {orphanages.map(orphanage => {
           return(
            <Marker
            key={orphanage.id} 
            icon={mapIcon} 
            position={[orphanage.latitude, orphanage.longitude]} 
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#fff"/>
              </Link>
            </Popup>
          </Marker>
           )
         })}
      </MapContainer>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
