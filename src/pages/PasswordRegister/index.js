import { useState, useEffect } from "react";
import config from "../../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

function PasswordRegister() {
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');
    const [email, setEmail] = useState("");
    let {token} = useParams();

    function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      setEmail(JSON.parse(jsonPayload).email);
  }

    useEffect(()=>{
      parseJwt(token);
    }, []);

    function ConfirmPassword(e){
      e.preventDefault();
      if (password === passwordConfirmed){
        handleSubmit();
      } else{
        toast.error("As senhas devem ser iguais!");
      }
    }
    function handleSubmit() {
            try{
              if (password !== '' && email !== ''){
                const formData = new URLSearchParams();
    
                formData.append('newpassword', password);
                formData.append('email', email);
                fetch(`${config.apiUrl}/changepassword`, {
                  method: 'POST',
                  body: formData,
                  headers: {
                    'authorization': `${token}`,
                  },
                }).then(() => {            
                    toast.success("Senha atualizada com sucesso!");         
                  })
                  .catch((error) => {                
                    console.log(error)
                    toast.error("Erro no atualizar senha. Tente novamente mais tarde.");
                  });
              } else{
                toast.error("Preencha todos os campos!");
              }          
    
            } catch(error){
              console.log(error)
              toast.error("Erro no atualizar senha. Tente novamente mais tarde.");
            }
        
    }
    return (
        <div className="pt-4" id="fundo">
            <div className="d-flex border shadow justify-content-center" id="recover">
                <div className=" py-4 text-center" id="fundo-form">
                    <form  onSubmit={ConfirmPassword}>
                        <div className="pb-2">
                            <label >Digite sua nova senha</label><br/>
                            <input type="password" name="password" className="px-4 rounded" onChange={(e)=>{setPassword(e.target.value)}}/> 
                        </div>
                       
                        <div>
                            <label >Confirma sua nova senha</label><br/>
                            <input type="password" name="passwordConfirmed" className="px-4 rounded" onChange={(e)=>{setPasswordConfirmed(e.target.value)}}/>
                        </div>
                        
                        <br/>
                        <input className="py-1" value="Confirmar" type="submit" id="btn" />
                    </form>
                </div>
                <p>{config.frontUrl}</p>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </div>
    );
}
export default PasswordRegister;