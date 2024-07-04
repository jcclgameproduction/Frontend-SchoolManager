import { useState } from "react";
import config from "../../config";
import { RxEyeClosed } from "react-icons/rx";
import { TfiEye } from "react-icons/tfi";
import logo from '../../assets/images/Logo_com_frase_sem_fundo.png'
import './style.css'
import { verifyAuth } from "../../utils/auth/authVerification";

function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Novo estado para controlar o indicador de carregamento

    const login = (e) => {
      e.preventDefault();
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);

      setIsLoading(true); // Ativar o indicador de carregamento

      fetch(`${config.apiUrl}/login`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.status === 401 || response.status === 404) {
            throw new Error('E-mail ou Senha incorreto(s)');
          }
          if (response.status === 200) {
            window.location.href = '/enrollmentRecordsManager';
          }
          return response.json();
        })
        .then((data) => {            
          localStorage.setItem('token', data.token);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false); // Desativar o indicador de carregamento após o término do envio do formulário
        });
    }

    const verifyAuthentication = async () => {
      if (await verifyAuth()) {
        window.location.href = '/enrollmentRecordsManager';
      }
    }

    return (
      <div  id="tela" onLoad={verifyAuthentication}>
        <div className="d-flex justify-content-center " >
         <img src={logo} alt="" width="509" height="283" className="my-5"/>  
        </div>
        <div className="d-flex justify-content-center border shadow" id="login">
          <div className=" py-4 ">
            <h1 className="pb-2 text-center text-verde-escola">Login</h1>
            
            <form onSubmit={login}>
              <label htmlFor="email">Email</label><br/>
              <input type="email"    name="email" onChange={(e)=>{setEmail(e.target.value)}}/> 
              <br/>
              <label htmlFor="password">Senha</label> 
              <div id="senha"> 
                <input type={showPassword ? "text" : "password"} id="password"  name="password" onChange={(e)=>{setPassword(e.target.value)}}/>  
                <i onClick={() => setShowPassword(!showPassword)}>{showPassword ? <TfiEye />  : <RxEyeClosed/>}</i>
              </div>
              {error && <p className="text-center text-danger">{error}</p>}
              <input type="submit" value="Entrar" className="btn bg-verde-escola text-white  w-100 mb-4"/>
              {isLoading && 
                <div className="text-center">
                  <div className="spinner-border" role="status">              
                  </div>
                </div>
              }
            </form>
            <p className="text-center " ><a href="/recoverPassword" className="text-verde-escola">Esqueceu sua senha?</a></p>
          </div>
        </div>
      </div>
      
  );
}

export default Login;