import React, { Component } from "react";
import { Navigate } from "react-router-dom";

const axios = require("axios");
class AboutYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comptype: "",
    };
    this.handleChecked = this.handleChecked.bind(this);
  }
  handleChecked = (e) => {
    console.log(e.target.value);
    this.setState({ comptype: e.target.value });
  };
  continue = (e) => {
    e.preventDefault();
    this.props.handleChange("comptype", this.state.comptype);
    this.props.nextStep();
  };
  componentDidMount() {
    var currcomp = this;
    var id = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    console.log(id);
    if (id !== "card-app" && id !== "") {
      var config = {
        method: "get",
        url: "http://localhost:5000/api/rippbank/" + id,
      };

      axios(config)
        .then(function (response) {
          currcomp.setState({ comptype: response.data[0].comptype });
          currcomp.setState({ name: response.data[0].name });
          currcomp.setState({ cpf: response.data[0].cpf });
          currcomp.setState({ dob: response.data[0].dob });
          currcomp.setState({ cell: response.data[0].cell });
          currcomp.setState({ email: response.data[0].email });
          currcomp.setState({ pass: response.data[0].pass });
          currcomp.setState({ martials: response.data[0].martials });
          currcomp.setState({ spouse: response.data[0].spouse });
          currcomp.setState({ zip: response.data[0].zip });
          currcomp.setState({ street: response.data[0].street });
          currcomp.setState({ number: response.data[0].number });
          currcomp.setState({ complement: response.data[0].complement });
          currcomp.setState({ city: response.data[0].city });
          currcomp.setState({ stater: response.data[0].stater });
          currcomp.setState({ occupation: response.data[0].occupation });
          currcomp.setState({ profession: response.data[0].profession });
          currcomp.setState({ income: response.data[0].income });
          currcomp.setState({ compname: response.data[0].compname });
          currcomp.setState({ crrestriction: response.data[0].crrestriction });
          currcomp.setState({ file: response.data[0].file });
          currcomp.setState({ src: response.data[0].file });
          currcomp.setState({ legalrep: response.data[0].legalrep });
          currcomp.setState({ cpnj: response.data[0].cpnj });
          currcomp.setState({ corpname: response.data[0].corpname });
          currcomp.setState({ id: response.data[0]._id });
          currcomp.setState({
            scSelectedFile: response.data[0].scSelectedFile,
          });
          currcomp.setState({
            ipSelectedFile: response.data[0].ipSelectedFile,
          });
          currcomp.setState({ fileIdPic: response.data[0].fileIdPic });
          currcomp.setState({
            filePicBackSide: response.data[0].filePicBackSide,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const { values } = this.props;
      //this.setState({comptype: values.comptype});
      console.log(values);
    }
  }
  render() {
    return (
      <React.Fragment>
        <header className="page-1-header">
          <div className="container">
            <div className="page-1-brand">
              <a href="#">
                <img src="images/brand.png" alt="" />
              </a>
            </div>
          </div>
        </header>

        <section className="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero page-7-hero page-15-hero">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="page-1-hero-progress">
                  <ul>
                    <li className="active"></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-top">
                  <h1>Precisamos saber mais sobre você</h1>
                </div>
              </div>
              <div className="col-md-12">
                <div className="wrapper">
                  <div className="saber-text">
                    <h2>Você é uma empresa?</h2>
                    <p>
                      Conta pra gente se você quer fazer o pedido pra você ou
                      pra sua empresa.
                    </p>
                  </div>
                  <div className="sim-nao-btn">
                    <button
                      id="yes-btn"
                      value="yes"
                      className={
                        this.state.comptype === "yes"
                          ? "btn company active"
                          : "btn company "
                      }
                      onClick={this.handleChecked}
                    >
                      SIM
                    </button>
                    <button
                      id="no-btn"
                      value="no"
                      className={
                        this.state.comptype === "no" ? "btn active" : "btn"
                      }
                      onClick={this.handleChecked}
                    >
                      NÃO
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page-1-hero-btn page-6-hero-btn">
                  {this.state.comptype != "" ? (
                    <button
                      id="com-page"
                      className="btn"
                      onClick={this.continue}
                    >
                      PRÓXIMO{" "}
                      <span>
                        <img src="images/double-arrow.svg" alt="" />
                      </span>
                    </button>
                  ) : (
                    <div className="error">
                      <p>Selecione uma das opções</p>{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cashback page-1-cashback page-6-cashback page-7-cashback page-15-cashback">
          <div className="container">
            <img src="images/dark-bg.svg" alt="" className="cashback-bg" />
            <img src="images/man_5.png" alt="" className="visa_card man_png" />
            <img src="images/4_arrows.svg" alt="" className="arrows_4" />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default AboutYou;
