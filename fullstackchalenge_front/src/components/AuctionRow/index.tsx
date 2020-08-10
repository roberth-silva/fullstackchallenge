import React from 'react';
import './styles.css';

export interface Auction {
    id: number;
    name: string;
    status: string;
    login: string;
    startdate: string;
    enddate: string;
}

interface AuctionItemProps {
    auction: Auction;
}

const AuctionRow: React.FC<AuctionItemProps> = ({ auction }) => {
    return (
        <article className="auction-item">
            <header>
                <div>
                    <strong>{auction.name}</strong>
                    <span>{auction.status} - {auction.login} - {auction.startdate} - {auction.enddate}</span>
                </div>
            </header>            
            <footer>
                <button type="button">
                    Editar
                </button>
                <button type="button">
                    Excluir
                </button>
            </footer>            
        </article>
    );
}

export default AuctionRow;