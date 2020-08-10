import { Request, Response } from 'express';
import db from '../database/connection';

interface AuctionItem {
    item: string;
    value: number;
    type: string;
    auction_id: number;
}

class UserController{
    
    /**LISTAR USUÁRIOS */
    async index(request: Request, response: Response){        

        //Query de busca na tabela users
        const users = await db('users')
        .select(
            [
                "users.id",
                "users.login",
                "users.status",
                "users.created_at",
                "users.updated_at"
            ]
        );        

        return response.json(users);
    }
}

export default UserController;