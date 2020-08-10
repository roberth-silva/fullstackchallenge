import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import { FaGavel } from 'react-icons/fa';

import './styles.css';
import { useHistory } from 'react-router-dom';

const AuctionDetail = () => {

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

    const [items, setItems] = useState([{
        name: '',
        item: '',
        value: 0,
        type: ''
    }]);

    useEffect(() => {
        async function loadAuctions(){
            const response = await api.get(`leiloes/${id}`);
            setAuction(response.data[0]);
            const response2 = await api.get(`items/${id}`);
            setItems(response2.data);
        }
        loadAuctions();
    }, []);

    function handleBackList(){
        history.push('/leiloes');
    }

    return (
        <div id="page-auction-detail" className="container">
            <PageHeader
                title="FullStack Challenge"
                description="Detalhamento de Leilão"
            />
            <main>                
                <fieldset>
                    <legend><span><FaGavel size={25} /></span>{auction.name}</legend>
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

                <fieldset>
                    <legend>
                        Itens do Leilão
                    </legend>
                    <table>
                        <thead>
                            <tr className="rowHead">
                                <th>Item</th>
                                <th>Valor</th>
                                <th>Tipo</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.item} className="rowData">
                                    <td>{item.item}</td>
                                    <td>{item.value}</td>
                                    <td>{item.type}</td>
                                </tr>
                            ))}
                        </tbody>                        
                    </table>
                </fieldset>

                <footer>
                    <p>                        
                        Visualização dos dados do leilão
                    </p>
                    <button onClick={() => handleBackList()}>Voltar</button>
                </footer>
            </main>
        </div>
    );
}

export default AuctionDetail;