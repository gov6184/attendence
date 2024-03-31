import React from 'react'
import Camera from '../pages/Userpage'
import AdminPage from '../pages/Adminpage'
import { Route, Routes } from 'react-router-dom'

export default function Router() {
  return (
    <Routes>
    <Route path='/' element={<Camera/>}  />
    <Route path='/admin' element={<AdminPage/>} />
   
</Routes>  )
}
