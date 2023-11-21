import Register from './Pages/Register'
import Login from './Pages/Login';
import Home from './Pages/Home';
import './style.scss'
import { BrowserRouter,Routes ,Route, Navigate} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser);

  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to='/login'/>
    }
    return children
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route index element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
        }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
