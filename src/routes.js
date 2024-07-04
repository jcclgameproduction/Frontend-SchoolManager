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

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Home/>} /> */}
                <Route path="/login" element={<Login/>} />
                <Route path="/familiarRegister" element={<FamiliarRegister/>} />
                <Route path="/addressRegister" element={<AddressRegister/>} />
                <Route path="/studentRegister" element={<StudentRegister/>} />
                <Route path="/catchStudentRegister" element={<CatchStudentRegister/>} />
                <Route path="/familiarUpdate" element={<FamiliarUpdate/>} />
                <Route path="/studentUpdate" element={<StudentUpdate/>} />
                <Route path="/addressUpdate" element={<AddressUpdate/>} />
                <Route  path="/menu" element={<Menu/>} /> 
                <Route  path="/enrollmentRecordsManager" element={<EnrollmentRecordsManager/>} /> 
                <Route  path="/recordsList" element={<RecordsList/>} /> 
                <Route  path="/billOfPyaView" element={<BillOfPyaView/>} /> 
                <Route path="/recoverPassword" element={<RecoverPassword/>} />
                <Route path="/passwordRegister" element={<PasswordRegister/>} />
                <Route path="/userRegister" element={<UserRegister/>} />
                <Route path="/usersList" element={<UsersList/>} />
                <Route path="/userUpdate" element={<UserUpdate/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;