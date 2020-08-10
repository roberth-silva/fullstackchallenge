import React from 'react';
import PageHeader from '../../components/PageHeader';

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
                    <p>                
                        Algum Texto aqui, possivelmente os meus contatos
                    </p>
                </footer>            
            </main>
            
        </div>
    );
}

export default Home;