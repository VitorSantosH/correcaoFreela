import React, { Component } from "react";

const Sidebar = (props) => {


    
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
                            style={{ 'backgroundColor': 'transparent', 'border': 'none' }}
                            value='todo período'
                            onClick={e => props.selectFiltro(e.target.value)}
                        >

                            Tudo
                        </button>
                        </li>
                        <li><button
                            lang="pt-br"
                            style={{ 'backgroundColor': 'transparent', 'border': 'none' }}
                            value="hoje"
                            onClick={e => props.selectFiltro(e.target.value)}
                        >
                            Hoje
                        </button></li>
                        <li><button
                            lang="pt-br"
                            style={{ 'backgroundColor': 'transparent', 'border': 'none' }}
                            value='esta semana'
                            onClick={e => props.selectFiltro(e.target.value)}
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