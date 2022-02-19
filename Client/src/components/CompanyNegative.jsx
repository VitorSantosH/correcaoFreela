import React, { Component } from "react";

class CompanyNegative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comptype: "",
    };
  }
  continue = e => {
    e.preventDefault();
    this.props.nextStep(8);
  };

  handleChecked = e => {
    this.setState({ comptype: e.target.value });
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep(6);
  };
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
        <section className="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero page-7-hero">
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
                  <h1>Precisamos saber mais sobre sua empresa</h1>
                </div>
              </div>
              <div className="col-md-12">
                <div className="wrapper">
                  <div className="saber-text">
                    <h2>Seu CNPJ está negativado?</h2>
                    <p>
                      Conta pra gente se sua empresa está com restrição de
                      crédito
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
                  <a href="#" className="btn" onClick={this.back}>
                    VOLTAR
                  </a>
                  <a href="#" className="btn" onClick={this.continue}>
                    PRÓXIMO{" "}
                    <span>
                      <img src="images/double-arrow.svg" alt="" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="cashback page-1-cashback page-6-cashback page-7-cashback">
          <div className="container">
            <img src="images/dark-bg.svg" alt="" className="cashback-bg" />
            <img src="images/visa_card.png" alt="" className="visa_card" />
            <img src="images/4_arrows.svg" alt="" className="arrows_4" />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default CompanyNegative;
