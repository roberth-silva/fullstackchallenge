import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import { BsFillHouseFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaGavel, FaListOl } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";


interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  children,
  description,
}) => {

  const user = localStorage.getItem('login')
  const history = useHistory();  

  useEffect(() => {    
    console.log(user);
    if(!user){
      history.push('/');
    }
  }, []);

  function handleLogout(){
      localStorage.clear();
      history.push('/');
  }

  
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <a onClick={handleLogout}>
          <GrLogout size={25} />
        </a>
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        <div className="low-bar-container">
          <Link to="/home" >
            <BsFillHouseFill size={30} />
          </Link>
          <Link to="/leilao">                   
            <FaGavel size={30} />
          </Link>
          <Link to="/leiloes">            
            <FaListOl size={30} />
          </Link>
          <Link to="/usuarios">
            <FiUsers size={25} />
          </Link>
        </div>
        
        {children}
      </div>
    </header>
  );
};

export default PageHeader;