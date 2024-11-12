import React from 'react'
import './Inbound.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Inbound() {
  return (
    <div className='Inbound-container'> 

        <div className='HaveSN-Link'>
            <span>เพิ่มสินค้าที่มี S/N <span><i class="bi bi-file-plus"></i></span></span>
        </div>
        
        <div className='DonthaveSN-Link'>
            <span>เพิ่มสินค้าที่ไม่มี S/N <span><i class="bi bi-file-plus"></i></span></span>
        </div>

    </div>
  )
  }
export default Inbound