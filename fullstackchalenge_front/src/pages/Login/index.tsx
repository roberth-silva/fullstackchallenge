import React, { useState, FormEvent } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import leilao from '../../assets/images/leilao1.png';

import api from '../../services/api';

import './styles2.css';

interface User{
    id: number;
    login: string;
    status:string;
}

const Login = () => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    const history = useHistory();

    function validateForm() {
        return login.length > 0 && pass.length > 0;
    }

    async function handleLogin(e: FormEvent){
        e.preventDefault();

        const response = await api.post('/logon', {
            login: login,
            pass: pass
        });

        const user:User = response.data[0];
        
        if(user){
            localStorage.setItem('user_id', String(user.id));
            localStorage.setItem('login', user.login);
            history.push('/home');
        }
    }

    return(        
        <div className="logon-container">
            <section className="form">                
                <form onSubmit={handleLogin}>
                    <h1>Leilão Online</h1>
                    <h3>Entre com login e senha</h3>

                    <input 
                        placeholder="Login"
                        value={login}
                        onChange = {e => setLogin(e.target.value)}
                    />

                    <input 
                        placeholder="Senha"
                        type="password"
                        value={pass}
                        onChange = {e => setPass(e.target.value)}
                    />
                    <button                        
                        type="submit"
                        className="button"
                        disabled={!validateForm}
                    >Entrar</button>

                    <Link className="back-link" to="/registro">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>                
            </section>
            
            <img src={leilao} alt="Leilão Logo" />
        </div>
    );
}

export default Login;