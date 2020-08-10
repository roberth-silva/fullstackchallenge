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

    async logon(request: Request, response: Response){

        const {
            login,
            pass
        } = request.body;

        const users = await db('users')
        .where({
            login: login,
            pass: pass,            
          }).select('users.id','users.login','users.status');

          const serializedUser = users.map(user => {
            return {
                id: user.id,
                login: user.name,
                status: user.status
            }
        });

        return response.json(serializedUser);
    }
}

export default UserController;