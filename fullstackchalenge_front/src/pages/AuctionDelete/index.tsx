import React, { useState, useEffect, FormEvent } from 'react';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import { FaExclamationCircle } from 'react-icons/fa';

import './styles.css';
import { useHistory } from 'react-router-dom';

const AuctionDelete = () => {

    const id = localStorage.getItem('auctionId');
    const history = useHistory();

    const [auction, setAuction] = useState({
        id: 0,
        name: '',
        status:'',
        startdate:'',
        enddate:'',
        login: ''
    });

    useEffect(() => {
        async function loadAuctions(){
            const response = await api.get(`leiloes/${id}`);
            setAuction(response.data[0]);            
        }
        loadAuctions();
    }, []);

    async function handleDeleteAuction(e: FormEvent){
        e.preventDefault(); //evita o reload da página  
        const response = api.delete(`leiloes/${id}`);
        history.push('/leiloes');        
    }

    return (
        <div id="page-auction-delete" className="container">            
            <PageHeader
                title="FullStack Challenge"
                description="Exclusão de Leilão"
            />
            <main>
                <form onSubmit={handleDeleteAuction}>
                    <fieldset>
                        <legend>
                            <span>
                                <FaExclamationCircle size={25} color={"#970505"} />
                            </span>
                            ATENÇÃO! Exclusão de Leilão
                        </legend>
                    </fieldset>

                    <fieldset>
                        <label>Leilão: </label>
                        <label>{auction.name}</label>
                        <br/>

                        <label>Status: </label>
                        <label>{auction.status}</label>
                        <br/>

                        <label>Data de Abertura: </label>
                        <label>{auction.startdate}</label>
                        <br/>

                        <label>Data de Encerramento: </label>
                        <label>{auction.enddate}</label>
                        <br/>

                        <label>Responsável: </label>
                        <label>{auction.login}</label>
                        <br/>
                    </fieldset>               

                    <footer>                    
                        <p>Importante. Todos os items do leilão também serão excluídos.</p>                
                        <button type="submit">Deletar</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default AuctionDelete;