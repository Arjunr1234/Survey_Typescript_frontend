import { Route, Routes } from "react-router-dom"
import Signup from "../pages/user/Signup"
import SignIn from "../pages/user/SignIn"
import Home from "../pages/user/Home"
import ProtectedRoute from "../utils/ProtectedRoute"
import ViewResponses from "../pages/user/ViewResponses"
import Form from "../pages/user/Form"
import ForgotPasswordEmail from "../components/user/ForgotPasswordEmail"
import ConfirmPassword from "../components/user/ConfirmPassword"

function UserRoutes() {

  return (
   <>
    <Routes>
        <Route path="signup" element={<Signup/>}/>
        <Route path="forgot-password" element={<ForgotPasswordEmail/>}/>
        <Route path="reset-password" element={<ConfirmPassword/>} />
        <Route index element={<SignIn/>}/>
        <Route element={<ProtectedRoute role="user" />}>
            <Route path="home" element={<Home/>} />
            <Route path="view" element={<ViewResponses/>}/>
            <Route path="form" element={<Form/>}/>
        </Route>

    </Routes>  
   </>
  )
}

export default UserRoutes
