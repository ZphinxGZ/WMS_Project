// React
import React, { useEffect, useState } from 'react'
import { HashRouter,Routes,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Layouts from './Layout/Layouts/Layouts'
import Dashboard from './Pages/Dashboard/Dashboard'
import Inbound from './Pages/Inbound/Inbound'
import Outbound from './Pages/Outbound/Outbound'
import DataHistory from './Pages/DataHistory/DataHistory'
import Personel from './Pages/Personel/Personel'
import Setting from './Pages/Setting/Setting'

// style
import './App.css'
// data
import ProductData from './Data/ProductData';


const initialTab = 'home'
function App() {

  const [tab,setTab] = useState('')
  useEffect(() => {
    setTab(initialTab)
  }, [])

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route element={<Layouts tab={tab} setTab={setTab}/>}>
            <Route path='/' element={<Dashboard />} data={ProductData}/>
            <Route path='/dashboard' element={<Dashboard />}data={ProductData}/>
            <Route path='/inbound' element={<Inbound />} data={ProductData}/>
            <Route path='/outbound' element={<Outbound />} data={ProductData}/>
            <Route path='/datahistory' element={<DataHistory />} data={ProductData}/>
            <Route path='/personel' element={<Personel />} data={ProductData}/>
            <Route path='/settings' element={<Setting />} data={ProductData}/>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
