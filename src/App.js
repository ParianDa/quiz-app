import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar';
import Questions from './components/Questions';
import Startquiz from './components/Startquiz';
import About from './components/About';
import Support from './components/Support';

function MainApp() {
  return(
    <Routes>
      <Route path='/questions' element={<Questions/>} />
      <Route path='/startquiz' element={<Startquiz/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/support' element={<Support/>} />
    </Routes>
  )
}


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <MainApp/>
      </BrowserRouter>
    </div>
  );
}

export default App;
