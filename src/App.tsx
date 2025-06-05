import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Container from './components/layout/container/Container'
import Table from './components/table/Table'
import Navbar from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import DarkButton from './components/layout/darkmode/DarkButton'
import Home from './components/pages/Home'

function App() {
  return (
    <>
    
    <Router>
      <Navbar/>
      <Container customClass='router'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/table' element={<Table/>}/>
        </Routes> 
      </Container>
      <Footer/>
      <DarkButton/>
    </Router>
    </>
  )
}

export default App
