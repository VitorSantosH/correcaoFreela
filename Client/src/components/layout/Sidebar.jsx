import React, { Component } from "react";

const Sidebar = (props) => {

    

    const filtrar = (filter, value) => {


        if(filter == value ){
            
            return "#ff333b"
        }else {
            return "#212529"
        }
    }
    
    return (
        
        <div className="admin-main">
            <div className="left-side-bar">
                <a href="#" className="switch m-close">X</a>
                <div className="image-holder">
                    <img src="images/brand.png" alt="" />
                </div>
                <div className="menu-tittle">
                    <p>MENU PRINCIPAL</p>
                </div>
                <div className="menu-list" lang="pt-br" >
                    <ul>
                        <li className="active"><span><img src="images/user-icon.svg" alt="" /><a href="#">Cliente</a></span></li>
                        <li><button
                            lang="pt-br"
                            style={{ 'backgroundColor': 'transparent', 'border': 'none', "color": filtrar(props.filter,'todo período' ) }}
                            value='todo período'
                            onClick={e => props.SelectFiltro(e.target.value)}
                        >

                            Tudo
                        </button>
                        </li>
                        <li><button
                            lang="pt-br"
                            style={{ 'backgroundColor': 'transparent', 'border': 'none', "color": filtrar(props.filter,"hoje" ) }}
                            value="hoje"
                            onClick={e => props.SelectFiltro(e.target.value)}
                        >
                            Hoje
                        </button></li>
                        <li><button
                            lang="pt-br"
                            style={{ 'backgroundColor': 'transparent', 'border': 'none', "color": filtrar(props.filter,'esta semana' ) }}
                            value='esta semana'
                            onClick={e => props.SelectFiltro(e.target.value)}
                        >
                            Esta semana
                        </button></li>
                    </ul>
                </div>
            </div>
            <div className="logout">
                <span><img src="images/log-out.svg" alt="" />Sair</span>
            </div>
        </div>
    );
}

export default Sidebar;