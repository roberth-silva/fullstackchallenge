import React, { useState, useEffect } from 'react';
import AuctionRow, { Auction } from '../../components/AuctionRow';

import api from '../../services/api';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import { FaRegEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { DiGithubBadge } from 'react-icons/di';
import { FiLinkedin } from 'react-icons/fi';

const AuctionList = () => {

    const history = useHistory();

    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        async function loadAuctions(){
            const response = await api.get('leiloes');
            setAuctions(response.data);
        }
        loadAuctions();
    }, []);

    function handleDetailAuction(id: string){
        localStorage.setItem('auctionId', id);
        history.push(`/leilaodetalhes/${id}`);
    }

    function handleEditAuction(id: string){
        localStorage.setItem('auctionId', id);
        history.push(`/leilaoeditar/${id}`);
    }

    function handleDeleteAuction(id: string){
        localStorage.setItem('auctionId', id);
        history.push(`/leilaoexcluir/${id}`);
    }

    return (
        <div id="page-auction-form" className="container">
            <PageHeader
                title="FullStack Challenge"
                description="Listagem de Leilões"
            />
            <main>
                <fieldset>
                    <legend>Leilões cadastrados</legend>                    
                    <table>
                        <thead>
                            <tr className="rowHead">
                                <th>Id</th>
                                <th>Leilão</th>
                                <th>Status</th>
                                <th>Responsável</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {auctions.map((auction: Auction) => (
                                <tr key={auction.id} className="rowData">
                                    <td>{auction.id}</td>
                                    <td>{auction.name}</td>
                                    <td>{auction.status}</td>
                                    <td>{auction.login}</td>                                    
                                    <td className="btnData">
                                        <a onClick= {() => handleDetailAuction(String(auction.id))} >
                                            <FaSearch size={20} color={"#191970"} />
                                        </a>
                                    </td>
                                    <td className="btnData">
                                        <a onClick= {() => handleEditAuction(String(auction.id))} >
                                            <FaRegEdit size={22} color={"#04bf58"} />
                                        </a>
                                    </td>
                                    <td className="btnData">
                                        <a onClick= {() => handleDeleteAuction(String(auction.id))} >
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

export default AuctionList;