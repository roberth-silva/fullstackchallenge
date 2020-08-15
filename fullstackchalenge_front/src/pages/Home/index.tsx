import React from 'react';
import PageHeader from '../../components/PageHeader';
import { FcCheckmark } from 'react-icons/fc';
import { FiLinkedin } from 'react-icons/fi';
import { DiGithubBadge } from 'react-icons/di';

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

                    <h3><strong>Funcionalidades satisfeitas:</strong></h3><br/>
                        <ul>
                            <li>Login com autenticação na aplicação para acesso as funcionalidades <FcCheckmark /></li>
                            <li>Usuários desativados não acessam o sistema <FcCheckmark /></li>
                            <li>Logout da aplicação <FcCheckmark /></li>
                            <li>Bloqueio das funcionalidades pós-logout <FcCheckmark /></li>
                            <li>Cadastro de leilão <FcCheckmark /></li>
                            <li>Listagem dos leilões <FcCheckmark /></li>
                            <li>Visualização de leilão <FcCheckmark /></li>
                            <li>Edição de leilão <FcCheckmark /></li>
                            <li>Exclusão de leilão <FcCheckmark /></li>
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