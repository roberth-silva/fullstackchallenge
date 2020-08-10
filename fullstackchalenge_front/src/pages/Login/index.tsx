import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoJobs from '../../assets/images/jobs.png';

import './styles.css';

const Login = () => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    return(
        <div id="page-home">
            <div className="content">
                <main>
                    <h1>Desafio FullStack</h1>
                    <p>Leia o edital, faça sua inscrição e concorra a uma de nossas vagas</p>

                    <input 
                        placeholder="Usuário" 
                        value={login}
                        onChange = {e => setLogin(e.target.value)}
                    />
                    <input 
                        placeholder="Senha" 
                        value={pass}
                        type='password'
                        onChange = {e => setPass(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Entrar</strong>
                    </Link>
                </main>                
            </div>
            <div className="logo">
                <img src={logoJobs} alt="Vagas" />
            </div>
        </div>        
    );
}

export default Login;