import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar'
import CheckinForm from '../components/CheckinForm'
import Signin from '../components/Signin'
//  import AiForm from './components/AiForm.jsx'

function App() {
 

  return (
    <div>
      <NavBar />
        <Routes>
          <Route path="/" element={<CheckinForm/>} />
          <Route path="/signup" element={<Signin />} />
          <Route path="/home" element={<CheckinForm />} />
      </Routes> 
    </div>
  );
}

export default App
