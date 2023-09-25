import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar.component'

import { CreateDelivery } from './components/delivery-add.component'
import { DeliveryList } from './components/delivery-list.component'

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path='/' element={<DeliveryList />} />
          <Route exact path='/createDelivery' element={<CreateDelivery />} />
          <Route exact path='/delivery' element={<DeliveryList />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
