import React, { useState, FormEvent } from 'react';
import Input from '../../components/Input';

import api from '../../services/api';

import './styles.css';



const UserRegister = () => {

    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    
    async function handleCreateUser(e: FormEvent){
        e.preventDefault();

        const response = await api.post('usuarios', {
            login: login,
            pass: pass,
            status: 'ATIVO'
        });
        const user = response.data;

        console.log(response.data);

        if (user){
            alert('Usuário cadastrado com sucesso');
        }else{
            alert('Erro ao cadastrar');
        }

        setLogin('');
        setPass('');
    }

    return (
        <div id="page-auction-register" className="container">            
            <main>                
                    <form onSubmit={handleCreateUser}>
                        <fieldset>
                            <legend>Cadastro de Usuário</legend>

                            <Input
                                name="login"
                                label="Login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />

                            <Input
                                name="pass"
                                label="Senha"
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </fieldset>                    

                        <footer>
                            <a href="/">Voltar</a>
                            <button type="submit">Salvar cadastro</button>
                        </footer>
                    </form>                
            </main>
        </div>
    );
}

export default UserRegister;