import { useState, useEffect } from "react";
import config from "../../config";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/Header";
import leftArrow from "../../assets/icons/left-arrow.svg";

function StudentUpdate() {
    // variáveis que serão enviadas para o backend
    const [name, setName]                           = useState('');
    const [birthDate, setBirthDate]                 = useState('');
    const [naturalness, setNaturalness]             = useState('');
    const [monthlyPayment, setMonthlyPayment]       = useState('');
    const [healthCare, setHealthCare]               = useState('');
    const [mother, setMother]                       = useState('');
    const [father, setFather]                       = useState('');
    const [responsible, setResponsible]             = useState('');
    const [emergencyContact, setEmergencyContact]   = useState('');
    const [address, setAddress]                     = useState("");
    const [familiars, setFamiliars]                 = useState([]);

    const [nameOfEmergency, setNameOfEmergency]     = useState("");
    const [nameOfMother, setNameOfMother]           = useState("");
    const [nameOfFather, setNameOfFather]           = useState("");
    const [nameOfResponsible, setNameOfResponsible] = useState("");

    const { state } = useLocation();

    useEffect(()=>{
        getStudent();
        getAllFamiliars();       
    }, []);

    useEffect(()=>{
        getNames();
    }, [familiars, emergencyContact])

    function getNames() {
        if(familiars.length > 0){
            let resultOfEmergency = familiars.filter((familiar) => familiar.id === emergencyContact);
            let resultOfMother = familiars.filter((familiar) => familiar.id === mother);
            let resultOfFather = familiars.filter((familiar) => familiar.id === father);
            let resultOfResponsible = familiars.filter((familiar) => familiar.id === responsible);            
            resultOfEmergency.length    > 0 ? setNameOfEmergency(resultOfEmergency[0].name)     : setNameOfEmergency("");
            resultOfMother.length       > 0 ? setNameOfMother(resultOfMother[0].name)           : setNameOfMother("");
            resultOfFather.length       > 0 ? setNameOfFather(resultOfFather[0].name)            : setNameOfFather("");
            resultOfResponsible.length  > 0 ? setNameOfResponsible(resultOfResponsible[0].name)  : setNameOfResponsible("");
        }
        
    }

    function getStudent() {
        try{  
            fetch(`${config.apiUrl}/getStudent/${state.id}`, {
                method: 'GET',
                })
                .then((response) => response.json())
                .then((data) => {            
                    setName(data.student.name)
                    setBirthDate(data.student.birthDate);
                    setNaturalness(data.student.naturalness); 
                    setMonthlyPayment(data.student.monthlyPayment);
                    setHealthCare(data.student.healthCare);  
                    setMother(data.student.idMother);
                    setFather(data.student.idFather); 
                    setResponsible(data.student.idResponsible);
                    setEmergencyContact(data.student.idEmergencyContact);
                    setAddress(data.student.idAddress);         
                })
                .catch((error) => {
                    console.log(error);
                }); 
            
        } catch(error){
          console.log(error)
        }
    }   

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

    const update = (e) => {
        try{
          e.preventDefault();
          
          const token = localStorage.getItem('token');
          if (  name !== '' && birthDate !== '' && 
                naturalness !== '' && monthlyPayment !== '' && healthCare !== '' && 
                responsible !== '' && emergencyContact !== ''
            ){
              const formData = new URLSearchParams();
              
              formData.append('enrollment', state.id);
              formData.append('name', name);
              formData.append('birthDate', birthDate);
              formData.append('naturalness', naturalness);
              formData.append('monthlyPayment', monthlyPayment);
              formData.append('healthCare', healthCare);
              formData.append('mother', mother);
              formData.append('father', father);
              formData.append('responsible', responsible);
              formData.append('emergencyContact', emergencyContact);
    
              fetch(`${config.apiUrl}/updateStudent`, {
                method: 'PUT',
                body: formData,
                headers: {
                  'authorization': `${token}`,
                },
              }).then((response) =>{
                  if(response.ok){
                    toast.success("Os dados do estudante foram atualizados!")
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
                });

            } else{
              toast.error("Preencha todos os campos!");
          }          

        } catch(error){
          toast.error("Não foi possível atualizar os dados do estudante! Tente novamente mais tarde.");
        }
    }

    return (
      <>
        <Header/>
        <div className="p-5 py-4">
          <div className="container rounded ">
            <Link to='../recordsList' state={{ List: "student" }}><img src={leftArrow}/></Link> 
            <h3 >Editar ficha de matrícula</h3>  
            <div className="row pt-5 bg-white ">
              <h4 className="text-center pb-3">Atualizar Aluno</h4>
              <div className="text-center border-0">
                <div className="row">
                  <br/><br/><br/>
                  <div className="col-md-4 mb-3">
                    <h5>Nome:</h5> 
                    <input className="rounded  py-1  border-1" type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/> 
                  </div> 
                  <div className="col-md-4 mb-3">
                    <h5>Naturalidade:</h5> 
                    <input className="rounded  py-1  border-1" type="text" name="naturalness" value={naturalness} onChange={(e)=>{setNaturalness(e.target.value)}}/> 
                  </div> 
                  <div className="col-md-4 mb-3">
                    <h5>Cuidados especiais:</h5> 
                    <input className="rounded  py-1  border-1" type="text" name="healthCare" value={healthCare} onChange={(e)=>{setHealthCare(e.target.value)}}/> 
                  </div> 
                </div> 
                <br/>
                <div className="d-flex row">
                  <br/> 
                  <div className="col-md-4 mb-3">
                    <h5>Data de Nascimento:</h5> 
                    <input className="rounded  py-1  border-1" type="text" name="birthdate" value={birthDate} onChange={(e)=>{setBirthDate(e.target.value)}}/> 
                  </div>
                  <br/> 
                  <div className="col-md-4 mb-3 ">
                    <h5>Mensalidade:</h5> 
                    <input className="rounded  py-1  border-1" type="text" name="monthlyPayment" value={monthlyPayment} onChange={(e)=>{setMonthlyPayment(e.target.value)}}/> 
                  </div>
                  <div className="col-md-4 mb-3 ">
                    <h5>Contato de Emergência:</h5> 
                    <select defaultValue={emergencyContact} onChange={(e)=>{setEmergencyContact(e.target.value)}} className="rounded py-1 px-3 border-1">
                      
                      <option value={emergencyContact}>{nameOfEmergency} </option>
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
                      <select defaultValue={mother} onChange={(e)=>{setMother(e.target.value)}} className="rounded py-1 px-3 border-1">
                          <option value={mother}>{nameOfMother} </option>
                          {Object.keys(familiars).map((index) => (                        
                              <option key={index} value={(familiars[index].id)}>
                              {familiars[index].name}
                              </option>
                          ))}
                      </select>
                  </div>
                  <div className="col-md-4 mb-3 ">
                    <h5>Pai:</h5> 
                    <select defaultValue={father} onChange={(e)=>{setFather(e.target.value)}} className="rounded py-1 px-3 border-1">
                      <option value={father}>{nameOfFather} </option>
                      {Object.keys(familiars).map((index) => (                        
                        <option key={index} value={familiars[index].id}>
                          {familiars[index].name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3 ">
                    <h5>Responsável Financeiro:</h5> 
                    <select defaultValue={responsible} onChange={(e)=>{setResponsible(e.target.value)}} className="rounded py-1 px-3 border-1">
                      <option value={responsible}>{nameOfResponsible} </option>
                      {Object.keys(familiars).map((index) => (                        
                        <option key={index} value={(familiars[index].id)}>
                          {familiars[index].name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <br/>
                              
                <br/> <br/> <br/> <br/> <br/> 
                <div className="d-flex row">
                  <div className="col-md-4 mb-3">
                    <Link to="../Menu" state={{ Menu: "view" }}><button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit" >Menu</button></Link>
                  </div> 
                  <div className="col-md-4 mb-3">
                    <button className="default-button rounded bg-verde-escola text-white border-0 py-2" type="submit" onClick={update}>Atualizar</button>
                  </div> 
                  {address === null ? 
                    <div className="col-md-4 mb-3">
                      <Link className="link-unstyled link-light" to="../addressRegister"><button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit"> Registrar Endereço </button></Link>
                    </div>
                  : 
                    <div className="col-md-4 mb-3">
                      <Link className="link-unstyled link-light" to="../addressUpdate" state={{ id: address, student: state.id }} ><button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit" > Editar Endereço </button></Link>
                    </div>
                }
                  
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

export default StudentUpdate;