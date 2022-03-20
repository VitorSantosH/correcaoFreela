import React, { Component } from "react";
import Sidebar from "./layout/Sidebar";
import { Link } from "react-router-dom";
import moment from 'moment';
import api from '../services/api'
const axios = require("axios");

var FormData = require("form-data");

const token = localStorage.getItem('token');
const ROWS_PER_PAGE = 4;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rippdata: [],
            searchTerm: "",
            sortingKey: "createdAt",
            orderBy: "asc",
            pagesCount: 1,
            currentPage: 1,
            cadastrados: [],
            filter: null,
            checkado: [],
            paginaNumber: 0,
            checked: false
        };
    }

    getSorting(order, orderBy) {
        if (order === "asc") {
            return (a, b) => {
                if (a[orderBy] < b[orderBy]) {
                    return -1;
                }
                if (a[orderBy] > b[orderBy]) {
                    return 1;
                }
                return 0;
            };
        }
        return (a, b) => {
            if (a[orderBy] > b[orderBy]) {
                return -1;
            }
            if (a[orderBy] < b[orderBy]) {
                return 1;
            }
            return 0;
        };
    }

    componentDidMount() {
        this.loaddata();
    }

    checar(value) {
        this.setState({ checkado: this.state.checkado.concat(value) })

    }

    removerLista(value) {

        const novorray = this.state.checkado.filter((item, index) => {
            if (item != value) {
                return item
            } else {
                return false
            }
        })

        this.setState({ checkado: novorray })
    }

    componentDidUpdate(prevProps, prevState) {

        const { sortingKey, orderBy, rippdata } = this.state;
        if (prevState.sortingKey !== sortingKey || prevState.orderBy !== orderBy) {
            const sortedData = rippdata.sort(this.getSorting(orderBy, sortingKey));
            this.setState({ rippdata: sortedData });
        }



    }

  
    deleteentry(data) {

        let currentComponent = this;


        api.post('/api/delrippbank/', {
            ...data
        })
            .then(res => {
                this.loaddata();
            })
            .catch(err => {
                console.log(err)
            })

    }

    async loaddata() {
        let currentComponent = this;
        var config = {
            method: "get",
            url: "/api/rippbank",
            headers: { token: localStorage.getItem('token') },
        };

        const data = await axios(config)
            .then(function (response) {
                const { sortingKey, orderBy } = currentComponent.state;
                currentComponent.setState({ rippdata: response.data });
                // const pageCount = Math.ceil(response.data.length / ROWS_PER_PAGE);

                currentComponent.setState({ pagesCount: response.data.length < 10 ? 1 : Math.ceil(response.data.length / 10) + 1 });

                const sortedData = response.data.sort(
                    this.getSorting(orderBy, sortingKey)
                );
                this.setState({ rippdata: sortedData });

            })
            .catch(function (error) {
                console.log(error);
            });

        this.SelectFiltro(data)

    }

    changePage(page) {
        this.setState({ currentPage: page });
    }
    CriarTd(data) {

        if (data.cnpj != null && data.cnpj != undefined && data.cnpj != 'undefined') {
            return <td>{data.cnpj} </td>
        }
        if (data.cnpj == null || data.cnpj == undefined || data.cnpj == 'undefined') {
            return <td>Pessoa Física</td>
        }
        return <td></td>
    }

    SelectFiltro(value) {


        value = value || 'todo período'


        const temp = this.state.rippdata.filter(item => {

            if (value == 'todo período') {
                return item
            }
            if (value == 'hoje') {


                if (moment(item.createdAt).format("D") == moment().format("D") && moment(item.createdAt).format("M") == moment().format("M")) {


                    return item
                }
            }
            if (value == 'esta semana') {

                if (moment(item.createdAt).format("W") == moment().format("W")
                    && moment(item.createdAt).format("M") == moment().format("M")) {

                    return item
                }
            }


        })


        this.setState({ filter: value })
        this.setState({
            cadastrados: temp
        })

    }


    PaginarTabela() {

        const tabela = this.state.cadastrados.map((data, index) => {




            if (index >= this.state.paginaNumber && index <= this.state.paginaNumber + 9) {
                
                if (data && this.state.cadastrados.indexOf(data) === index) {

                    return (
                        <tr key={index}>
                            <td>

                                {this.state.checked && (
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={data.cpf || data.cnpj}
                                        id="flexCheckChecked-1"
                                        checked
                                        onChange={e => {
                                            if (e.target.checked) {
                                                return this.checar(e.target.value)
                                            } else {
                                                return this.removerLista(e.target.value)
                                            }
                                        }}
                                    />
                                )}

                                {!this.state.checked && (
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={data.cpf || data.cnpj}
                                        id="flexCheckChecked-1"
                                        onChange={e => {
                                            if (e.target.checked) {
                                                return this.checar(e.target.value)
                                            } else {
                                                return this.removerLista(e.target.value)
                                            }
                                        }}
                                    />
                                )}

                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckChecked-1"
                                >
                                    {new Date(data.createdAt).toLocaleDateString('pt-BR')}
                                </label>
                            </td>
                            <this.CriarTd data />

                            <td>{data.cpf || data.cnpj}</td>
                            <td>{data.name}</td>
                            <td>{data.city}</td>
                            <td>
                                <ul>
                                    <li>

                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            email={data.email}
                                            onClick={() => this.deleteentry(data)}
                                        >
                                            <img src="images/delete.svg" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <Link to={"/card-app/" + data._id}>
                                            <img src="images/edit.svg" alt="" />
                                        </Link>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    );
                }

            }
        })



        return tabela


    }

    selecionarTodos() {

        this.setState({cadastrados: this.state.cadastrados})
    }

    donwloads(e) {


      

        this.state.cadastrados.map(item => {

           

            if(!item.cnpj || !item.cpf){
                return
            }

         

            if(this.state.checked ||  this.state.checkado.includes(item.cpf) || this.state.checkado.includes(item.cnpj)){

            } else {

                return 
            }

            const data = { ...item }
            var config = {
                method: "post",
                url: `/downloads/`,
                data: data,
            };

            axios(config)
                .then(res => {


                    window.open(`/static/${res.data}`)

                    /*   api.get(`/static/${res.data}`)
                           .then(arq => {
                               console.log(arq)
                               var blob = new Blob([arq.data], {
                                   type: 'application/zip'
                               })
                               var url = window.URL.createObjectURL(blob)
                               window.open(url)
                           }) */

                })
                .catch(err => [
                    console.log(err)
                ])
        })

    }

    render() {
        const {
            rippdata,
            searchTerm,
            currentPage,
            pagesCount,
            sortingKey,
            orderBy,
        } = this.state;

        const indexOfLastRecord = currentPage * ROWS_PER_PAGE;
        const indexOfFirstRecord = indexOfLastRecord - ROWS_PER_PAGE;
        const currentPageRecords = rippdata.slice(
            indexOfFirstRecord,
            indexOfLastRecord
        );

        const todayRegistrations = rippdata.filter(
            (item) =>
                new Date(item.createdAt).toDateString() === new Date().toDateString()
        );

        // Filter records from cnpj, cpf, name or city
        /* const filteredRecords = searchTerm
           ? rippdata.filter(
             (item) =>
               item.cnpj.includes(searchTerm) ||
               item.cpf.includes(searchTerm) ||
               item.name.includes(searchTerm) ||
               item.city.includes(searchTerm)
           )
           : currentPageRecords;
     */
        var filteredRecords = rippdata.map(user => {

            if (user.cnpj && user.cnpj.includes(searchTerm)) return user
            if (user.cpf && user.cpf.includes(searchTerm)) return user
            if (user.name && user.name.includes(searchTerm)) return user
            if (user.city && user.city.includes(searchTerm)) return user

        })



        return (
            <section className="admin-panel" style={{ 'minHeight': "100vh" }}>
                <Sidebar SelectFiltro={this.SelectFiltro.bind(this)} filter={this.state.filter} />
                <div className="right-part" style={{ 'minHeight': "100vh" }}>
                    <a href="#" className="switch m-open">
                        <img src="images/menu.svg" alt="" />
                    </a>

                    <div className="client-top">
                        <div className="client-name">
                            <h1>Clientes</h1>
                        </div>
                        <div className="client-info">
                            <h1>RappiBanks/Cliente</h1>
                        </div>
                    </div>
                    {/**
                     * 
                     * <div className="client-total">
                        <div className="client-left-info">
                            <span>
                                <img src="images/arrow-top.svg" alt="" />
                                Clientes cadastrados {this.state.filter && (
                                    <span> {this.state.filter} </span>
                                )}
                            </span>
                            <ul >
                                {this.state.cadastrados.map(cad => {

                                    if (cad) {
                                        return <li> Nome: {cad.name}, E-mail: {cad.email} </li>
                                    }
                                })}
                            </ul>
                        </div>
                        <div className="client-right-info">
                            {this.state.filter && (
                                <p>Total: {this.state.cadastrados.length}</p>
                            )}
                            {!this.state.filter && (
                                <p>Selecione um período</p>
                            )}
                        </div>
                    </div>
                     * 
                     * 
                     */}
                    <div className="inner-part">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Procurar "
                                aria-label="Procurar "
                                aria-describedby="basic-addon1"
                                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                            />
                            <span className="input-group-text" id="basic-addon1">
                                <img src="images/search-icon.svg" alt="" />
                            </span>
                        </div>
                        <div className="admin-btn">
                            <div className="btn" onClick={e => this.donwloads(e)}>
                                <span>
                                    <img src="images/download-icon.svg" alt="" />
                                </span>
                                Download
                            </div>
                            {/**
                           *   <Link to="/card-app" className="btn">
                                <span>
                                    <img src="images/add.svg" alt="" />
                                </span>
                                Adicionar pasta
                            </Link>
                           */}
                        </div>
                    </div>
                    <div className="table-responsive" style={{ minHeight: "300px" }}>
                        <table className="table align-middle dashboard-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckChecked"

                                            onChange={e => {

                                                if (e.target.checked) {
                                                    this.selecionarTodos();
                                                    return this.setState({checked : true})

                                                } else {
                                                    this.SelectFiltro();
                                                    return this.setState({checked : false})
                                                }
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckChecked"
                                        >
                                            Encontro{" "}
                                            <span>
                                                <img
                                                    src="images/calender-icon.svg"
                                                    alt=""
                                                    className="calender"
                                                />
                                            </span>
                                        </label>
                                    </th>
                                    <th>
                                        cnpj{" "}
                                        <span>
                                            <img
                                                onClick={() => {
                                                    if (sortingKey !== "cnpj")
                                                        this.setState({ sortingKey: "cnpj" });
                                                    else
                                                        this.setState({
                                                            orderBy: orderBy === "asc" ? "desc" : "asc",
                                                        });
                                                }}
                                                src="images/down-arrow.svg"
                                                alt=""
                                                style={{
                                                    transform:
                                                        sortingKey === "cnpj" && orderBy === "asc"
                                                            ? "rotate(180deg)"
                                                            : "",
                                                }}
                                            />
                                        </span>
                                    </th>
                                    <th>
                                        identificação{" "}
                                        <span>
                                            <img
                                                onClick={() => {
                                                    if (sortingKey !== "cpf")
                                                        this.setState({ sortingKey: "cpf" });
                                                    else
                                                        this.setState({
                                                            orderBy: orderBy === "asc" ? "desc" : "asc",
                                                        });
                                                }}
                                                src="images/down-arrow.svg"
                                                alt=""
                                                style={{
                                                    transform:
                                                        sortingKey === "cpf" && orderBy === "asc"
                                                            ? "rotate(180deg)"
                                                            : "",
                                                }}
                                            />
                                        </span>
                                    </th>
                                    <th>
                                        Nome{" "}
                                        <span>
                                            <img
                                                onClick={() => {
                                                    if (sortingKey !== "name")
                                                        this.setState({ sortingKey: "name" });
                                                    else
                                                        this.setState({
                                                            orderBy: orderBy === "asc" ? "desc" : "asc",
                                                        });
                                                }}
                                                src="images/down-arrow.svg"
                                                alt=""
                                                style={{
                                                    transform:
                                                        sortingKey === "name" && orderBy === "asc"
                                                            ? "rotate(180deg)"
                                                            : "",
                                                }}
                                            />
                                        </span>
                                    </th>
                                    <th>
                                        Cidade{" "}
                                        <span>
                                            <img
                                                onClick={() => {
                                                    if (sortingKey !== "city")
                                                        this.setState({ sortingKey: "city" });
                                                    else
                                                        this.setState({
                                                            orderBy: orderBy === "asc" ? "desc" : "asc",
                                                        });
                                                }}
                                                src="images/down-arrow.svg"
                                                alt=""
                                                style={{
                                                    transform:
                                                        sortingKey === "city" && orderBy === "asc"
                                                            ? "rotate(180deg)"
                                                            : "",
                                                }}
                                            />
                                        </span>
                                    </th>
                                    {/**  <th>Empresa</th>
                                     <th>Score</th>  */}
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.PaginarTabela()}
                            </tbody>
                        </table>
                    </div>
                    <div className="table-bottom">
                        <div className="bottom-pra">
                            <p>
                                Mostrando {filteredRecords.length} de {rippdata.length}{" "}
                                resultados
                            </p>
                        </div>
                        <div className="pagination-none">
                            <nav aria-label="Page navigation example">
                                <div className="prev">
                                    <a
                                        className="page-link btn"
                                        href="#"
                                        onClick={() => {
                                            if (currentPage !== 1) this.changePage(currentPage - 1);
                                            if (this.state.paginaNumber - 1 >= 0) {
                                                this.setState({ paginaNumber: this.state.paginaNumber - 9 })
                                            }
                                        }}
                                    >
                                        Anterior
                                    </a>
                                </div>
                                <ul className="pagination">
                                    {[...Array(pagesCount).keys()].map((page, index) => {

                                        return (
                                            <li className="page-item" key={page}>
                                                <a
                                                    className={`page-link ${currentPage === index + 1 ? "active" : ""
                                                        }`}
                                                    href="#"
                                                    onClick={() => this.changePage(index + 1)}
                                                >
                                                    {index + 1}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <div className="prev next">
                                    <a
                                        className="page-link btn"
                                        href="#"
                                        onClick={() => {
                                            if (currentPage < pagesCount) this.changePage(currentPage + 1);



                                            var increment = this.state.paginaNumber + 9 >= this.state.cadastrados.length ? (this.state.paginaNumber - this.state.cadastrados.length) : 9
                                            if (increment < 0) increment = 0

                                            if (this.state.cadastrados.length >= this.state.paginaNumber) {
                                                this.setState({ paginaNumber: this.state.paginaNumber + increment })
                                            }


                                        }}
                                    >
                                        Próximo
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Dashboard;
