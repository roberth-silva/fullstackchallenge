import { Request, Response } from 'express';
import db from '../database/connection';

interface AuctionItem {
    id: number;
    item: string;
    value: number;
    type: string;
    auction_id: number;
}

class ItemAuctionController{
    
    /**LISTAR ITENS DE LEILÃO */
    async index(request: Request, response: Response){
        const param = request.params;

        const auction_id = param.auction_id as string;

        const items = await db('items_auction')
            .where('items_auction.auction_id', auction_id)
            .join('auctions', 'items_auction.auction_id', '=','auctions.id')            
            .select(
                [                    
                    //"auctions.name",
                    "items_auction.id",
                    "items_auction.item",
                    "items_auction.value",
                    "items_auction.type"
                ]
            );
        

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                name: item.name,
                item: item.item,
                value: item.value,
                type: item.type
            }
        });

        return response.json(serializedItems);
    }

    /**CRIAR NOVO ITEM */
    async create(request: Request, response: Response){        
        const {
            item,
            value,
            type,
            auction_id
        } = request.body;

        try {
            /**Inserindo novo item de leilão na tabela items_auction */
            const insertedItemIds = await db('items_auction').insert({
                item,
                value,
                type,
                auction_id
            });

            /**Recuperando id do item recém inserido */
            const item_id = insertedItemIds[0];

            /**API aqui então, retorna mensagem de sucesso para o usuário */
            return response.status(201).send({
                id: item_id,
                item: item,
                value: value,
                type: type                
            });
            
        } catch (error) {            
            return response.status(400).json({
                error: "Unexpected error while creating new item"
            });
        }
    }

    /**EXCLUIR ITEM */
    async delete(request: Request, response: Response){
        const param = request.params;

        const id = param.id as string;        

        try {
            
            const rowsAffected = await db('items_auction')
            .where('items_auction.id', id)
            .del();

            /**API aqui então, retorna mensagem de sucesso para o usuário */
            return response.status(200).send(rowsAffected);
            
        } catch (error) {
            /**Se algum erro acontecer no meio do caminho retorna mensagem de Bad Request */            
            return response.status(400).json({
                error: "Unexpected error while deleting item"
            });
        }
     }
}

export default ItemAuctionController;