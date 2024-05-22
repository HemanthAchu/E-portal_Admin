
import './App.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Home from './Components/Home'
import './bootstrap.min (1).css'
import Navbars from './Nav/Navbar'
import Footer from './Footer/fotter'
import Complaints from './Components/Complaints'
import Wastereport from './Components/Wastereport.jsx'
import Connect from './Components/connect.jsx'
import Lists from './Components/Lists.jsx'

function App() {
  

  return (
    <BrowserRouter>
     <Navbars/>
 <Routes>
 
  <Route path='/' element={<Home/>} />
  <Route path='/complaints' element={<Complaints/>} />
  <Route path='/wastereport' element={<Wastereport/>} />
  <Route path='/connect' element={<Connect/>} />
  <Route path='/lists' element={<Lists/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
   
  )
}

export default App
