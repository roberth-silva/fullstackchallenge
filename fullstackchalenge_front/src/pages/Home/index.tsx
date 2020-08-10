import React from 'react';
import PageHeader from '../../components/PageHeader';
import { Link } from 'react-router-dom';
import { DiGithubBadge } from 'react-icons/di';
import { FiLinkedin } from 'react-icons/fi';

const Home = () => {
    return (
        <div id="page-auction-form" className="container">
            <PageHeader
                title="FullStack Challenge"
                description="Home"
            />
            <main>                
                <fieldset>
                    <legend>Implementação do Sistema de Leilão</legend>
                    <h3>Desenvolvedor: <strong>Roberth Adam da Silva</strong></h3><br/>

                    <p><strong>Funcionalidades satisfeitas:</strong></p>
                        <ul>
                            <li>Login com autenticação na aplicação para acesso as funcionalidades</li>
                            <li>Usuários desativados não acessam o sistema</li>
                            <li>Logout da aplicação</li>
                            <li>Bloqueio das funcionalidades pós-logout</li>
                            <li>Cadastro de leilão</li>
                            <li>Listagem dos leilões</li>
                            <li>Visualiação de leilão</li>
                            <li>Edição de leilão</li>
                            <li>Exclusão de leilão</li>
                        </ul>
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

export default Home;