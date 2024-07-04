import { useEffect, useState } from "react";
import config from "../../config";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FamiliarUpdate() {
    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [cpf, setCPF] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { state } = useLocation();

    function getFamiliar () {
        try{  

            fetch(`${config.apiUrl}/getFamiliar/${state.id}`, {
                method: 'GET',
                })
                .then((response) => response.json())
                .then((data) => {            
                    setName(data.familiar.name)
                    setProfession(data.familiar.profession);
                    setCPF(data.familiar.cpf); 
                    setEmail(data.familiar.email);
                    setPhone(data.familiar.phone);              
                })
                .catch((error) => {
                    console.log(error);
                }); 
            
        } catch(error){
          console.log(error)
        }
    }

    useEffect(()=>{
        getFamiliar();
    },[])

    const update = (e) => {
        try{
          e.preventDefault();

          const token = localStorage.getItem('token');
          if (name !== '' && profession !== '' && cpf !== ''){
            const formData = new URLSearchParams();

            formData.append('id', state.id);
            formData.append('name', name);
            formData.append('profession', profession);
            formData.append('cpf', cpf);
            formData.append('email', email);
            formData.append('phone', phone);
  
            fetch(`${config.apiUrl}/updateFamiliar`, {
              method: 'PUT',
              body: formData,
              headers: {
                'authorization': `${token}`,
              },
            }).then(() => {            
                toast.success("Os dados do familiar foram atualizados!");         
              })
              .catch((error) => {
                toast.error("Não foi possível atualizar os dados do familiar! Tente novamente mais tarde.");
              });           
          } else{
            toast.error("Preencha todos os campos!");
          }           

        } catch(error){
          toast.error("Não foi possível atualizar os dados do familiar! Tente novamente mais tarde.");
        }
    }

    return (
      <div className="p-5 py-7">
        <h3 className="ps-5">Editar ficha de matrícula</h3>
        <div className="container bg-white rounded ">
          <div className="row pt-5">
            <h4 className="text-center">Atualizar Familiar</h4>
            <div className="card text-center border-0">
              <div className="row">
                <br/><br/>
                <div className="col-md-6 mb-3">
                <h5>*Nome:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/> 
                </div> 
              </div> 
              <div className="d-flex row">
                <br/> 
                <div className="col-md-6 mb-3">
                  <h5>*Profissão:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="profession" value={profession} onChange={(e)=>{setProfession(e.target.value)}}/> 
                </div>
                <br/> 
                <div className="col-md-6 mb-3 ">
                  <h5>*CPF:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="cpf" value={cpf} onChange={(e)=>{setCPF(e.target.value)}}/> 
                </div>
              </div>
              <div className="d-flex row">
              <br/> 
                <div className="col-md-6 mb-3"> 
                  <h5 className="">E-mail:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <br/> 
                <div className="col-md-6 mb-3">
                  <h5>Telefone:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                </div> 
              </div>
              <br/> <br/> <br/> <br/> <br/> 
              <div className="d-flex justify-content-center row">
                <div className="col-md-6 mb-3">
                  <Link to="../Menu" state={{ Menu: "view" }}><button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit" >Menu</button></Link>
                </div> 
                <div className="col-md-6 mb-3">
                  <button className="default-button rounded bg-verde-escola text-white border-0 py-2" type="submit" onClick={update}>Atualizar</button>
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

export default FamiliarUpdate;