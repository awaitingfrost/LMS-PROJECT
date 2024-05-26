import Home from './Pages/Home.jsx';
import Signin from './Pages/Signin.jsx'
import { BrowserRouter as Router, Route, Routes, redirect, Link, Navigate } from "react-router-dom";
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard.jsx';
import Allbooks from './Pages/Allbooks.jsx';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.jsx';
import { useContext, useState } from "react"
import { AuthContext } from "./Context/AuthContext.js"
import AddBook from './Pages/Dashboard/AdminDashboard/Components/AddBook.jsx';
import AddTransaction from './Pages/Dashboard/AdminDashboard/Components/AddTransaction.jsx';
import AllMembers from './Pages/Dashboard/AdminDashboard/Components/AllMembers.jsx';
import AddMember from './Pages/Dashboard/AdminDashboard/Components/AddMember.jsx';
import GetMember from './Pages/Dashboard/AdminDashboard/Components/GetMember.jsx';
import Return from './Pages/Dashboard/AdminDashboard/Components/Return.jsx';
import AllTransations from './Pages/Dashboard/AdminDashboard/Components/AllTransations.jsx';
import Layout from './main/Layout.jsx';
import { Snackbar } from '@mui/material';
import Profile from './Pages/Dashboard/MemberDashboard/Profile.jsx';
import Active from './Pages/Dashboard/MemberDashboard/Active.jsx';
import Reserved from './Pages/Dashboard/MemberDashboard/Reserved.jsx';
import History from './Pages/Dashboard/MemberDashboard/History.jsx';
import BookDetails from './Pages/Dashboard/AdminDashboard/Components/BookDetails.jsx';

function App() {

  const [toastOpen, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  function handleToast() {
    setToast(false)
  }

  const { user } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route exact path='/' element={
          user ? (
            user.isAdmin ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/member" />
            )
          ) : (
            <Home />
          )
        } />


        <Route path='/signin' element={<Signin setToast={setToast} setToastMessage={setToastMessage} />} >
        </Route>
        {/* <Route exact path='/dashboard@member'> */}
        {/* {user ? (user.isAdmin === false ? <MemberDashboard /> : <Link to='/' />) : <Link to='/' />} */}
        {/* </Route> */}

        {/* <Route exact path='/dashboard@admin'>
          {user?.isAdmin ? <AdminDashboard /> : redirect('/')}
        </Route> */}


        {/* <Route path='/books'>
          <Allbooks />
        </Route> */}

        <Route path="/member" element={<Layout />}>
          <Route path="" element={<MemberDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="issued" element={<Active />} />
          <Route path="reserved" element={<Reserved />} />
          <Route path="history" element={<History />} />
        </Route>


        <Route path="/admin" element={<Layout />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="addbook" element={<AddBook setToastMessage={setToastMessage} setToast={setToast} />} />
          <Route path="allbooks" element={<Allbooks />} />
          <Route path="alltransactions" element={<AllTransations />} />
          <Route path="addtransaction" element={<AddTransaction setToastMessage={setToastMessage} setToast={setToast} />} />
          <Route path="allmembers" element={<AllMembers />} />
          <Route path="addmember" element={<AddMember setToastMessage={setToastMessage} setToast={setToast} />} />
          <Route path="getmember" element={<GetMember />} />
          <Route path="returntransaction" element={<Return />} />
          <Route path="allbooks/:id" element={<BookDetails />} />
        </Route>
      </Routes>
      <Snackbar
        open={toastOpen}
        autoHideDuration={5000}
        onClose={handleToast}
        message={toastMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}

export default App;