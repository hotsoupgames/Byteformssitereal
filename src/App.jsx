import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Playing from './pages/Playing'
import Cards from './pages/Cards'
import './css/App.css'

function App() {

  return (
    <div className="page-content">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/playing" element={<Playing />}/>
          <Route path="/cards" element={<Cards />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
