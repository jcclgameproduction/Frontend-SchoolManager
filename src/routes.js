import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import FamiliarRegister from "./pages/FamiliarRegister";
import AddressRegister from "./pages/AddressRegister";
import StudentRegister from "./pages/StudentRegister";
import Menu from "./pages/Menu";
import RecoverPassword from "./pages/RecoverPassword";
import CatchStudentRegister from "./pages/CatchStudentRegister";
import EnrollmentRecordsManager from "./pages/EnrollmentRecordsManager";
import RecordsList from "./pages/RecordsList";
import FamiliarUpdate from "./pages/FamiliarUpdate"
import StudentUpdate from "./pages/StudentUpdate"
import AddressUpdate from "./pages/AddressUpdate";
import BillOfPyaView from "./pages/BillOfPayView";
import PasswordRegister from "./pages/PasswordRegister";
import UserRegister from "./pages/UserRegister";
import UsersList from "./pages/UsersList";
import UserUpdate from "./pages/UserUpdate";
import PrivateRoute from "./components/PrivateRoute";
import IntegralContract from "./pages/IntegralContract";

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/familiarRegister" element={<PrivateRoute element={<FamiliarRegister/>} /> } />
                <Route path="/addressRegister" element={<PrivateRoute element={<AddressRegister/>} /> } />
                <Route path="/studentRegister" element={<PrivateRoute element={<StudentRegister/>} /> } />
                <Route path="/catchStudentRegister" element={<PrivateRoute element={<CatchStudentRegister/>} /> } />
                <Route path="/familiarUpdate" element={<PrivateRoute element={<FamiliarUpdate/>} /> } />
                <Route path="/studentUpdate" element={<PrivateRoute element={<StudentUpdate/>} /> } />
                <Route path="/addressUpdate" element={<PrivateRoute element={<AddressUpdate/>} /> } />
                <Route path="/menu" element={<PrivateRoute element={<Menu/>} /> } /> 
                <Route path="/enrollmentRecordsManager" element={<PrivateRoute element={<EnrollmentRecordsManager/>} /> } /> 
                <Route path="/recordsList" element={<PrivateRoute element={<RecordsList/>} /> } /> 
                <Route path="/billOfPyaView" element={<PrivateRoute element={<BillOfPyaView/>} /> } /> 
                <Route path="/recoverPassword" element={<RecoverPassword/>} />
                <Route path="/passwordRegister/:token" element={<PasswordRegister/>} />
                <Route path="/userRegister" element={<PrivateRoute element={<UserRegister/>} /> } />
                <Route path="/usersList" element={<PrivateRoute element={<UsersList/>} /> } />
                <Route path="/userUpdate" element={<PrivateRoute element={<UserUpdate/>} /> } />
                <Route path="/*" element={<Login/>} />
                <Route path="/integralContract" element={<IntegralContract/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;