import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { DiGithubBadge } from 'react-icons/di';
import { FiLinkedin } from 'react-icons/fi';

interface User{
    id: number;
    login: string;
    status: string;
    created_at: string;
}

const User = () => {
    const [users, setUsers] = useState([]);

    const history = useHistory();

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('usuarios');
            setUsers(response.data);
        }
        loadUsers();        
    }, []);

    function handleEditUser(id: string){
        localStorage.setItem('userId', id);
        history.push(`/usuarioeditar/${id}`);
    }

    function handleDeleteUser(id: string){
        localStorage.setItem('auctionId', id);
        history.push(`/usuarioexcluir/${id}`);
    }

    return (
        <div id="page-auction-user" className="container">
            <PageHeader
                title="FullStack Challenge"
                description="Listagem de Usuários"
            />
            <main>
                <fieldset>
                    <legend>Usuários cadastrados</legend>
                    <table>
                        <thead>
                            <tr className="rowHead">
                                <th>Id</th>
                                <th>Login</th>
                                <th>Status</th>
                                <th>Data de Cadastro</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: User) => (
                                <tr key={user.id} className="rowData">
                                    <td>{user.id}</td>
                                    <td>{user.login}</td>
                                    <td><span className={user.status == 'ATIVO' ? 'rowBadgePrimary': 'rowBadgeDanger'}>{user.status}</span></td>
                                    <td>{user.created_at}</td>
                                    <td className="btnData">
                                        <a onClick= {() => handleEditUser(String(user.id))} >
                                            <FaRegEdit size={22} color={"#04bf58"} />
                                        </a>
                                    </td>
                                    <td className="btnData">
                                        <a onClick= {() => handleDeleteUser(String(user.id))} >
                                            <FaTrashAlt size={20} color={"#950707"} />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>                    
                </fieldset> 
                <footer>
                    <div className="info">
                        <a target="_blank" href="https://github.com/roberth-silva" > 
                            <DiGithubBadge size={30} color={"#4169E1"} />
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/in/roberth-silva-a1818b46/" > 
                            <FiLinkedin size={30} color={"#4169E1"} />
                        </a>
                    </div>           
                </footer>             
            </main>
        </div>
    );
}

export default User;