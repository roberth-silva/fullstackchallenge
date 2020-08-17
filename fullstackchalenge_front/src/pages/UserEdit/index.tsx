import React, { useState, useEffect, FormEvent } from 'react';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import { FaEdit } from 'react-icons/fa';

import './styles.css';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { useHistory } from 'react-router-dom';


interface User{
    id: number;
    login: string;
    status: string;
    updated_at: string;
}

const UserEdit = () => {

    const id = localStorage.getItem('userId');
    const history = useHistory();

    const [user, setUser] = useState<User>();

    useEffect(() => {
        async function loadUser(){
            const response = await api.get(`usuarios/${id}`);
            setUser(response.data[0]);
        }
        loadUser();
    }, []);

    async function handleUpdateUser(e: FormEvent){
        e.preventDefault();

        const response = await api.put('/usuarios', {
            id: id,
            login: user?.login,
            status: user?.status
        });

        if (response.status === 200){
            history.push('/usuarios');
        }else{
            alert('Ocorreu um erro ao editar os dados do usuário');
        }
    }

    function handleBackList(){
        history.push('/usuarios');
    }

    return (
        <div id="page-auction-edit" className="container">
            <PageHeader
                title="FullStack Challenge"
                description="Edição de Usuario"
            />
            <main>
                <form onSubmit={handleUpdateUser}>
                <fieldset>
                    <legend><span><FaEdit size={25} /></span>Editar Usuário {user?.login}</legend>
                </fieldset>

                <fieldset>
                    <Input
                        name="login"
                        label="Usuário"
                        value={user?.login}
                        onChange={(e) =>                                
                            setUser({
                                id: Number(user?.id),
                                login: e.target.value,
                                status: String(user?.status),
                                updated_at: String(user?.updated_at)
                            })
                        }
                    />
                    <Select
                        name="status"
                        label="Status"
                        value={user?.status}
                        onChange={(e) => 
                            setUser({
                                id: Number(user?.id),
                                login: String(user?.login),
                                status: e.target.value,
                                updated_at: String(user?.updated_at)
                            })
                        }
                        options={[
                            { value: 'ATIVO', label: 'ATIVO' },
                            { value: 'INATIVO', label: 'INATIVO' }
                        ]}
                    />
                    <br/>
                </fieldset>

                <footer>
                    <p>                        
                        Edição de usuário
                    </p>
                    <button type="submit">Atualizar</button>
                </footer>                
                </form>
            </main>
            
        </div>
    );
}

export default UserEdit;