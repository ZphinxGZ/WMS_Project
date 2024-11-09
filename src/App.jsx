// React
import React, { useEffect, useState } from 'react'
import { HashRouter,Routes,Route } from 'react-router-dom'

// Pages
import Layouts from './Layout/Layouts/Layouts'
import Dashboard from './Pages/Dashboard/Dashboard'
import Inbound from './Pages/Inbound/Inbound'
import Outbound from './Pages/Outbound/Outbound'
import Log from './Pages/Logs/Log'
import Personel from './Pages/Personel/Personel'
import Setting from './Pages/Setting/Setting'

// style
import './App.css'


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
            <Route path='/' element={<Dashboard />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/inbound' element={<Inbound />}/>
            <Route path='/outbound' element={<Outbound />}/>
            <Route path='/log' element={<Log />}/>
            <Route path='/personel' element={<Personel />}/>
            <Route path='/settings' element={<Setting />}/>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
