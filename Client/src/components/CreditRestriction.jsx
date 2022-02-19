import React, { Component } from "react";

class CreditRestriction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crrestriction: "",
    };
    this.handleChecked = this.handleChecked.bind(this);
  }
  handleChecked = e => {
    this.setState({ crrestriction: e.target.value });
  };
  continue = e => {
    e.preventDefault();
    this.props.handleChange("crrestriction", this.state.crrestriction);
    this.props.nextStep();
  };
  componentDidMount() {
    const { values } = this.props;
    this.setState({ crrestriction: values.crrestriction });
  }
  back = e => {
    e.preventDefault();
    this.props.prevStep();
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
        <section className="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero">
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
              <div class="col-md-12">
                <div class="wrapper">
                  <div class="saber-text">
                    <h2>Você tem alguma restrição no seu nome?</h2>
                    <p>
                      Conta pra gente se você está com restrição de crédito em
                      seu nome.
                    </p>
                  </div>
                  <div className="sim-nao-btn">
                    <button
                      id="yes-btn"
                      value="yes"
                      className={
                        this.state.crrestriction === "yes"
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
                        this.state.crrestriction === "no" ? "btn active" : "btn"
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
                  {this.state.crrestriction !== "" ? (
                    <React.Fragment>
                      {" "}
                      <button class="btn" onClick={this.back}>
                        VOLTAR
                      </button>
                      <button id="com-page" class="btn" onClick={this.continue}>
                        PRÓXIMO{" "}
                        <span>
                          <img
                            src="https://bancorappi.com/images/double-arrow.svg"
                            alt=""
                          />
                        </span>
                      </button>
                    </React.Fragment>
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

        <section className="cashback page-1-cashback page-6-cashback">
          <div className="container">
            <img src="images/dark-bg.svg" alt="" className="cashback-bg" />
            <img src="images/man.png" alt="" className="visa_card man_png" />
            <img src="images/4_arrows.svg" alt="" className="arrows_4" />
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default CreditRestriction;
