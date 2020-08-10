import React, { useState, FormEvent } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoJobs from '../../assets/images/jobs.png';

import api from '../../services/api';

import './styles2.css';

const Login = () => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    async function handleLogin(e: FormEvent){
        e.preventDefault();

        const response = await api.post('/logon', {
            login: login,
            pass: pass
        });

        /**ARRUMAR AQUIII - CONTINUAR*/
    }

    return(        
        <div className="logon-container">
            <section className="form">                
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

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
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/registro">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={logoJobs} alt="Heroes" />
        </div>
    );
}

export default Login;