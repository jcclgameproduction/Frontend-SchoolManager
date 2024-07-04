import logo from '../../../assets/images/Logo_sem_fundo.png';
import { MdDoneOutline } from "react-icons/md";

function Confirmed({email}) {

    return (
        <div className="border shadow mt-4" id="recover">
        <div className=" p-4">
            <h6 className="Confirmed">Confirmado <MdDoneOutline size={15} className="icon"  color="70E05F"/></h6> 
            <div >
                <p> 
                    Agradecemos por iniciar o processo de recriar sua senha de usuário.   
                </p>
                <p>
                   <strong> Um e-mail contendo um link para escolher sua nova senha foi enviado para o endereço</strong> <span>{email}.</span>
                </p>
                <p>
                    Por favor, verifique sua caixa de entrada e siga as instruções fornecidas no e-mail para escolher sua nova senha.
                </p>
                <p>
                    Se você não receber o e-mail dentro de alguns minutos, verifique sua pasta de spam ou entre em contato conosco para obter assistência.
                </p>
                <p>
                    Atenciosamente,
                </p>
                
            </div>
            <i>
                <strong> Escola Ville Maker</strong> 
                <img src={logo}/>
            </i>
        </div>
    </div>
    );
}
export default Confirmed;