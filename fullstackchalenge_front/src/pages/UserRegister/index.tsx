import React, { useState } from 'react';
import Input from '../../components/Input';

import './styles.css';

const UserRegister = () => {

    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    
    function handleCreateUser(){

    }

    return (
        <div id="page-auction-form" className="container">            
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
                        <a href="/login">Voltar</a>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default UserRegister;