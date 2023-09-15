import React, {useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Container} from '@mui/material'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Form from './components/Form/Form'
import Details from './components/Details/Details'
import SignIn from './components/Auth/signin'


const App = () => {

  const user = localStorage.getItem('user')

  return (
    <Router>
    <Container maxWidth='xl'>
      <Navbar />
      <Routes>
       <Route path='/' exact element={<Home />} />
       <Route path='/articulos' exact element={<Home />} />
       <Route path='/articulos/search' exact element={<Home />} />
       <Route path='/articulos/details/:id' element={<Details />} />
       <Route path='/signin' exact element={<SignIn />} />
       <Route path='/articulos/upload' exact element={user ? <Form /> : <Home/>} />
      </Routes>
    </Container>
    </Router>
  )
}

export default App