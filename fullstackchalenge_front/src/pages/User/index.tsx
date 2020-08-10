import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './styles.css';
import PageHeader from '../../components/PageHeader';

interface User{
    id: number;
    login: string;
    status: string;
    created_at: string;
}

const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('usuarios');
            setUsers(response.data);
        }
        loadUsers();        
    }, []);

    return (
        <div id="page-auction-form" className="container">
            <PageHeader
                title="FullStack Challenge"
                description="Listagem de Usuários"
            />
            <main>
                <fieldset>
                    <legend>Usuários cadastrados</legend>
                    <table>
                        <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Login</th>
                                    <th>Status</th>
                                    <th>Data de Cadastro</th>
                                    <th></th>
                                </tr>
                            </thead>
                        <tbody>
                            {users.map((user: User) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.login}</td>
                                    <td>{user.status}</td>
                                    <td>{user.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>                    
                </fieldset> 
                <footer>
                    <p>                
                        Algum Texto aqui, possivelmente os meus contatos
                    </p>                        
                </footer>             
            </main>
        </div>
    );
}

export default User;