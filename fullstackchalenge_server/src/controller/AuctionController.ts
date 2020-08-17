import { Request, Response } from 'express';
import db from '../database/connection';

interface AuctionItem {
    item: string;
    value: number;
    type: string;
    auction_id: number;
}

class AuctionController{
    
    /**LISTAR LEILÕES */
    async index(request: Request, response: Response){
        const param = request.params;

        const id = param.id as string;

        var auctions;

        //Query de busca na tabela auction, com os devidos joins
        //A query muda caso exista um query param de id
        if (Number(id) > 0){
            auctions = await db('auctions')
            .where('auctions.id', id)
            .join('users', 'auctions.user_id', '=','users.id')            
            .select(
                [
                    "auctions.id",
                    "auctions.name",
                    "auctions.status",
                    "auctions.startdate",
                    "auctions.enddate",
                    "users.login"
                ]                
            );
        }else{
            auctions = await db('auctions')            
            .join('users', 'auctions.user_id', '=','users.id')        
            .select(
                [
                    "auctions.id",
                    "auctions.name",
                    "auctions.status",
                    "auctions.startdate",
                    "auctions.enddate",
                    "users.login"
                ]
            );
        }

        const serializedAuctions = auctions.map(auction => {
            return {
                id: auction.id,
                name: auction.name,
                status: auction.status,
                startdate: auction.startdate,
                enddate: auction.enddate,                
                login: auction.login
            }
        });

        return response.json(serializedAuctions);
    }

    /**CRIAR NOVO LEILÃO */
    async create(request: Request, response: Response){        
        const {
            name,
            user_id,
            startdate,
            enddate,
            status,

            items
        } = request.body;

        /**Precisaremos de uma trasação nesse métodos, pois iremos inserir registros em duas tabelas diferentes */
        const trx = await db.transaction();

        try {

            /**Inserindo novo Leilão na tabela auctions */
            const insertedAuctionIds = await trx('auctions').insert({                
                name,
                user_id,
                startdate,
                enddate,
                status
            });

            /**Recuperando id do leilão recém inserido */
            const auction_id = insertedAuctionIds[0];

            /**Iterando sobre cada item cadastrado para o leilão */
            const auctionItems = items.map((auctionItem: AuctionItem) => {
                return {
                    item: auctionItem.item,
                    value: auctionItem.value,
                    type: auctionItem.type,
                    auction_id
                }
            });

            /**Inserindo os itens na tabela items_auction */
            await trx('items_auction').insert(auctionItems);

            /**Se tudo der certo, confirma com o commit da transação */
            await trx.commit();

            /**API aqui então, retorna mensagem de sucesso para o usuário */
            return response.status(201).send();
            
        } catch (error) {
            /**Se algum erro acontecer no meio do caminho, desfaz todos os inserts e retorna mensagem de Bad Request */
            trx.rollback();
            return response.status(400).json({
                error: "Unexpected error while creating new auctions and items"
            });
        }
    }

    /**EDITAR LEILÃO */
    async edit(request: Request, response: Response){
        const {
            id,            
            name,
            status,
            startDate,
            endDate
        } = request.body;

        console.log(id,name,status,startDate,endDate);

        try {            
            const rowsAffected = await db('auctions')
            .where('auctions.id', id)
            .update({
                name,
                status,
                startDate,
                endDate
            });

            /**API aqui então, retorna mensagem de sucesso para o usuário */
            return response.status(200).send();
            
        } catch (error) {
            /**Se algum erro acontecer no meio do caminho retorna mensagem de Bad Request */            
            return response.status(400).json({
                error: "Unexpected error while editing auction"
            });
        }
     }

     /**EXCLUIR LEILÃO */
     async delete(request: Request, response: Response){
        const param = request.params;

        const id = param.id as string;        

        try {
            
            const rowsAffected = await db('auctions')
            .where('auctions.id', id)
            .del();

            /**API aqui então, retorna mensagem de sucesso para o usuário */
            return response.status(200).send();
            
        } catch (error) {
            /**Se algum erro acontecer no meio do caminho retorna mensagem de Bad Request */            
            return response.status(400).json({
                error: "Unexpected error while deleting auctions and items"
            });
        }
     }
}

export default AuctionController;