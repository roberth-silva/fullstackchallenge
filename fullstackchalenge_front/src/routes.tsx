import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

//import Login from "./pages/Login";
import AuctionForm from "./pages/AuctionForm";
import User from "./pages/User";
import UserRegister from "./pages/UserRegister";
import AuctionList from "./pages/AuctionList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuctionDetail from "./pages/AuctionDetail";
import AuctionEdit from "./pages/AuctionEdit";
import AuctionDelete from "./pages/AuctionDelete";


// rotas para as páginas criadas
function Routes() {
  return (
    <BrowserRouter>      
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/leilao" component={AuctionForm} />
      <Route path="/leilaodetalhes/:id" component={AuctionDetail} />
      <Route path="/leilaoeditar/:id" component={AuctionEdit} />
      <Route path="/leilaoexcluir/:id" component={AuctionDelete} />
      <Route path="/leiloes" component={AuctionList} />
      <Route path="/usuarios" component={User} />
      <Route path="/registro" component={UserRegister} />
    </BrowserRouter>
  );
}

export default Routes;