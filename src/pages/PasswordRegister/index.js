import { useState, useEffect } from "react";

function PasswordRegister() {
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <div className="pt-4" id="fundo">
            <div className="d-flex border shadow justify-content-center" id="recover">
                <div className=" py-4 text-center" id="fundo-form">
                    <form  onSubmit={handleSubmit}>
                        <div className="pb-2">
                            <label >Digite sua nova senha</label><br/>
                            <input type="password" name="password" className="px-4 rounded" onChange={(e)=>{setPassword(e.target.value)}}/> 
                        </div>
                       
                        <div>
                            <label >Confirma sua nova senha</label><br/>
                            <input type="password" name="passwordConfirmed" className="px-4 rounded" onChange={(e)=>{setPasswordConfirmed(e.target.value)}}/>
                        </div>
                        
                        <br/>
                        <input className="py-1" value="Confirmar" type="submit" id="btn" />
                    </form>
                </div>
            </div>
        

        </div>
    );
}
export default PasswordRegister;