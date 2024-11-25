import React, { useState, useEffect } from 'react';

import './Inbound.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HaveSN from './Have S.N/HaveSN';

function Inbound() {


  return (
    <div className='Inbound-container'>
      
      <HaveSN />
      <div className='DonthaveSN-Link'>
        <span>เพิ่มสินค้าที่ไม่มี S/N <span><i className="bi bi-file-plus"></i></span></span>
      </div>

      
    </div>
  );
}

export default Inbound;
