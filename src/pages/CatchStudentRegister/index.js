import { useState, useEffect } from "react";
import config from "../../config";
import { Link , useLocation} from "react-router-dom";
import trash from "../../assets/icons/trash.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CatchStudentRegister() {
    const [student, setStudent]             = useState('');
    const [studentsList, setStudentsList]   = useState('');
    const [familiar, setFamiliar]           = useState([]);
    const [familiarsList, setFamiliarsList] = useState([]);
    const [responsibles, setResponsibles]     = useState("");
    const { state } = useLocation();

    useEffect(()=>{
      console.log(student)
        getCatchStudent();
    },[student]);

    useEffect(()=>{
        getAllFamiliars();
    }, []);

    useEffect(()=>{
        getStudent();
    }, []);

    function getCatchStudent() {
      fetch(`${config.apiUrl}/getCatchStudent/${student}`,{
        method: 'GET',
        })            
            .then((response) => response.json())
            .then((data) => {
              setResponsibles(data.familiarsList);
            })
            .catch((error) => {
            console.log(error);
      })
    };

    function getStudent() {
      fetch(`${config.apiUrl}/studentList`,{
        method: 'GET',
        })            
            .then((response) => response.json())
            .then((data) => {
              setStudentsList(data.studentsList);
            })
            .catch((error) => {
            console.log(error);
      })
    };   

    function getAllFamiliars()  {
        fetch(`${config.apiUrl}/familiarsList`, {
            method: 'GET',
        })            
            .then((response) => response.json())
            .then((data) => {
              setFamiliarsList(data.familiars);
            })
            .catch((error) => {
            console.log(error);
        });
    };

    const register = (e) => {
      try{
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (student !== '' && familiar !== ''){
          const formData = new URLSearchParams();

          formData.append('enrollment', student);
          formData.append('idFamiliar', familiar);

          fetch(`${config.apiUrl}/catchStudentRegister`, {
            method: 'POST',
            body: formData,
            headers: {
              'authorization': `${token}`,
            },
          })
            .then(() => {        
              getCatchStudent()            
              toast.success("Cadastro realizado com sucesso!")        
            })
            .catch((error) => {
              toast.error("Erro no cadastro. Tente novamente mais tarde.");
            });
        } else{
          toast.error("Preencha todos os campos!");
        }          

      } catch(error){
        toast.error("Erro no cadastro. Tente novamente mais tarde.");
      }
  }

  function deleteResponsible(enrollment, idFamiliars) {
    try{
      

      const token = localStorage.getItem('token');
        const formData = new URLSearchParams();

        formData.append('enrollment', enrollment);
        formData.append('idFamiliars', idFamiliars);
        fetch(`${config.apiUrl}/deleteCatchStudent`, {
          method: 'DELETE',
          body: formData,
          headers: {
            'authorization': `${token}`,
          },
        })
          .then(() => {        
            getCatchStudent()            
            toast.success("Responsável deletado com sucesso!")        
          })
          .catch((error) => {
            toast.error("Erro ao deletar responsável. Tente novamente mais tarde.");
          });
      }          

     catch(error){
      toast.error("Erro ao deletar responsável. Tente novamente mais tarde.");
    }
  }

    return (
      <div className="p-5 py-7">
        <h3 className="ps-5">Responsável por buscar aluno</h3>
        <div className="container bg-white rounded ">
          <div className="row pt-5">
            <h4 className="text-center">Quem está autorizado a retirar o aluno da instituição após o termino das aulas?</h4>
            <div className="card text-center border-0">
              <br/> <br/> <br/> <br/> 
              <div className="d-flex row">               
                <div className="col-md-6 mb-3">
                  <h5>Nome do Aluno:</h5> 
                  <select onChange={(e)=>{setStudent(e.target.value)}} className="rounded py-1 px-5 border-1">
                      <option> </option>
                      {Object.keys(studentsList).map((index) => (                        
                        <option key={index} value={(studentsList[index].enrollment)}>
                          {studentsList[index].name}
                        </option>
                      ))}
                    </select>
                </div>
                <br/> 
                <div className="col-md-6 mb-3 ">
                  <h5>Nome do Familiar:</h5> 
                  <select onChange={(e)=>{setFamiliar(e.target.value)}} className="rounded py-1 px-3 border-1">
                    <option> </option>
                    {Object.keys(familiarsList).map((index) => (                        
                      <option key={index} value={(familiarsList[index].id)}>
                        {familiarsList[index].name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <h5><strong>Responsáveis autorizados</strong></h5>
                <br/>
                {responsibles.length === 0 ? 
                  <h5>Nenhum responsável cadastrado</h5> : 
                  <div >
                    {Object.keys(responsibles).map((index) => (                        
                      <h5 key={index} className="row justify-content-evenly">
                        <span className="col-4"> {responsibles[index].name} </span> 
                        <span className="col-4"><button className="btn p-0" onClick={()=>{deleteResponsible(student, responsibles[index].id)}}><img src={trash}/></button></span>
                      </h5>
                      
                    ))}
                  </div>                  
                }
              </div>              
              <br/> <br/> <br/> <br/> <br/> 
              <div className="d-flex justify-content-center row">
                <div className="col-md-6 mb-3">
                  <Link to="../Menu" state={{ Menu: state.Menu }}>
                    <button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit" >Menu</button>
                  </Link>
                </div> 
                <div className="col-md-6 mb-3">
                  <button className="default-button rounded bg-verde-escola text-white border-0 py-2" type="submit" onClick={register} >Cadastrar</button>
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

export default CatchStudentRegister;