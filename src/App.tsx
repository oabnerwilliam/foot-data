import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Container from './components/layout/container/Container'
import Table from './components/table/Table'
import Navbar from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import DarkButton from './components/layout/darkmode/DarkButton'
import Fighting from './components/fighting/Fighting'
import TeamPage from './components/teampage/TeamPage'
import FootballTables from './components/football/FootballTables'
import BasketballTables from './components/basketball/BasketballTables'

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Container customClass='router'>
          <Routes>
            <Route path='/' element={<FootballTables/>}/>
            <Route path='/mma' element={<Fighting/>}/>
            <Route path='/team/:id' element={<TeamPage/>}/>
            <Route path='/basketball' element={<BasketballTables/>}/>
          </Routes> 
        </Container>
        <Footer/>
        <DarkButton/>
      </Router>
    </>
  )
}

export default App
