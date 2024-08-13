import { useState } from "react";
import config from "../../config";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FamiliarRegister() {
    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [cpf, setCPF] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');



    const register = (e) => {
        try{
          e.preventDefault();

          const token = localStorage.getItem('token');
          if (name !== '' && profession !== '' && cpf !== ''){
            const formData = new URLSearchParams();

            formData.append('name', name);
            formData.append('profession', profession);
            formData.append('cpf', cpf);
            formData.append('email', email);
            formData.append('phone', phone);
  
            fetch(`${config.apiUrl}/familiarRegister`, {
              method: 'POST',
              body: formData,
              headers: {
                'authorization': `${token}`,
              },
            }).then(() => {            
                toast.success("Familiar cadastrado com sucesso!");         
              })
              .catch((error) => {                
                console.log(error)
                toast.error("Erro no cadastro do familiar. Tente novamente mais tarde.");
              });
          } else{
            toast.error("Preencha todos os campos!");
          }          

        } catch(error){
          console.log(error)
          toast.error("Erro no cadastro do familiar. Tente novamente mais tarde.");
        }
    }

    return (
      <div className="p-5 py-7">
        <h3 className="ps-5">Matricular Aluno</h3>
        <div className="container bg-white rounded ">
          <div className="row pt-5">
            <h4 className="text-center">Cadastrar Familiar</h4>
            <div className="card text-center border-0">
              <div className="row">
                <br/><br/>
                <div className="col-md-6 mb-3">
                <h5>*Nome:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="name" onChange={(e)=>{setName(e.target.value)}}/> 
                </div> 
              </div> 
              <div className="d-flex row">
                <br/> 
                <div className="col-md-6 mb-3">
                  <h5>*Profissão:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="profession" onChange={(e)=>{setProfession(e.target.value)}}/> 
                </div>
                <br/> 
                <div className="col-md-6 mb-3 ">
                  <h5>*CPF:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="cpf" onChange={(e)=>{setCPF(e.target.value)}}/> 
                </div>
              </div>
              <div className="d-flex row">
              <br/> 
                <div className="col-md-6 mb-3"> 
                  <h5 className="">E-mail:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <br/> 
                <div className="col-md-6 mb-3">
                  <h5>Telefone:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="phone" onChange={(e)=>{setPhone(e.target.value)}}/>
                </div> 
              </div>
              <br/> <br/> <br/> <br/> <br/> 
              <div className="d-flex justify-content-center row">
                <div className="col-md-3 mb-3">
                  <Link to="../Menu" state={{ Menu: "register" }}><button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit" >Menu</button></Link>
                </div> 
                <div className="col-md-3 mb-3">
                  <button className="default-button rounded bg-verde-escola text-white border-0 py-2" type="submit" onClick={register}>Cadastrar</button>
                </div> 
                <div className="col-md-3 mb-3">
                  <Link className="link-unstyled link-light" to="../studentRegister"><button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit" > Próximo </button></Link>
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

export default FamiliarRegister;