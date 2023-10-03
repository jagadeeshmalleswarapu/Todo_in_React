

import Register from "./auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import ToDo from "./todo/ToDo";
import Home from "./todo/Home";
import AddNotes from "./todo/AddNotes";
import UpdateToDo from "./todo/UpdateToDo";
import Logout from "./auth/Logout";


function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/todo' element={<ToDo />} />
          <Route path='/addNotes' element={<AddNotes />} />
          <Route path='/update' element={<UpdateToDo />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
