import { useState } from "react";
import config from "../../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserRegister() {
    const [name, setName] = useState('');
    const [office, setOffice] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');

    function sendMail(idUser){
      try{
        const formData = new URLSearchParams();

        formData.append('email', email);
        formData.append('type', "CREATE");
        formData.append('id', idUser);
        
        fetch(`${config.apiUrl}/sendMail`, {
          method: 'POST',
          body: formData,
        }).then(() => {     
          toast.success("E-mail enviado com sucesso.");                               
          })
          .catch((error) => {
            toast.error("Não foi possível enviar o e-mail de alteração de senha. Tente novamente mais tarde.");           
          });

        
      } catch(error){
        toast.error("Não foi possível enviar o e-mail de alteração de senha. Tente novamente mais tarde.");      
      }
    }


    const register = (e) => {
        try{
          e.preventDefault();
          const token = localStorage.getItem('token');
          if (name !== '' && cpf != '' && office !== '' && email !== ''){
            const formData = new URLSearchParams();

            formData.append('name', name);
            formData.append('cpf', cpf);
            formData.append('idOffices', office);
            formData.append('email', email);
           
  
            fetch(`${config.apiUrl}/userRegister`, {
              method: 'POST',
              body: formData,
              headers: {
                'authorization': `${token}`,
              },
              }).then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                  return response.json();
              })
              .then(data => {         
                  toast.success("Usuário criado com sucesso.");
                  sendMail(data.userId)
              })
              .catch((error) => {
                console.log(error)
               toast.error("Erro no cadastro do funcionário. Tente novamente mais tarde.");
              });

          } else{
            toast.error("Preencha todos os campos!");
          }          
          
        } catch(error){
          console.log(error)
          toast.error("Erro no cadastro do funcionário. Tente novamente mais tarde.");
        }
    }

    return (
      <div className="p-5 py-7">  
        <div className="container px-5 ">
          <h3 >Funcionários</h3>
          <div className="row pt-5 px-5 bg-white rounded text-center">
            <h4 className="text-verde-escola h3 pb-4 text-center">Cadastrar Funcionário</h4>
            <div className="card  border-0">
              <div className="">
                <br/><br/>
                <div className="mb-3 pb-3">
                  <h5>*Nome:</h5> 
                  <input className="rounded  py-1  border-1 bg-input " type="text" name="name" placeholder="Nome" onChange={(e)=>{setName(e.target.value)}}/> 
                </div> 
                <br/> 
                <div className="mb-3 pb-3">
                  <h5 className="">*CPF:</h5> 
                  <input className="rounded  py-1  border-1 bg-input " type="text" name="cpf" placeholder="cpf" onChange={(e)=>{setCpf(e.target.value)}}/>
                  <br/>                 
                </div>
              </div> 
              <div className="">
                <br/> 
                <div className="mb-3 pb-3">
                  <h5>*Cargo:</h5> 
                 
                  <select onChange={(e)=>{setOffice(e.target.value)}} className="rounded py-1 px-3 border-1 bg-input ">
                    <option> Cargo </option>                                           
                    <option value={1}> Diretor(a) </option>
                    <option value={2}>Secretário(a)</option>
                    <option value={3}>Coordenador(a)</option>
                    <option value={4}>Professor(a)</option>
                  </select>
                </div>
                <br/> 
                
              </div>
              <div className="mb-3">
                <br/> 
                <div className=""> 
                  <h5 className="">*E-mail:</h5> 
                  <input className="rounded  py-1  border-1 bg-input " type="text" name="email" placeholder="E-mail" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <br/>                 
              </div>
             
              <br/> <br/> 
              <div className="d-flex justify-content-center ">                 
                <div className="mb-3">
                  <button className="default-button rounded bg-verde-escola text-white border-0 py-2" type="submit" onClick={register}>Cadastrar</button>
                </div>                 
              </div>                            
            </div>
          </div>
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

export default UserRegister;