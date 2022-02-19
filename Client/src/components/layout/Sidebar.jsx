import React, { Component } from "react";

class Sidebar extends Component{

    render(){
        return(
            <div className="admin-main">
                    <div className="left-side-bar">
                        <a href="#" className="switch m-close">X</a>
                        <div className="image-holder">
                            <img src="images/brand.png" alt=""/>
                        </div>
                        <div className="menu-tittle">
                            <p>MENU PRINCIPAL</p>
                        </div>
                        <div className="menu-list">
                            <ul>
                                <li className="active"><span><img src="images/user-icon.svg" alt=""/><a href="#">Cliente</a></span></li>
                                <li><a href="#">Tudo</a></li>
                                <li><a href="#">Hoje</a></li>
                                <li><a href="#">Esta semana</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="logout">
                        <span><img src="images/log-out.svg" alt=""/>Sair</span>
                    </div>
                </div>
    );
    }
}

export default Sidebar;