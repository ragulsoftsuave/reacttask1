
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import NotFound from './pages/notfoundpage';
import UserList from './pages/userlist';
import Todo from './pages/todo';
import Login from './pages/login';
import Register from './pages/register';
import Temp from './pages/temp';
import { AuthProvider } from './Contexts/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserList/>,
    errorElement:<NotFound/>,
  },
  {
    path: 'todo',
    element: <Todo/>
  },
  {
    path: 'login',
    element: <Login/>
  },
  {
    path: 'register',
    element: <Register/>
  },
  {
    path: 'temp',
    element: <Temp/>
  },
  // {
  //   path: '*',
  //   element:<NotFound/>
  // }
]);

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <RouterProvider router={router}/>
      </AuthProvider>
    </div>
  );
}

export default App;
