import React from 'react';
import { Map } from 'react-amap';

export default function MapContainer() {
  return (
    <Map
      zoom={18}
      zoomEnable={false}
      mapStyle={'blue_night'}
      center={{ longitude: 126.637174, latitude: 45.722127 }}
      amapkey={'e410e897d314ea541de761a38ef9f92b'}
    />
  );
}
