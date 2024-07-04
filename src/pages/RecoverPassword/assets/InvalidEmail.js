import logo from '../../../assets/images/Logo_sem_fundo.png';
import { MdDoneOutline } from "react-icons/md";

function InvalidEmail({email}) {
    
    return (
        <div className=" border shadow mt-4" id="recover">
        <div className=" p-4">
            <h6 className="Invalid">E-mail invalido </h6> 
            <div>
                <p> 
                Caro usuário,Desculpe-nos, mas parece que o endereço de e-mail que você forneceu <span>{email}</span> não é válido. Certifique-se de digitar corretamente o seu endereço de e-mail ao solicitar a recuperação de senha.  
                </p>
                <p>
                Se precisar de assistência ou achar que isso foi um erro, entre em contato conosco através do e-mail <span>emaildaescola@gmail.com.</span>
                </p>
            
                <p>
                Agradecemos pela compreensão.<br/>
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
export default InvalidEmail;