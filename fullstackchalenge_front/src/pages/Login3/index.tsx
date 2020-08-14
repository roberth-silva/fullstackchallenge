import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../assets/images/auction_logo.png';

import './css/main.css';
import './css/util.css';

interface User{
    id: number;
    login: string;
    status:string;
}

const Login3 = () => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    const history = useHistory();    

    async function handleLogin(e: FormEvent){
        console.log('ok');
        e.preventDefault();

        

        const response = await api.post('/logon', {
            login: login,
            pass: pass
        });

        const user:User = response.data[0];
        
        if(user){
            localStorage.setItem('login', user.login);
            history.push('/home');
        }
    }
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src={logo} />
                    </div>

                    <form onSubmit={handleLogin} className="login100-form validate-form">
                        <span className="login100-form-title">
                            Login
                        </span>

                        <div className="wrap-input100 validate-input" data-validate = "Usuário é orbigatório">
                            <input 
                                className="input100" 
                                type="text" 
                                name="login" 
                                placeholder="Usuario"
                                value={login}
                                onChange = {e => setLogin(e.target.value)}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Senha é obrigatória">
                            <input 
                                className="input100" 
                                type="password" 
                                name="pass" 
                                placeholder="Senha"
                                value={pass}
                                onChange = {e => setPass(e.target.value)}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                        
                        <div className="container-login100-form-btn">
                            <button type="submit" className="login100-form-btn">
                                Entrar
                            </button>
                        </div>                        

                        <div className="text-center p-t-50 p-b-50">
                            <a className="txt2" href="/registro">
                                Não tenho cadastro
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login3;