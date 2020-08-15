import React, { useState, useEffect, FormEvent } from 'react';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

import './styles.css';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { useHistory } from 'react-router-dom';

const AuctionEdit = () => {

    const id = localStorage.getItem('auctionId');
    const history = useHistory();

    const [auctionName, setAuctionName] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [idItem, setIdItem] = useState(0);
    const [descItem, setDescItem] = useState('');
    const [valueItem, setValueItem] = useState('');
    const [typeItem, setTypeItem] = useState('');

    const [auction, setAuction] = useState({
        id: 0,
        name: '',
        status:'',
        startdate:'',
        enddate:'',
        login: ''
    });

    const [items, setItems] = useState([{
        id: 0,        
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

    async function handleAddItem(e: FormEvent){        
        e.preventDefault();

        const response = await api.post('items', {
            item: descItem,
            value: valueItem,
            type: typeItem,
            auction_id: id
        })

        setItems([...items, response.data]);
    }    

    async function handleDeleteItem(e: FormEvent){
        e.preventDefault();

        const response = await api.delete(`/items/${idItem}`);

        console.log(idItem);

        setItems(items.filter(item => item.id !== Number(idItem)));


        console.log(items);
        console.log(items.filter(item => item.id !== Number(idItem)));
    }

    async function handleEditAuction(e: FormEvent){
        e.preventDefault();
    }

    function handleBackList(){
        history.push('/leiloes');
    }

    return (
        <div id="page-auction-edit" className="container">
            <PageHeader
                title="FullStack Challenge"
                description="Edição de Leilão"
            />
            <main>                
                <fieldset>
                    <legend><span><FaEdit size={25} /></span>{auction.name}</legend>
                </fieldset>

                <fieldset>
                    <form onSubmit={handleEditAuction}>
                        <Input
                            name="leilao"
                            label="Leilão"
                            value={auction.name}
                            onChange={(e) =>
                                setDescItem(e.target.value)
                            }
                        />

                        <Select
                            name="status"
                            label="Status do Leilão"
                            value={auction.status}
                            onChange={(e) => setStatus(e.target.value)}
                            options={[
                                { value: 'ABERTO', label: 'ABERTO' },
                                { value: 'FECHADO', label: 'FECHADO' }                    
                            ]}
                        />

                        <Input
                            name="startdate"
                            label="Data de Abertura"
                            value={auction.startdate}
                            onChange={(e) =>
                                setStartDate(e.target.value)
                            }
                        />

                        <Input
                            name="enddate"
                            label="Data de Encerramento"
                            value={auction.enddate}
                            onChange={(e) =>
                                setEndDate(e.target.value)
                            }
                        />
                        <button type="submit">Atualizar</button>
                    </form>
                </fieldset>

                <fieldset>
                    <legend>
                        Adicionar Novo Item ao Leilão
                    </legend>
                    <form onSubmit={handleAddItem}>
                        <div className="auction-item">
                            <Input
                                name="item"
                                label="Descrição do Item"
                                value={descItem}
                                onChange={(e) =>
                                    setDescItem(e.target.value)
                                }
                            />

                            <Input
                                name="value"
                                label="Valor do Item"                            
                                value={valueItem}
                                onChange={(e) =>
                                    setValueItem(e.target.value)
                                }
                            />

                            <Select
                                name="type"
                                label="Tipo do Item"
                                value={typeItem}
                                onChange={(e) =>
                                    setTypeItem(e.target.value)
                                }
                                options={
                                    [
                                        { value: 'NOVO', label: 'NOVO' },
                                        { value: 'USADO', label: 'USADO' }
                                    ]
                                }
                            />
                            <button>
                                <FaPlus size={20} color={"#00008B"} />
                            </button>
                        </div>
                    </form>
                </fieldset>

                <fieldset>                    
                        <legend>
                            Listagem de Itens do Leilão
                        </legend>
                        <table>
                            <thead>
                                <tr className="rowHead">
                                    <th>Item</th>
                                    <th>Valor</th>
                                    <th>Tipo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="rowData">
                                        <td>{item.item}</td>
                                        <td>{item.value}</td>
                                        <td>{item.type}</td>
                                        <td className="btnData">
                                            <form onSubmit={handleDeleteItem}>
                                                <button type="submit" onClick={() => setIdItem(item.id)}>
                                                    <FaTrashAlt size={20} color={"#950707"} />
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>                        
                        </table>                    
                </fieldset>

                <footer>
                    <p>                        
                        Edição dos dados do leilão
                    </p>
                    <button onClick={() => handleBackList()}>Voltar</button>
                </footer>
                
            </main>
        </div>
    );
}

export default AuctionEdit;