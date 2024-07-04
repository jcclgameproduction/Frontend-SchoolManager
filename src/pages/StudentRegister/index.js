import { useState, useEffect } from "react";
import config from "../../config";
import { Link } from "react-router-dom";
import informations from "../../assets/icons/informations.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentRegister() {
    // variáveis que serão enviadas para o backend
    const [enrollment, setEnrollment] = useState("");
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [naturalness, setNaturalness] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [healthCare, setHealthCare] = useState('');
    const [mother, setMother] = useState('');
    const [father, setFather] = useState('');
    const [responsible, setResponsible] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [familiars, setFamiliars] = useState([]);

    useEffect(()=>{
        getAllFamiliars();
    }, []);
   

    function getAllFamiliars()  {
        fetch(`${config.apiUrl}/familiarsList`, {
            method: 'GET',
        })            
            .then((response) => response.json())
            .then((data) => {
              setFamiliars(data.familiars);
            })
            .catch((error) => {
            console.log(error);
        });
    };

    const register = (e) => {
        try{
          e.preventDefault();
          
          const token = localStorage.getItem('token');
          if (name !== '' && birthDate !== '' && 
            naturalness !== '' && monthlyPayment !== '' && healthCare !== '' && 
            responsible !== '' && emergencyContact !== ''
            ){
              const formData = new URLSearchParams();
              
              formData.append('enrollment', enrollment);
              formData.append('name', name);
              formData.append('birthDate', birthDate);
              formData.append('naturalness', naturalness);
              formData.append('monthlyPayment', monthlyPayment);
              formData.append('healthCare', healthCare);
              formData.append('mother', mother);
              formData.append('father', father);
              formData.append('responsible', responsible);
              formData.append('emergencyContact', emergencyContact);
    
              fetch(`${config.apiUrl}/studentRegister`, {
                method: 'POST',
                body: formData,
                headers: {
                  'authorization': `${token}`,
                },
              })
                .then(()=>{
                  toast.success("Estudante matriculado com sucesso!")
                })
                .catch((error) => {
                  toast.error("Erro no cadastro do estudante. Tente novamente mais tarde.");
                });
            } else{
              toast.error("Preencha todos os campos!");
          }          

        } catch(error){
          toast.error("Erro no cadastro do estudante. Tente novamente mais tarde.");
        }
    }

    return (
      <div className="p-5 py-7">
        <h3 className="ps-5">Matricular Aluno</h3>
        <div className="container bg-white rounded ">
          <div className="row pt-5">
            <h4 className="text-center pb-3">Cadastrar Aluno</h4>
            <div className="card text-center border-0">
              <div className="row">
                <br/><br/><br/>
                <div className="col-md-4 mb-3">
                  <h5>*Nome:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="name" onChange={(e)=>{setName(e.target.value)}}/> 
                </div> 
                <div className="col-md-4 mb-3">
                  <h5>*Naturalidade:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="naturalness" onChange={(e)=>{setNaturalness(e.target.value)}}/> 
                </div> 
                <div className="col-md-4 mb-3">
                  <h5>*Cuidados especiais:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="healthCare" onChange={(e)=>{setHealthCare(e.target.value)}}/> 
                </div> 
              </div> 
              <br/>
              <div className="d-flex row">
                <br/> 
                <div className="col-md-4 mb-3">
                  <h5>*Data de Nascimento:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="birthdate" onChange={(e)=>{setBirthDate(e.target.value)}}/> 
                </div>
                <br/> 
                <div className="col-md-4 mb-3 ">
                  <h5>*Mensalidade:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="monthlyPayment" onChange={(e)=>{setMonthlyPayment(e.target.value)}}/> 
                </div>
                <div className="col-md-4 mb-3 ">
                  <h5>*Contato de Emergência:</h5> 
                  <select onChange={(e)=>{setEmergencyContact(e.target.value)}} className="rounded py-1 px-3 border-1">
                    <option> </option>
                    {Object.keys(familiars).map((index) => (  
                      <option key={index} value={(familiars[index].id)}>
                        {familiars[index].name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br/>
              <div className="d-flex row">
                <div className="col-md-4 mb-3 ">
                    <h5>Mãe:</h5> 
                    <select onChange={(e)=>{setMother(e.target.value)}} className="rounded py-1 px-3 border-1">
                      <option> </option>
                      {Object.keys(familiars).map((index) => (                        
                        <option key={index} value={(familiars[index].id)}>
                          {familiars[index].name}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="col-md-4 mb-3 ">
                  <h5>Pai:</h5> 
                  <select  onChange={(e)=>{setFather(e.target.value)}} className="rounded py-1 px-3 border-1">
                    <option> </option>
                    {Object.keys(familiars).map((index) => (                        
                      <option key={index} value={familiars[index].id}>
                        {familiars[index].name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-3 ">
                  <h5>*Responsável Financeiro:</h5> 
                  <select onChange={(e)=>{setResponsible(e.target.value)}} className="rounded py-1 px-3 border-1">
                    <option> </option>
                    {Object.keys(familiars).map((index) => (                        
                      <option key={index} value={(familiars[index].id)}>
                        {familiars[index].name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br/>
              <div className="d-flex row">
                <div className="col-md-4 mb-3">
                  <h5>Matrícula <span ><img src={informations} title="Deixe em branco para gerar uma matrícula para o aluno automaticamente" alt="Informações"/></span></h5> 
                  <input className="rounded  py-1  border-1" type="text" name="enrollment" onChange={(e)=>{setEnrollment(e.target.value)}}/> 
                </div>
              </div>
              
              <br/> <br/> <br/> <br/> <br/> 
              <div className="d-flex row">
                <div className="col-md-4 mb-3">
                  <Link to="../Menu" state={{ Menu: "register" }}><button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit" >Menu</button></Link>
                </div> 
                <div className="col-md-4 mb-3">
                  <button className="default-button rounded bg-verde-escola text-white border-0 py-2" type="submit" onClick={register}>Cadastrar</button>
                </div> 
                <div className="col-md-4 mb-3">
                  <Link className="link-unstyled link-light" to="../addressRegister"><button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit" > Próximo </button></Link>
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

export default StudentRegister;