import React, { useState, FormEvent } from 'react';

import api from '../../services/api';

import Input from '../../components/Input';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

import PageHeader from '../../components/PageHeader';
import { useHistory } from 'react-router-dom';


const AuctionForm = () => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');

    const [auctionItems, setAuctionItems] = useState([
        { item: '', value: 0, type: '' }
    ]);

    function validateForm() {
        return name.length > 0 && status.length > 0;
    }

    function addNewAuctionItem() {
        setAuctionItems([...auctionItems, { item: '', value: 0, type: '' }]);
    }

    async function handleCreateAuction(e: FormEvent){
        e.preventDefault(); //evita o reload da página

        const result = await api.post('leiloes', {
            name: name,
            status:status,
            user_id: 1,
            startdate: startdate,
            enddate: enddate,
            items: auctionItems
        });

        history.push('/leiloes');        
    }

    function setAuctionItemValue(pos: number, field: string, value: string) {        

        const updatedAuctionItems = auctionItems.map((auctionItem, index) => {
            if (index === pos) {
                return { ...auctionItem, [field]: value };
            }
            return { ...auctionItem };
        });

        setAuctionItems(updatedAuctionItems);
    }

    return (
        <div id="page-auction-form" className="container">
            <PageHeader
                title="FullStack Challenge"
                description="Cadastro de Leilão"
            />
            <main>
                <form onSubmit={handleCreateAuction}>
                    <fieldset>
                        <legend>Cadastro de Leilão</legend>

                        <Input
                            name="name"
                            label="Nome do Leilão"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            name="startdate"
                            label="Data de Início do Leilão"
                            type="date"
                            value={startdate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />

                        <Input
                            name="enddate"
                            label="Data de Término do Leilão"
                            type="date"
                            value={enddate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />

                        <Select
                            name="status"
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            options={[
                                { value: 'ABERTO', label: 'ABERTO' },
                                { value: 'FECHADO', label: 'FECHADO' }                    
                            ]}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Itens do leilão
                            <button type="button" onClick={addNewAuctionItem}>
                                + Adicionar Item
                            </button>
                        </legend>

                        {auctionItems.map((auctionItem, index) => (
                            <div className="auction-item">
                                <Input
                                    name="item"
                                    label="Descricao do Item"                                
                                    value={auctionItem.item}
                                    onChange={(e) =>
                                        setAuctionItemValue(index, 'item', e.target.value)
                                    }
                                />

                                <Input
                                    name="value"
                                    label="Valor do Item"
                                    type="number"
                                    value={auctionItem.value}
                                    onChange={(e) =>
                                        setAuctionItemValue(index, 'value', e.target.value)
                                    }
                                />

                                <Select
                                    name="type"
                                    label="Tipo do Item"
                                    value={auctionItem.type}
                                    onChange={(e) =>
                                        setAuctionItemValue(index, 'type', e.target.value)
                                    }
                                    options={
                                        [                            
                                            { value: 'NOVO', label: 'NOVO' },
                                            { value: 'USADO', label: 'USADO' }
                                        ]
                                    }
                                />                   
                            
                        </div>
                        ))}
                    </fieldset>

                    <footer>
                        <p>
                        <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                        </p>
                        <button 
                            type="submit" 
                            disabled={!validateForm()}
                        >Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>            
    </div>        
    );
}

export default AuctionForm;