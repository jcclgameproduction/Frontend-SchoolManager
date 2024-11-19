import { useState, useEffect } from "react";
import config from "../../config";
import { Link } from "react-router-dom";
import pencilEdit from "../../assets/icons/pencilEdit.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
import ConfirmationModal from "../../components/ConfirmationModal";
import Header from "../../components/Header";

function UsersList() {
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        getUsers();
    }, []);

    useEffect(()=>{
       getUsers();
      }, [search]);

    function getUsers() {
        try{
            const formData = new URLSearchParams();

            formData.append('search', search);

            if(search.length < 1){
                fetch(`${config.apiUrl}/getAllUsers`, {
                    method: 'GET',
                  })
                    .then((response) => response.json())
                    .then((data) => {            
                      setUser(data.users);
                    })
                    .catch((error) => {
                      console.log(error);
                    }); 
            } else{
                fetch(`${config.apiUrl}/searchUser/${search}`, {
                    method: 'GET',
                  })
                    .then((response) => response.json())
                    .then((data) => {            
                      setUser(data.user);       
                    })
                    .catch((error) => {
                      console.log(error);
                    }); 
            }
        } catch(error){
          console.log(error)
        }
    }

    function deleteUser(id){
      try{
        const token = localStorage.getItem('token');
        const formData = new URLSearchParams();

        formData.append('id', id);

        fetch(`${config.apiUrl}/UserDelete`, {
          method: 'DELETE',
          body: formData,
          headers: {
            'authorization': `${token}`,
          },
        }).then((response) =>{
            if(response.ok){
              toast.success("Funcionário deletado com sucesso!");    
              getUsers();  
            }  else {
              const errorPromise = response.json().then((data) => {
                throw new Error(data.error);
              });
              errorPromise.catch((error) => {
                toast.error(error.message);
                console.error(error.message); 
              });           
            }
          })
          .catch((error) => {                
            console.log(error);
          })
        }
       catch(error){
        console.log(error)
        toast.error("Erro ao deletar o funcionário. Tente novamente mais tarde.");
      }
  
    }


    return (
      <>
        <Header/>      
        <div className="p-5">  
            <div className="container px-5 ">               
                <Link className="link-unstyled link-light" to={'/userRegister'}>
                  <button className="float-end bg-verde-escola text-white p-1 px-2 border border-0" id="user-register-button">
                    Cadastra funcionário
                  </button>
                </Link>                
                <h3 >Funcionários</h3>                
                <div className="bg-white px-5 py-1 text-center">
                    <div className="row  m-2">
                        <input type="text" className="rounded col-12 my-2 fst-italic" placeholder="Digite o nome ou CPF do funcionário" onChange={(e)=>{setSearch(e.target.value)}}/>
                        
                        <div className="col-4 bg-cinza-light py-1">CPF</div> 
                    
                        
                        <div className="col-4 bg-cinza-light py-1"> Nome</div>
                        <div className="col-4 bg-cinza-light d-flex justify-content-around py-1">                            
                            <div>Atualizar</div>
                            <div> Deletar</div>
                        </div>
                    </div>
                    {
                        Object.keys(user).map((index) => (
                            <div className="row  m-2" key={index}>
                                <div className="col-4">{user[index].cpf}</div> 
                                <div className="col-4">{user[index].name}</div>
                                <div className="col-4 d-flex justify-content-around ">                                     
                                    
                                    <div><Link to="../userUpdate" state={{ id: user[index].id}}><img src={pencilEdit} /></Link></div>
                                    <button className="btn p-0"><ConfirmationModal action={deleteUser} id={user[index].id} name={user[index].name}/></button>
                                </div>
                            </div>
                        ))
                    }                
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

export default UsersList;