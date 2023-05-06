// import logo from './logo.svg';
// import './App.css';
import CourseList from './CourseList';
import Login from './Login';
import Signup from './UserRegForm';
import UserList from './UserList';
import User from './User';
import UserCourse from './UserCourse'
// import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/UserList' element={<UserList />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/CourseList' element={<CourseList />} />
          <Route path='/UserCourse' element={<UserCourse />}>
            <Route path=":id" element={<UserCourse />} />
          </Route>
          <Route path='/Profile' element={<User />}>
            <Route path=":id" element={<User />} />
          </Route>
          <Route path='*' element={<p>404 not found</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
