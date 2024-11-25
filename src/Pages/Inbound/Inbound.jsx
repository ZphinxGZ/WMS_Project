import React, { useState, useEffect } from 'react';

import './Inbound.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HaveSN from './Have S.N/HaveSN';
import DonthaveSN from './Dont have S.N/DonthaveSN';
function Inbound() {


  return (
    <div className='Inbound-container'>
      
      <HaveSN />
      <DonthaveSN />
      
     
    </div>
  );
}

export default Inbound;
