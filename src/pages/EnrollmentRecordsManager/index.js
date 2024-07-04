import { Link } from "react-router-dom";

function EnrollmentRecordsManager() {
    
    return (
        <>
            <div className="p-5 py-7">
                <h3 className="ps-5">Gerenciar fichas de matrícula</h3>
                <div className="container bg-white rounded ">
                    <div className="text-center p-5">
                        <div className="py-3">
                            <Link to='../Menu' state={{ Menu: "register" }}>
                                <button className="default-button rounded bg-verde-escola text-white border-0 py-5 h5" type="submit" > 
                                    Realizar matrícula 
                                </button>
                            </Link>
                        </div>
                        <div className="py-3">
                            <Link to='../Menu' state={{ Menu: "view" }}>
                                <button className="default-button rounded bg-verde-escola text-white border-0 py-5 h5" type="submit" > 
                                    Acessar fichas 
                                </button>
                            </Link>
                        </div> 
                                    
                    </div>
                </div>
            </div>
        </>       
    );
}

export default EnrollmentRecordsManager;