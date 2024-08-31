import { useState, useEffect } from "react";
import config from "../../config";
import { useLocation } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import qrcodePIX from "../../assets/images/qrcodePIX.png";
import "./style.css";
 

function BillOfPyaView(){    
    const { state } = useLocation();
    const [student, setStudent] = useState([]);
    const [responsible, setResponsible] = useState([]);
    const [currentDate, setCurrentDate] = useState([]);
    const [dayOfEnrollment, setDayOfEnrollment] = useState("");
    const [monthOfEnrollment, setMonthOfEnrollment] = useState("");
    const [yearOfEnrollment, setYearOfEnrollment] = useState("");
    const [remainingInvoices, setRemainingInvoices] = useState("");
    let parcel = 1;

    function calcRemainingInvoices(monthOfEnrollment){
        setRemainingInvoices(12-monthOfEnrollment);
    }

    function getcurrentDate(){
        const atualDate = new Date();
        const atualDay = atualDate.getDate();
        const atualMonth = atualDate.getMonth() + 1; // getMonth() retorna o mês de 0 a 11, por isso adicionamos 1
        const ataulYear = atualDate.getFullYear();
        const today = { atualDay, atualMonth, ataulYear }
        setCurrentDate(today);
    }

    function getStudents(){
        try{
            fetch(`${config.apiUrl}/getStudent/${state.id}`, {
                method: 'GET',
                })
                .then((response) => response.json())
                .then((data) => {            
                    setStudent(data.student);
                    const date = new Date(data.student.createdAt);
                    setDayOfEnrollment(date.getDate());
                    setMonthOfEnrollment(date.getMonth()+1);
                    setYearOfEnrollment(date.getFullYear());
                    calcRemainingInvoices(date.getMonth())
                })
                .catch((error) => {
                    console.log(error);
                }); 
        } catch(error){
          console.log(error)
        }
    }

    function getResponsible(){
        try{
            fetch(`${config.apiUrl}/getFamiliar/${state.responsible}`, {
                method: 'GET',
                })
                .then((response) => response.json())
                .then((data) => {            
                    setResponsible(data.familiar);
                })
                .catch((error) => {
                    console.log(error);
                }); 
        } catch(error){
          console.log(error)
        }
    }

    useEffect(()=>{
        getStudents();
        getResponsible();
        getcurrentDate();        
    }, []);

    return (
        <>
             {Array.from({ length: remainingInvoices }).map((_, index) => (
                <div className="" key={index} count={monthOfEnrollment + index}>
                    <div className=" bg-light">
                        <div className="row border border-bottom">
                            <div className="col-3 borderRight text-center">
                                <img src={logo}/>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-2"><img src={logo}/></div>
                                    <div className="col-10 ">
                                        <div className="text-center">
                                            <div><b className="fs-6">ESCOLA VILLE MAKER</b></div>
                                            <div className="textSize">RUA F-40 QD 56 LT 21 E 23 FAIÇALVILLE GOIÂNIA GO 74350-330</div>    
                                            <div className="textSize">Tel: (62) 3095-5713 | Cel: (62) 99316-6588 | E-mail: escolavillemaker@gmail.com</div>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>   
                        </div>
                        <div className="row border-bottom">
                            <div className="col-3 text-center borderRight">
                                <div className="textSize">Vencimento</div>
                                <div className="textSize">28/{monthOfEnrollment + index}/{yearOfEnrollment}</div>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-8 border-end">
                                        <div className="textSize">Local de Pagamento:</div>
                                        <div className="textSize">PAGÁVEL SOMENTE NA SECRETARIA DA ESCOLA OU VIA PIX: (CNPJ) 48.851.590/001-92</div>
                                    </div>
                                    <div className="col-4 ">
                                        <div className="text-center">
                                            <div className="textSize">Vencimento</div>
                                            <div className="textSize">28/{monthOfEnrollment + index}/{yearOfEnrollment}</div>
                                        </div>
                                    </div>                            
                                </div>
                            </div>   
                        </div>
                        <div className="row border-bottom">
                            <div className="col-3 text-center borderRight">
                                <div className="textSize">Valor do Documento</div>
                                <div className="textSize">R$ {student.monthlyPayment}</div>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-8 border-end">
                                        <div className="textSize">Nome do Cedente </div>
                                        <div className="textSize">ESCOLA VILLE MAKER</div>
                                    </div>
                                    <div className="col-4 ">
                                        <div className="text-center">
                                            <div className="textSize">Valor do Documento</div>
                                            <div className="textSize">R$ {student.monthlyPayment}</div>
                                        </div>
                                    </div>                            
                                </div>
                            </div>   
                        </div>
                        <div className="row border-bottom">
                            <div className="col-3 text-center borderRight">
                                <div className="textSize">N° Parcela/Total Parcelas</div>
                                <div className="textSize ">{parcel + index } / {remainingInvoices}</div>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-8 border-end">
                                        <div className="textSize">Endereço do Cedente </div>
                                        <div className="textSize">RUA F-40 QD 56 LT 21 E 23 FAIÇALVILLE GOIÂNIA GO 74350-330</div>
                                    
                                    </div>
                                    <div className="col-4">
                                        <div className="text-center">
                                            <div className="textSize">N° Parcela/Total Parcelas</div>
                                            <div className="textSize">{parcel + index } / {remainingInvoices}</div>
                                        </div>
                                    </div>                            
                                </div>
                            </div>   
                        </div>
                        <div className="row ">
                            <div className="col-3 text-center border-bottom borderRight">
                                <div className="textSize">(+) Acréscimos</div>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-8 border-end">
                                        <div className="textSize">Instruções</div>
                                        <div className="textSize">DESCONTO: </div>
                                        <div className="textSize">VIA PIX:  (CNPJ) 48.851.590/001-92 OU QRCODE</div>
                                    
                                    </div>
                                    <div className="col-4 border-bottom">
                                        <div className="text-center">
                                            <div className="textSize">(+) Acréscimos</div>
                                        </div>
                                    </div>                            
                                </div>
                            </div>   
                        </div>
                        <div className="row ">
                            <div className="col-3 text-center border-bottom borderRight">
                                <div className="text-center">
                                    <div className="textSize pb-4">(-) Valor Pago</div>
                                </div>
                                <div className="text-center border-top">
                                    <div className="textSize">( ) Descontos</div>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-8 border-end">                                    
                                        <div className="row justify-content-between">
                                            <div className="textSize col-6">
                                                <div className="textSize">10/{monthOfEnrollment + index }/{yearOfEnrollment} R$ {Math.round(parseInt(student.monthlyPayment)*0.5295)},00</div>
                                                <div className="textSize">20/{monthOfEnrollment + index }/{yearOfEnrollment} R$ {Math.round(parseInt(student.monthlyPayment)*0.5823)},00</div></div>
                                            <div className="textSize col-4">
                                                <img src={qrcodePIX}/>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <div className="col-4 border-bottom ">
                                        <div className="text-center">
                                            <div className="textSize pb-4">(-) Valor Pago</div>
                                        </div>
                                        <div className="text-center border-top">
                                            <div className="textSize">( ) Descontos</div>
                                        </div>
                                    </div>     
                                                            
                                </div>
                            </div>   
                        </div>
                        <div className="row border-bottom">
                            <div className="col-3 text-center borderRight">
                                <div className="textSize">Visto do Operador</div>
                                <div className="textSize">Pago em ___/___/___</div>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-8 border-end">
                                        <div className="row justify-content-between">
                                            <div className="textSize col">APÓS VENCIMENTO MULTA DE 0.2% MAIS ACRÉCIMO DE 0.9 AO DIA!</div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-4 ">
                                        <div className="text-center">
                                            <div className="textSize">Visto do Operador</div>
                                            <div className="textSize">Pago em ___/___/___</div>
                                        </div>
                                    </div>                            
                                </div>
                            </div>   
                        </div>
                        <div className="row border-bottom">
                            <div className="col-3 text-center borderRight">
                                <div className="textSize">Título: {state.id}</div>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-8 border-end">
                                        <div className="textSize">Sacado: {responsible && responsible.name} </div>
                                        <div className="textSize">CPF: {responsible && responsible.cpf}</div>
                                        <div className="textSize">{student.name}</div>
                                    </div>
                                    <div className="col-4 ">
                                        <div className="text-center">
                                            <div className="textSize">Emissão: {currentDate.atualDay}/{currentDate.atualMonth}/{currentDate.ataulYear}</div>
                                        </div>
                                    </div>                            
                                </div>
                            </div>   
                        </div>
                    </div>
                    <br/>
                    {(monthOfEnrollment + index)%3 == 0 && <><br/></>}
                </div>
            ))}
        </>
    )
}

export default BillOfPyaView;