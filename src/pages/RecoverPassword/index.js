import { useState, useEffect } from "react";
import logo from '../../assets/images/Logo_sem_fundo.png';
import './style.css'
import Confirmed from './assets/Confirmed';
import InvalidEmail from './assets/InvalidEmail';
import config from "../../config";

function RecoverPassword() {
    const [email, setEmail] = useState('');
    const [submittedEmail, setSubmittedEmail] = useState(''); // Novo estado
    const [status, setStatus] = useState(null);
    const [loading , setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('type', 'CHANGE');

        setLoading(true);
        setSubmittedEmail(email); // Atualiza o email enviado

        fetch(`${config.apiUrl}/sendMail`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                setLoading(false);
                if (response.status === 401 || response.status === 404) {
                    setStatus(false);
                    throw new Error('E-mail não encontrado');
                }
                if (response.status === 200) {
                    setStatus(true);
                    return response.text(); // Alterado para lidar com texto
                }
                if (response.status === 500) {
                    setStatus(false);
                    throw new Error('Erro no servidor');
                }
            })
            .then((data) => {
                // data agora é uma string, não um objeto JSON
                console.log(data); // "Email enviado com sucesso"
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (loading === true) {
            setStatus(null);
        }
    }, [loading]);

    return (
        <div className="p-4" id="fundo">
            <div className="d-flex border shadow justify-content-center" id="recover">
                <div className=" py-4 " id="fundo-form">
                    <form  onSubmit={handleSubmit}>
                        <label htmlFor="email1">Digite seu e-mail</label><br/>
                        <input type="email" id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/> 
                        <br/>
                        <input value="confirmar" type="submit" id="btn" />
                    </form>
                </div>
            </div>
            {loading && 
                <div className="text-center" id="loading">
                  <div className="spinner-border" role="status">              
                  </div>
                </div>}
            {status === true && <Confirmed email={submittedEmail} />}
            {status === false && <InvalidEmail email={submittedEmail} />}
           
        

        </div>
    );
}
export default RecoverPassword;