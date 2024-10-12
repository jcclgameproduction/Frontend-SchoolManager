import { Navigate } from "react-router-dom";
import { verifyAuth } from "../../utils/auth/authVerification";
import { useState } from "react";

const PrivateRoute = ({ element }) => {
  const [authToken, setAuthToken] = useState(true)
  async function valideToken (){
    setAuthToken(await verifyAuth());
  }

  (async ()=>{
    await valideToken();
  })()
    

  return authToken ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
