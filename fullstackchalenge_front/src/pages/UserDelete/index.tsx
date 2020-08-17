import React, { useState, useEffect, FormEvent } from 'react';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import { FaExclamationCircle } from 'react-icons/fa';

import './styles.css';
import { useHistory } from 'react-router-dom';

interface User{
    id: number;
    login: string;
    status: string;
    updated_at: string;
    created_at: string;
}

const UserDelete = () => {

    const id = localStorage.getItem('auctionId');
    const history = useHistory();

    const [user, setUser] = useState<User>();

    useEffect(() => {
        async function loadUser(){
            const response = await api.get(`usuarios/${id}`);
            setUser(response.data[0]);
        }
        loadUser();
    }, []);

    async function handleDeleteUser(e: FormEvent){
        e.preventDefault();
        const response = api.delete(`usuarios/${id}`);
        history.push('/usuarios');
    }

    return (
        <div id="page-auction-delete" className="container">            
            <PageHeader
                title="FullStack Challenge"
                description="Exclusão de Usuário"
            />
            <main>
                <form onSubmit={handleDeleteUser}>
                    <fieldset>
                        <legend>
                            <span>
                                <FaExclamationCircle size={25} color={"#970505"} />
                            </span>
                            ATENÇÃO! Exclusão de Usuário
                        </legend>
                    </fieldset>

                    <fieldset>
                        <label>Id: </label>
                        <label>{user?.id}</label>
                        <br/>

                        <label>Usuário: </label>
                        <label>{user?.login}</label>
                        <br/>

                        <label>Status: </label>
                        <label>{user?.status}</label>
                        <br/>

                        <label>Data de Cadastro: </label>
                        <label>{user?.created_at}</label>
                        <br/>
                    </fieldset>

                    <footer>                    
                        <a href="/usuarios">
                            <span>Voltar</span>                            
                        </a>
                        <button type="submit">Deletar</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default UserDelete;