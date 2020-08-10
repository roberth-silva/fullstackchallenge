import express from 'express';

import AuctionController from './controller/AuctionController';
import ItemAuctionController from './controller/ItemAuctionController';
import UserController from './controller/UserController';

const routes = express.Router();

const auctionController = new AuctionController();
const itemAuctionController = new ItemAuctionController();
const userController = new UserController();

routes.get('/leiloes', auctionController.index);
routes.get('/leiloes/:id', auctionController.index);
routes.post('/leiloes', auctionController.create);
routes.delete('/leiloes/:id', auctionController.delete);

routes.get('/items/:auction_id', itemAuctionController.index);
routes.post('/items', itemAuctionController.create);
routes.delete('/items/:id', itemAuctionController.delete);

routes.get('/usuarios', userController.index);

export default routes;