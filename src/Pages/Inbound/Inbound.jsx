import React from 'react'
import './Inbound.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function Inbound() {
  return (
                <div className="container">

                    <Link to ="HaveSN">
                    <button className="button button-green">
                        <span>สินค้าที่มี S/N</span>
                        <i class="bi bi-plus-lg"></i>
                    </button>
                    </Link>

                    <button className="button button-red">
                        <span>สินค้าที่ไม่มี S/N</span>
                        <i class="bi bi-plus-lg"></i>
                    </button>

                    <button className="button button-blue">
                        <span>เพิ่มข้อมูลหน่วย</span>
                        <i class="bi bi-plus-lg"></i>
                    </button>
                </div>
//     <div className="container">


//         <button   className="button">
//             <span>สินค้าที่มี S/N</span>
//             <i class="bi bi-plus-lg"></i>
//         </button>

//         <button className='button'>
//             <span>สินค้าที่ไม่มี S/N</span>
//             <i class="bi bi-plus-lg"></i>
//         </button>


//         <button className='button'>
//             <span>เพิ่มข้อมูลหน่วย</span>
//             <i class="bi bi-plus-lg"></i>
//         </button>

// </div>
  )
}


export default Inbound