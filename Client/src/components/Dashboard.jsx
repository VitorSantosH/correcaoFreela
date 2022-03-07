import React, { Component } from "react";
import Sidebar from "./layout/Sidebar";
import { Link } from "react-router-dom";
import moment from 'moment'
const axios = require("axios");
var FormData = require("form-data");


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

    componentDidUpdate(prevProps, prevState) {

        const { sortingKey, orderBy, rippdata } = this.state;
        if (prevState.sortingKey !== sortingKey || prevState.orderBy !== orderBy) {
            const sortedData = rippdata.sort(this.getSorting(orderBy, sortingKey));
            this.setState({ rippdata: sortedData });
        }
    }

    selectFiltro(value) {
        this.setState({ filter: value })
        this.setState({
            cadastrados: this.state.rippdata.map(item => {

                if (value == 'todo período') {
                    return item
                }
                if (value == 'hoje') {
                    if (moment(item.createdAt).format("D") == moment().format("D")
                        && moment(item.createdAt).format("M") == moment().format("M")) {

                        return item
                    }
                }
                if (value == 'esta semana') {
                    console.log(moment(item.createdAt).format("W"))
                    console.log(moment().format("W"))
                    if (moment(item.createdAt).format("W") == moment().format("W")
                        && moment(item.createdAt).format("M") == moment().format("M")) {

                        return item
                    }
                }
            })
        })

    }

    deleteentry(id) {
        let currentComponent = this;
        var data = new FormData();
        data.append("id", id);

        var config = {
            method: "post",
            url: "http://localhost:5000/api/delrippbank/",
            data: data,
        };

        axios(config)
            .then(function (response) {
                currentComponent.loaddata();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    loaddata() {
        let currentComponent = this;
        var config = {
            method: "get",
            url: "http://localhost:5000/api/rippbank",
            headers: { token: localStorage.getItem('token') },
        };

        axios(config)
            .then(function (response) {
                const { sortingKey, orderBy } = currentComponent.state;
                currentComponent.setState({ rippdata: response.data });
                const pageCount = Math.ceil(response.data.length / ROWS_PER_PAGE);
                currentComponent.setState({ pagesCount: pageCount });

                const sortedData = response.data.sort(
                    this.getSorting(orderBy, sortingKey)
                );
                this.setState({ rippdata: sortedData });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    changePage(page) {
        this.setState({ currentPage: page });
    }
    donwloads(e){

        this.state.cadastrados.map(item => {

            const data = {...item}
            var config = {
                method: "post",
                url: "http://localhost:5000/downloads/",
                data: data,
            };
    
            axios(config)
                .then( res => {
                    console.log(res)
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
            <section className="admin-panel">
                <Sidebar selectFiltro={this.selectFiltro.bind(this)} />
                <div className="right-part">
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
                    <div className="client-total">
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
                                        return <>
                                            <li>{cad.name}</li>
                                        </>
                                    }
                                })}
                            </ul>
                        </div>
                        <div className="client-right-info">
                            <p>Total: {todayRegistrations.length}</p>
                        </div>
                    </div>
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
                                    <th>Empresa</th>
                                    {/** <th>Score</th>  */}
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.map((data, index) => {

                                    if (data && filteredRecords.indexOf(data) === index) {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckChecked-1"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckChecked-1"
                                                    >
                                                        {new Date(data.createdAt).toDateString()}
                                                    </label>
                                                </td>
                                                <td>{data.cnpj}</td>
                                                <td>{data.cpf}</td>
                                                <td>{data.name}</td>
                                                <td>{data.city}</td>
                                                <td>{data.comptype}</td>
                                                {/*data.crrestriction === "yes" ? (
                          <td>
                            <span className="positivo">Positivo</span>
                          </td>
                        ) : (
                          <td>
                            <span className="negativo">Negativo</span>
                          </td>
                        )*/}

                                                <td>
                                                    <ul>
                                                        <li>

                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                email={data.email}
                                                                onClick={() => this.deleteentry(data._id)}
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

                                })}
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
                                            if (currentPage < pagesCount)
                                                this.changePage(currentPage + 1);
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
