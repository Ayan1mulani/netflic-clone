import { Route, Routes } from 'react-router-dom'
import Home from './Pages/HomePage/Home'
import AddTrend from './Pages/Trend/AddTrend'
import LoginPage from './Pages/LoginPage/LoginPage'
import Payment from './Pages/PaymentPlans/Payment'
import Details from './Pages/Trend/Details'
import AddMost2 from './Pages/Trend/AddMost2'
import AddTop3 from './Pages/Trend/AddTop3'

const App = () => {
  return (
    <Routes>
    <Route element={<LoginPage/>} path='/home'/>
    <Route element={<Payment/>} path='/payment'/>
    <Route element={<Home/>} path='/'/>
    <Route element={<AddTrend/>} path='/add/Trend'/>
    <Route element={<Details/>} path='/detail'/>
    <Route element={<AddMost2/>} path='/add/Most'/>
    <Route element={<AddTop3/>} path='/add/Top'/>
    </Routes>
  )
}

export default App
