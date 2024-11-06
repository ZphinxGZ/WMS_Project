import React, { useEffect, useState } from 'react'
import './App.css'

import { HashRouter,Routes,Route } from 'react-router-dom'

import Layouts from './Layout/Layouts/Layouts'
import Dashboard from './Pages/Dashboard/Dashboard'
import Inbound from './Pages/Inbound/Inbound'
import Outbound from './Pages/Outbound/Outbound'
import ProductList from './Pages/ProductList/ProductList'
import Withdraw from './Pages/Withdraw/Withdraw'

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
            <Route path='/ProductList' element={<ProductList />}/>
            <Route path='/Withdraw' element={<Withdraw />}/>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
