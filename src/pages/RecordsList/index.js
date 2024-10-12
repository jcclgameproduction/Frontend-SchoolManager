import { useState, useEffect } from "react";
import config from "../../config";
import { Link, useLocation } from "react-router-dom";
import pencilEdit from "../../assets/icons/pencilEdit.svg";
import carne from "../../assets/icons/carne.svg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from "../../components/ConfirmationModal";
import Header from "../../components/Header";
import DropdownCotract from "../../components/DropdownContract";

function RecordsList() {
    const [people, setPeople] = useState([]);
    const [search, setSearch] = useState("");
    const [ reference, setReference] = useState("");
    const { state } = useLocation();

    useEffect(()=>{
      if(state && state.List === "familiar"){    
        setReference("familiar");    
        getFamiliars();
      } else if(state && state.List === "student"){
        setReference("student") 
        getStudents();
      } else{
        return (<>Erro</>)
      }
    }, []);

    useEffect(()=>{
      if(state && state.List === "familiar"){        
        getFamiliars();
      } else if(state && state.List === "student"){
        getStudents();
      } else{
        return (<>Erro</>)
      }
    }, [search]);

    function getStudents () {
      try{
          const formData = new URLSearchParams();

          formData.append('search', search);

          if(search.length < 1){
              fetch(`${config.apiUrl}/studentList`, {
                  method: 'GET',
                })
                  .then((response) => response.json())
                  .then((data) => {            
                    setPeople(data.studentsList);
                  })
                  .catch((error) => {
                    console.log(error);
                  }); 
          } else{
              fetch(`${config.apiUrl}/searchStudent/${search}`, {
                  method: 'GET',
                })
                  .then((response) => response.json())
                  .then((data) => {            
                    setPeople(data.student);       
                  })
                  .catch((error) => {
                    console.log(error);
                  }); 
          }
      } catch(error){
        console.log(error)
      }
  }

    function getFamiliars () {
        try{
            const formData = new URLSearchParams();

            formData.append('search', search);

            if(search.length < 1){
                fetch(`${config.apiUrl}/familiarsList`, {
                    method: 'GET',
                  })
                    .then((response) => response.json())
                    .then((data) => {            
                      setPeople(data.familiars);
                    })
                    .catch((error) => {
                      console.log(error);
                    }); 
            } else{
                fetch(`${config.apiUrl}/searchFamiliar/${search}`, {
                    method: 'GET',
                  })
                    .then((response) => response.json())
                    .then((data) => {            
                      setPeople(data.familiar);       
                    })
                    .catch((error) => {
                      console.log(error);
                    }); 
            }
        } catch(error){
          console.log(error)
        }
    }

    function deleteFamiliar(id){
      try{
        const token = localStorage.getItem('token');
        const formData = new URLSearchParams();

        formData.append('id', id);

        fetch(`${config.apiUrl}/deleteFamiliar`, {
          method: 'DELETE',
          body: formData,
          headers: {
            'authorization': `${token}`,
          },
        }).then(() => {            
            toast.success("Familiar deletado com sucesso!");    
            getFamiliars();     
          })
          .catch((error) => {                
            console.log(error)
            toast.error("Erro ao deletar o familiar. Tente novamente mais tarde.");
          });
        }
       catch(error){
        console.log(error)
        toast.error("Erro ao deletar o familiar. Tente novamente mais tarde.");
      }
  
    }

    function deleteStudent(enrollment){
      try{
        const token = localStorage.getItem('token');
        const formData = new URLSearchParams();

        formData.append('enrollment', enrollment);

        fetch(`${config.apiUrl}/deleteStudent`, {
          method: 'DELETE',
          body: formData,
          headers: {
            'authorization': `${token}`,
          },
        }).then(() => {            
            toast.success("Aluno deletado com sucesso!");    
            getStudents();     
          })
          .catch((error) => {                
            console.log(error)
            toast.error("Erro ao deletar aluno. Tente novamente mais tarde.");
          });
        }
       catch(error){
        console.log(error)
        toast.error("Erro ao deletar aluno. Tente novamente mais tarde.");
      }
  
    }

    return (
      <>
        <Header/>
        <div className="p-5 py-7">
          <h3 className="ps-5">Gerenciar fichas de matrícula</h3>
          <div className="container bg-white rounded p-1 ">
              
              <div className="px-5 text-center">
                  <div className="row  m-2">
                      {reference === "familiar" ? 
                          <input type="text" className="rounded col-12 my-2 fst-italic" placeholder="Digite o nome ou CPF do familiar" onChange={(e)=>{setSearch(e.target.value)}}/>
                        : <input type="text" className="rounded col-12 my-2 fst-italic" placeholder="Digite o nome ou matrícula do aluno" onChange={(e)=>{setSearch(e.target.value)}}/>
                      }
                      
                      {reference === "familiar" ? 
                          <div className="col-4 bg-cinza-light">CPF</div> 
                        : <div className="col-4 bg-cinza-light">Matrícula</div>
                      }
                      
                      <div className="col-4 bg-cinza-light"> Nome</div>
                      <div className="col-4 bg-cinza-light d-flex justify-content-around">
                        {reference === "student" && <div>Contrato</div>}         
                          {reference === "student" && <div>Carnê</div>}                        
                          <div>Atualizar</div>
                          <div> Deletar</div>
                      </div>
                  </div>
                  {
                      Object.keys(people).map((index) => (
                          <div className="row  m-2" key={index}>
                              {reference === "familiar" ? 
                                  <div className="col-4">{people[index].cpf}</div> 
                                : <div className="col-4">{people[index].enrollment}</div>
                              }                            
                              <div className="col-4">{people[index].name}</div>
                              <div className="col-4 d-flex justify-content-around ">
                                {reference === "student" && 
                                  <DropdownCotract enrollment={ people[index].enrollment} idResponsible={people[index].idResponsible}/>
                                } 
                                  {reference === "student" && 
                                    <div><Link to="../billOfPyaView" state={{ id: people[index].enrollment ,  responsible: people[index].idResponsible }} ><img src={carne} /></Link></div>
                                  }                                          
                                  {reference === "student" ?
                                      <div><Link to="../studentUpdate" state={{ id: people[index].enrollment }}><img src={pencilEdit} /></Link></div>
                                    : <div><Link to="../familiarUpdate" state={{ id: people[index].id }}><img src={pencilEdit} /></Link></div>
                                  }
                                  {reference === "student" ?
                                      <button className="btn p-0"><ConfirmationModal action={deleteStudent} id={people[index].enrollment} name={people[index].name}/></button>
                                    : <button className="btn p-0"><ConfirmationModal action={deleteFamiliar} id={people[index].id} name={people[index].name}/></button>
                                  }
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

export default RecordsList;