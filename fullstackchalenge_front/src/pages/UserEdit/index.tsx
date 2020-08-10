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
    pass: string;
    status: string;
    created_at: string;
    updated_at: string;
}

const UserEdit = () => {

    const id = localStorage.getItem('userId');
    const history = useHistory();

    const [status, setStatus] = useState('');

    const [user, setUser] = useState<User[]>([]);

    // const [user, setUser] = useState([{
    //     id: 0, login: '', pass:'',status:'', created_at:'', updated_at:''
    // }]);

    useEffect(() => {
        async function loadUser(){
            const response = await api.get(`usuarios/${id}`);
            console.log(response.data[0].status);
            setUser(response.data[0]);
        }
        loadUser();
    }, []);

    

    async function handleUpdateUser(e: FormEvent){
        e.preventDefault();

        const response = await api.put('/usuarios', {
            id: id,
            status: status
        });

        setUser(response.data[0].status);
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
                    <legend><span><FaEdit size={25} /></span>Edição</legend>
                </fieldset>

                <fieldset>
                    <Select
                            name="status"
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
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