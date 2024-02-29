
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import NotFound from './pages/notfoundpage';
import UserList from './pages/userlist';
import Todo from './pages/todo';
import Login from './pages/login';
import Register from './pages/register';

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
  // {
  //   path: '*',
  //   element:<NotFound/>
  // }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
