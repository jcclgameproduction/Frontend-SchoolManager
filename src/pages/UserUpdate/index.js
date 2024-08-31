import { useEffect, useState } from "react";
import config from "../../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/Header";

function UserUpdate() {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [userOffice, setUserOffice] = useState('');
    const [offices, setOffices] = useState([]);
    const [email, setEmail] = useState('');
    
    const { state } = useLocation();

    useEffect(()=>{
        getUser();
        getUserOffice();
        getOffices();
    },[])

    function getUser() {
        try{  

            fetch(`${config.apiUrl}/user/${state.id}`, {
                method: 'GET',
                })
                .then((response) => response.json())
                .then((data) => {   
                    setUserId(data.id);
                    setName(data.name)
                    setCpf(data.cpf); 
                    setEmail(data.email);        
                })
                .catch((error) => {
                    console.log(error);
                }); 
            
        } catch(error){
          console.log(error)
        }
    }

    function getUserOffice () {
        try{  

            fetch(`${config.apiUrl}/getUserOffice/${state.id}`, {
                method: 'GET',
                })
                .then((response) => response.json())
                .then((data) => {            
                    setUserOffice(data.idOffice);    
                })
                .catch((error) => {
                    console.log(error);
                }); 
            
        } catch(error){
          console.log(error)
        }
    }

    function getOffices() {
        try{  

            fetch(`${config.apiUrl}/getOffices`, {
                method: 'GET',
                })
                .then((response) => response.json())
                .then((data) => {            
                    setOffices(data.offices);  
                })
                .catch((error) => {
                    console.log(error);
                }); 
            
        } catch(error){
          console.log(error)
        }
    }

    const update = (e) => {
        try{
          e.preventDefault();
          const token = localStorage.getItem('token');
          if (userId != '' && name !== '' && cpf != '' && email !== ''){
            const formData = new URLSearchParams();

            formData.append('id', userId);
            formData.append('name', name);
            formData.append('cpf', cpf);
            formData.append('email', email);           
  
            fetch(`${config.apiUrl}/userUpdate`, {
              method: 'PUT',
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
                  toast.success("Funcionário atualizado com sucesso.");
              })
              .catch((error) => {
                console.log(error)
               toast.error("Erro ao atualizar funcionário. Tente novamente mais tarde.");
              });

          } else{
            toast.error("Preencha todos os campos!");
          }          
          
        } catch(error){
          console.log(error)
          toast.error("Erro ao atualizar funcionário. Tente novamente mais tarde.");
        }
    }

    return (
      <>
        <Header/>      
        <div className="p-5 py-7">  
          <div className="container px-5 ">
            <h3 >Funcionários</h3>
            <div className="row pt-5 px-5 bg-white rounded text-center">
              <h4 className="text-verde-escola h3 pb-4 text-center">Atualizar Funcionário</h4>
              <div className="border-0">
                <div className="">
                  <br/><br/>
                  <div className="mb-3 pb-3">
                    <h5>*Nome:</h5> 
                    <input className="rounded  py-1  border-1 bg-input " type="text" name="name" placeholder="Nome" value={name} onChange={(e)=>{setName(e.target.value)}}/> 
                  </div> 
                  <br/> 
                  <div className="mb-3 pb-3">
                    <h5 className="">*CPF:</h5> 
                    <input className="rounded  py-1  border-1 bg-input " type="text" name="cpf" placeholder="cpf" value={cpf} onChange={(e)=>{setCpf(e.target.value)}}/>
                    <br/>                 
                  </div>
                </div> 
                <div className="">
                  <br/> 
                  <div className="mb-3 pb-3">
                    <h5>*Cargo:</h5> 
                    <select onChange={(e)=>{setUserOffice(e.target.value)}} className="rounded py-1 px-3 border-1 bg-input ">
                      <option value={userOffice}>Cargo</option>
                      {Object.keys(offices).map((index) => (                        
                        <option key={index} value={(offices[index].id)}>
                          {offices[index].name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br/> 
                  
                </div>
                <div className="mb-3">
                  <br/> 
                  <div className=""> 
                    <h5 className="">*E-mail:</h5> 
                    <input className="rounded  py-1  border-1 bg-input " type="text" name="email" placeholder="E-mail" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  </div>
                  <br/>                 
                </div>
              
                <br/> <br/> 
                <div className="d-flex justify-content-center ">                 
                  <div className="mb-3">
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
      </>
    );
}

export default UserUpdate;