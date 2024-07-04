import { useState, useEffect } from "react";
import config from "../../config";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddressRegister() {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [block, setBlock] = useState('');
    const [lot, setLot] = useState('');
    const [sector, setSector] = useState('');
    const [number, setNumber] = useState('');
    const [student, setStudent] = useState('');
    const [studentsList, setStudentsList] = useState('');

      useEffect(()=>{
        getStudent();
    }, []);

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


    const register = (e) => {
        try{
          e.preventDefault();

          const token = localStorage.getItem('token');
          if (street !== '' && city !== '' && block !== '' && lot !== '' && sector !== '' && number !== '' && student !== ''){
            const formData = new URLSearchParams();

            formData.append('street', street);
            formData.append('city', city);
            formData.append('block', block);
            formData.append('lot', lot);
            formData.append('sector', sector);
            formData.append('number', number);
            formData.append('enrollment', student);
  
            fetch(`${config.apiUrl}/addressRegister`, {
              method: 'POST',
              body: formData,
              headers: {
                'authorization': `${token}`,
              },
            })
              .then(() => {            
                toast.success("Endereço cadastrado com sucesso!")        
              })
              .catch((error) => {
                toast.error("Erro no cadastro do endereço. Tente novamente mais tarde.");
              });
          } else{
            toast.error("Preencha todos os campos!");
          }          

        } catch(error){
          toast.error("Erro no cadastro do endereço. Tente novamente mais tarde.");
        }
    }

    return (
      <div className="p-5 py-7">
        <h3 className="ps-5">Matricular Aluno</h3>
        <div className="container bg-white rounded ">
          <div className="row pt-5">
            <h4 className="text-center">Cadastrar Endereço</h4>
            <div className="card text-center border-0">
              <div className="row">
                <br/><br/><br/>
                <div className="col-md-4 mb-3">
                  <h5>*Rua:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="street" onChange={(e)=>{setStreet(e.target.value)}}/> 
                </div> 
                <div className="col-md-4 mb-3">
                  <h5>*Número:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="number" onChange={(e)=>{setNumber(e.target.value)}}/> 
                </div> 
                <div className="col-md-4 mb-3">
                  <h5>*Setor:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="sector" onChange={(e)=>{setSector(e.target.value)}}/> 
                </div> 
              </div> 
              <br/>
              <div className="d-flex row">
                <br/> 
                <div className="col-md-4 mb-3">
                  <h5>*Quadra:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="block" onChange={(e)=>{setBlock(e.target.value)}}/> 
                </div>
                <br/> 
                <div className="col-md-4 mb-3 ">
                  <h5>*Lote:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="Lot" onChange={(e)=>{setLot(e.target.value)}}/> 
                </div>
                <div className="col-md-4 mb-3 ">
                  <h5>*Cidade:</h5> 
                  <input className="rounded  py-1  border-1" type="text" name="city" onChange={(e)=>{setCity(e.target.value)}}/> 
                </div>
              </div>
              <br/>
              <div className="d-flex row">
                <div className="col-md-4 mb-3 ">
                    <h5>Aluno:</h5> 
                    <select onChange={(e)=>{setStudent(e.target.value)}} className="rounded py-1 px-5 border-1">
                      <option> </option>
                      {Object.keys(studentsList).map((index) => (                        
                        <option key={index} value={(studentsList[index].enrollment)}>
                          {studentsList[index].name}
                        </option>
                      ))}
                    </select>
                </div>
                
                
              </div>
              <br/>
              
              
              <br/> <br/> <br/> <br/> <br/> 
              <div className="d-flex row">
                <div className="col-md-4 mb-3">
                  <Link to="../Menu" state={{ Menu: "register" }}><button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit" >Menu</button></Link>
                </div> 
                <div className="col-md-4 mb-3">
                  <button className="default-button rounded bg-verde-escola text-white border-0 py-2" type="submit" onClick={register}>Cadastrar</button>
                </div> 
                <div className="col-md-4 mb-3">
                  <Link className="link-unstyled link-light" to="../catchStudentRegister" state={{ Menu: "register" }}><button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit" > Próximo </button></Link>
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

export default AddressRegister;