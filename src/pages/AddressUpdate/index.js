import { useState, useEffect } from "react";
import config from "../../config";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/Header";

function AddressUpdate() {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [block, setBlock] = useState('');
    const [lot, setLot] = useState('');
    const [sector, setSector] = useState('');
    const [number, setNumber] = useState('');
    const [student, setStudent] = useState('');
    const { state } = useLocation();

    useEffect(()=>{
        getAddress();
    }, []);

    function getAddress() {
        try{  
            fetch(`${config.apiUrl}/address/${state.id}`, {
                method: 'GET',
                })
                .then((response) => response.json())
                .then((data) => {        
                    setStreet(data.address.street);
                    setCity(data.address.city);
                    setBlock(data.address.block); 
                    setLot(data.address.lot);
                    setSector(data.address.sector);  
                    setNumber(data.address.number);    
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
          if (street !== '' && city !== '' && block !== '' && lot !== '' && sector !== '' && number !== ''){
            const formData = new URLSearchParams();

            formData.append('id', state.id);
            formData.append('street', street);
            formData.append('city', city);
            formData.append('block', block);
            formData.append('lot', lot);
            formData.append('sector', sector);
            formData.append('number', number);
  
            fetch(`${config.apiUrl}/updateAddress`, {
              method: 'PUT',
              body: formData,
              headers: {
                'authorization': `${token}`,
              },
            })
            .then((response) => response.json())
            .then(() => {            
                toast.success("Endereço atualizado com sucesso!")          
            })
            .catch((error) => {
              console.log(error);
              toast.error("Não foi possível atualizar o endereço! Tente novamente mais tarde.");
          }); 
          } else{
            toast.error("Preencha todos os campos!");
          }          

        } catch(error){
          toast.error("Não foi possível atualizar o endereço! Tente novamente mais tarde.");
        }
    }

    return (
      <>
        <Header/>
        <div className="p-5 py-7">
          <h3 className="ps-5">Editar ficha de matrícula</h3>
          <div className="container bg-white rounded ">
            <div className="row p-5">
              <h4 className="text-center pb-3">Atualizar Endereço</h4>
              <div className="text-center border-0">
                <div className="row">
                  <br/><br/><br/>
                  <div className="col-md-4 mb-3">
                    <h5>*Rua:</h5> 
                    <input className="rounded  py-1  border-1" type="text" name="street" value={street} onChange={(e)=>{setStreet(e.target.value)}}/> 
                  </div> 
                  <div className="col-md-4 mb-3">
                    <h5>*Número:</h5> 
                    <input className="rounded  py-1  border-1" type="text" name="number" value={number} onChange={(e)=>{setNumber(e.target.value)}}/> 
                  </div> 
                  <div className="col-md-4 mb-3">
                    <h5>*Setor:</h5> 
                    <input className="rounded  py-1  border-1" type="text" name="sector" value={sector} onChange={(e)=>{setSector(e.target.value)}}/> 
                  </div> 
                </div> 
                <br/>
                <div className="d-flex row">
                  <br/> 
                  <div className="col-md-4 mb-3">
                    <h5>*Quadra:</h5> 
                    <input className="rounded  py-1  border-1" type="text" name="block" value={block} onChange={(e)=>{setBlock(e.target.value)}}/> 
                  </div>
                  <br/> 
                  <div className="col-md-4 mb-3 ">
                    <h5>*Lote:</h5> 
                    <input className="rounded  py-1  border-1" type="text" name="Lot" value={lot} onChange={(e)=>{setLot(e.target.value)}}/> 
                  </div>
                  <div className="col-md-4 mb-3 ">
                    <h5>*Cidade:</h5> 
                    <input className="rounded  py-1  border-1" type="text" name="city" value={city} onChange={(e)=>{setCity(e.target.value)}}/> 
                  </div>
                </div>
                <br/>
                <br/>
                
                
                <br/> <br/> <br/> <br/> <br/> 
                <div className="d-flex row">
                  <div className="col-md-4 mb-3">
                    <Link to="../studentUpdate" state={{ id: state.student }}><button className="default-button rounded bg-cinza-chumbo border-0 py-2 text-white" type="submit" >Voltar</button></Link>
                  </div> 
                  <div className="col-md-4 mb-3">
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

export default AddressUpdate;