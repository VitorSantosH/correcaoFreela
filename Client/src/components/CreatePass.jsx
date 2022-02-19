import React, { Component } from "react";

class CreatePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      p5: "",
      p6: "",
      isError: {
        p1: "",
        p2: "",
        p3: "",
        p4: "",
        p5: "",
        p6: "",
      },
    };
  }
  continue = e => {
    e.preventDefault();

    var isError = { ...this.state.isError };

    if (this.formValid(this.state)) {
      Object.keys(this.state).map(key => {
        if (this.state[key] === "" && key === "p1") {
          isError.p1 = "";
        } else if (this.state[key] === "" && key === "p2") {
          isError.p2 = "";
        } else if (this.state[key] === "" && key === "p3") {
          isError.p3 = "";
        } else if (this.state[key] === "" && key === "p4") {
          isError.p4 = "";
        } else if (this.state[key] === "" && key === "p5") {
          isError.p5 = "";
        } else if (this.state[key] === "" && key === "p6") {
          isError.p6 = "";
        } else if (
          this.state.p1 !== "" &&
          this.state.p2 !== "" &&
          this.state.p3 !== "" &&
          this.state.p4 !== "" &&
          this.state.p5 !== "" &&
          this.state.p6 !== ""
        ) {
          const pass =
            this.state.p1 +
            this.state.p2 +
            this.state.p3 +
            this.state.p4 +
            this.state.p5 +
            this.state.p6;
          this.props.handleChange("pass", pass);
          this.props.nextStep();
        }
      });
      this.setState({ isError });
    } else {
      console.log("Form is invalid!");
    }
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach(val => {
      if (val.length > 0) {
        isValid = false;
      } else {
        isValid = true;
      }
    });

    Object.values(rest).forEach(val => {
      if (val === null) {
        isValid = false;
      } else {
        isValid = true;
      }
    });

    return isValid;
  };

  handleChange = input => e => {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");
    // Check if they hit the max character length
    if (value.length >= maxLength) {
      // Check if it's not the last input field
      if (parseInt(fieldIndex, 10) < 6) {
        // Get the next input field
        const nextSibling = document.querySelector(
          `input[name=p-${parseInt(fieldIndex, 10) + 1}]`
        );

        // If found, focus the next field
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    }
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { isError } = this.state;
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

        <section className="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero page-7-hero page-8-hero page-9-hero page-10-hero  page-11-hero page-12-hero page-17-hero page-21-hero">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="form-top">
                  <h1>Crie sua senha de 6 dígitos</h1>
                  <p>Para entrar no aplicativo você deve criar uma senha</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="mm-number">
                  <div className="mm-number-container">
                    <div className="mm-number-input">
                      <div className="mm-number-input-container animated pt-3">
                        <div className="mm-number-input-item">
                          <input
                            type="password"
                            pattern="\d*"
                            className="animated"
                            name="p-1"
                            maxLength={1}
                            value={this.state.p1}
                            onChange={this.handleChange("p1")}
                            placeholder=""
                          />
                          {isError.p1.length > 0 ? (
                            <span className="error">{isError.p1}</span>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="mm-number-input-item">
                          <input
                            type="password"
                            pattern="\d*"
                            className={
                              isError.p1.length > 0
                                ? "animated error"
                                : "animated"
                            }
                            name="p-2"
                            maxLength={1}
                            value={this.state.p2}
                            onChange={this.handleChange("p2")}
                            placeholder=""
                          />
                          {isError.p2.length > 0 ? (
                            <span className="error">{isError.p2}</span>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="mm-number-input-item">
                          <input
                            type="password"
                            pattern="\d*"
                            className={
                              isError.p2.length > 0
                                ? "animated error"
                                : "animated"
                            }
                            name="p-3"
                            maxLength={1}
                            value={this.state.p3}
                            onChange={this.handleChange("p3")}
                            placeholder=""
                          />
                          {isError.p3.length > 0 ? (
                            <span className="error">{isError.p3}</span>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="mm-number-input-item">
                          <input
                            type="password"
                            pattern="\d*"
                            className={
                              isError.p3.length > 0
                                ? "animated error"
                                : "animated"
                            }
                            name="p-4"
                            maxLength={1}
                            value={this.state.p4}
                            onChange={this.handleChange("p4")}
                            placeholder=""
                          />
                          {isError.p4.length > 0 ? (
                            <span className="error">{isError.p4}</span>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="mm-number-input-item">
                          <input
                            type="password"
                            pattern="\d*"
                            className={
                              isError.p4.length > 0
                                ? "animated error"
                                : "animated"
                            }
                            name="p-5"
                            maxLength={1}
                            value={this.state.p5}
                            onChange={this.handleChange("p5")}
                            placeholder=""
                          />
                          {isError.p5.length > 0 ? (
                            <span className="error">{isError.p5}</span>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="mm-number-input-item">
                          <input
                            type="password"
                            pattern="\d*"
                            className={
                              isError.p5.length > 0
                                ? "animated error"
                                : "animated"
                            }
                            name="p-6"
                            maxLength={1}
                            value={this.state.p6}
                            onChange={this.handleChange("p6")}
                            placeholder=""
                          />
                          {isError.p6.length > 0 ? (
                            <span className="error">{isError.p6}</span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="page-1-hero-btn">
                  <button className="btn" onClick={this.back}>
                    VOLTAR
                  </button>
                  <button className="btn" onClick={this.continue}>
                    PRÓXIMO{" "}
                    <span>
                      <img src="images/double-arrow.svg" alt="" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <img
            src="images/password-main.png"
            alt=""
            className="password-main"
          />
        </section>

        <section className="cashback page-1-cashback page-6-cashback page-7-cashback page-10-cashback page-12-cashback">
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

export default CreatePass;
