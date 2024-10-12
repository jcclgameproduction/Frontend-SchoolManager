import "./style.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import leftArrow from "../../assets/icons/left-arrow.svg";

function Menu() {
    const { state } = useLocation();
    const [pahtName, setPathName] = useState('');
    const [action, setAction] = useState('');

    useEffect(() => {
        if (state && state.Menu === "view") {
          setPathName('List');
          setAction("Listar");
        } else {
          setPathName('Register');
          setAction("Registrar");
        }
      }, [state]);

    return (
        <>
            <Header/>
            <div className="p-5 py-4">
                <div className="ps-5">
                    <Link to={"../enrollmentRecordsManager"}><img src={leftArrow}/></Link>                    
                    <h3 > {action === "Registrar" ? <> Realizar Matrícula </> : <>Gerenciar fichas de matrícula</>}</h3>
                </div>
                <div className="container bg-white rounded ">
                    <div className="text-center p-5">
                        <div className="pt-3  ">
                            {action === "Registrar" ?
                                <Link className="link-unstyled link-light" to={"../familiarRegister"} ><button className="default-button rounded bg-cinza-chumbo text-white border-0 p-2" type="submit" > {action} Familiar </button></Link>
                            :   
                                <Link className="link-unstyled link-light" to={"../RecordsList"} state={{ List: "familiar" }}><button className="default-button rounded bg-cinza-chumbo text-white border-0 p-2" type="submit" > {action} Familiar </button></Link>
                            }
                        </div>
                        <div className="pt-3  "> 
                            {action === "Registrar" ?
                                <Link className="link-unstyled link-light" to={"../studentRegister"}><button className="default-button rounded bg-cinza-chumbo text-white border-0 p-2" type="submit" > {action} Aluno </button></Link>
                            :   
                            <Link className="link-unstyled link-light" to={"../RecordsList"} state={{ List: "student" }}><button className="default-button rounded bg-cinza-chumbo text-white border-0 p-2" type="submit" > {action} Aluno </button></Link>
                            }
                            
                        </div> 
                        {action === "Registrar" && 
                            <div className="pt-3  ">
                                <Link className="link-unstyled link-light" to={"../address"+pahtName}><button className="default-button rounded bg-cinza-chumbo text-white border-0 p-2" type="submit" > {action} Endereço </button></Link>
                            </div>
                        }                       
                        <div className="pt-3  " >
                            <Link className="link-unstyled link-light" to={"../catchStudentRegister"} state={{ Menu: state.Menu }}><button className="default-button rounded bg-cinza-chumbo text-white border-0 p-2" type="submit" > {action} responsável por buscar aluno </button></Link>
                        </div>               
                    </div>
                </div>
            </div>
        </>       
    );
}

export default Menu;