import React, { Component } from "react";
import axios from "axios";
import { cpf, cnpj } from "cpf-cnpj-validator";
import NumberFormat from "react-number-format";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legalrep: "",
      legalrepError: "form-control",
      legalrepInputError: true,
      cpf: "",
      cpfError: "form-control",
      cpfInputError: true,
      dob: "",
      dobError: "form-control",
      dobInputError: true,
      cpnj: "",
      cpnjError: "form-control",
      cpnjInputError: true,
      cell: "",
      cellError: "form-control",
      cellInputError: true,
      email: "",
      emailError: "form-control",
      emailInputError: true,
      name: "",
      nameError: "form-control",
      nameInputError: true,
      nameFetchError: "",
      isError: {
        cpnj: "",
        email: "",
        cpf: "",
        name: "",
      },
    };
    this.continue = this.continue.bind(this);
  }

  getNameByCNPJ = async (cnpj) => {
    let formattedCNPJ = cnpj.match(/\d/g).join("");
    if (formattedCNPJ)
      axios
        .get(`http://localhost:5000/api/getInfo/${formattedCNPJ}`, config)
        .then((response) => {
          this.setState({ name: response.data.nome });
          this.setState({
            nameFetchError: "",
          });
        })
        .catch((error) => {
          this.setState({
            nameFetchError: "Cannot get name. Please try Again !",
          });
          console.error("There was an error!", error);
        });
  };

  componentDidMount() {
    const { values } = this.props;
    this.setState({ cpf: values.cpf });
    this.setState({ dob: values.dob });
    this.setState({ cpnj: values.cpnj });
    this.setState({ cell: values.cell });
    this.setState({ email: values.email });
    this.setState({ name: values.name });
  }

  callbackState = () => {
    let cState = this.state;
    if (
      !cState.nameInputError &&
      !cState.dobInputError &&
      !cState.cellInputError &&
      !cState.legalrepInputError
    ) {
      this.props.handleChange("cpf", this.state.cpf);
      this.props.handleChange("dob", this.state.dob);
      this.props.handleChange("cell", this.state.cell);
      this.props.handleChange("cpnj", this.state.cpnj);
      this.props.handleChange("email", this.state.email);
      this.props.handleChange("name", this.state.name);
      this.props.handleChange("legalrep", this.state.legalrep);
      if (this.state.dob.length == 10) {
        let year = cState.dob.substring(0, 4);
        if (year && Number(year) > 2003) {
          this.setState({ dobError: "form-control error" });
        } else {
          this.props.nextStep();
        }
      }
    }
  };

  continue = (e) => {
    e.preventDefault();
    let cMState = this.state;
    // let emailRegex = /(^[A-Za-z0-9.]+[@][a-zA-Z]{2,}[.]{1}[a-zA-Z]{3,}(([.]{1}[a-z]{2,})?)$)/;
    var isError = { ...this.state.isError };
    console.log(isError.email);
    if (this.formValid(this.state)) {
      Object.keys(this.state).map((key) => {
        if (this.state[key] === "" && key === "email") {
          isError.email = "Email Required";
        } else if (this.state[key] === "" && key === "cpf") {
          isError.cpf = "cpf Required";
        } else if (this.state[key] === "" && key === "cpnj") {
          isError.cpnj = "CPNJ Required";
        } else if (
          this.state["email"] !== "" &&
          this.state["cpf"] !== "" &&
          this.state["cpnj"] !== ""
        ) {
          if (cMState.name === "") {
            this.setState(
              { nameError: "form-control error", nameInputError: true },
              () => this.callbackState()
            );
          } else {
            this.setState(
              { nameError: "form-control", nameInputError: false },
              () => this.callbackState()
            );
          }

          if (cMState.legalrep === "") {
            this.setState(
              { legalrepError: "form-control error", legalrepInputError: true },
              () => this.callbackState()
            );
          } else {
            this.setState(
              { legalrepError: "form-control", legalrepInputError: false },
              () => this.callbackState()
            );
          }

          if (cMState.dob === "") {
            this.setState(
              { dobError: "form-control error", dobInputError: true },
              () => this.callbackState()
            );
          } else {
            this.setState(
              { dobError: "form-control", dobInputError: false },
              () => this.callbackState()
            );
          }

          if (cMState.cellInputError) {
            this.setState(
              { cellError: "form-control error", cellInputError: true },
              () => this.callbackState()
            );
          } else {
            this.setState(
              { cellError: "form-control", cellInputError: false },
              () => this.callbackState()
            );
          }
        }
      });
      this.setState({ isError });
    } else {
      console.log("Form is invalid!");
    }
  };
  formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach((val) => {
      if (val.length > 0) {
        isValid = false;
      } else {
        isValid = true;
      }
    });

    Object.values(rest).forEach((val) => {
      if (val === null) {
        isValid = false;
      } else {
        isValid = true;
      }
    });

    return isValid;
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  // Handle fields change
  handleChange = (input) => (e) => {
    let isError = { ...this.state.isError };
    let namePattern = /(^[A-Za-z]{3,}[ ]{1}[A-Za-z]+)/;
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    switch (input) {
      case "email":
        isError.email = !pattern.test(this.state.email)
          ? "Email address is invalid"
          : "";
        break;
      case "name":
        if (namePattern.test(this.state.name)) {
          this.setState(
            {
              nameError: "form-control",
              nameInputError: false,
              nameLabel: "Nome completo",
            },
            () => null
          );
        } else {
          this.setState(
            {
              nameError: "form-control error",
              nameInputError: true,
              nameLabel: "Please write full name",
            },
            () => null
          );
        }
        break;
      default:
        break;
    }
    this.setState({ isError, [input]: e.target.value });
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

        <section className="hero page-1-hero">
          <div className="container">
            <form onSubmit={this.continue} noValidate>
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
                    <h1>Vamos começar?</h1>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner">
                    <label htmlFor="" className="form-label">
                      Nome do representante legal
                    </label>
                    <input
                      type="text"
                      className={this.state.legalrepError}
                      id=""
                      aria-describedby=""
                      placeholder="Escreva seu nome"
                      value={this.state.legalrep}
                      onChange={this.handleChange("legalrep")}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4">
                  <div className="form-inner">
                    <label
                      htmlFor=""
                      className={
                        isError.cpf.length > 0
                          ? "form-label error"
                          : "form-label"
                      }
                    >
                      CPF do Representante
                    </label>
                    <NumberFormat
                      format="###.###.###-##"
                      className={
                        isError.cpf.length > 0
                          ? "form-control error"
                          : "form-control"
                      }
                      id=""
                      aria-describedby=""
                      placeholder="000.000.000-00"
                      value={this.state.cpf}
                      onValueChange={(values) => {
                        const { formattedValue, value } = values;
                        isError.cpf = !cpf.isValid(value)
                          ? "Enter Valid CPF"
                          : "";
                        this.setState({ cpf: formattedValue });
                      }}
                    />
                    {isError.cpf.length > 0 ? (
                      <span className="error">{isError.cpf}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner">
                    <label htmlFor="" className="form-label">
                      Data de nascimento
                    </label>
                    <br />
                    <input
                      type="date"
                      className={this.state.dobError}
                      max="2002-12-31"
                      id="reportdate"
                      name="reportdate"
                      value={this.state.dob}
                      onChange={this.handleChange("dob")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner">
                    <label
                      htmlFor=""
                      className={
                        isError.cpnj.length > 0
                          ? "form-label error"
                          : "form-label"
                      }
                    >
                      CNPJ da empresa
                    </label>
                    <NumberFormat
                      format="##.###.###/####-##"
                      className={
                        isError.cpnj.length > 0
                          ? "form-control error"
                          : "form-control"
                      }
                      id=""
                      aria-describedby=""
                      placeholder="00.000.000/0000-00"
                      value={this.state.cpnj}
                      onValueChange={(values) => {
                        const { formattedValue, value } = values;
                        // Fetch name if valid cnpj entered
                        if (cnpj.isValid(value)) this.getNameByCNPJ(value);
                        isError.cpnj = !cnpj.isValid(value)
                          ? "Enter Valid CPNJ"
                          : "";
                        this.setState({ cpnj: formattedValue });
                      }}
                    />
                    {isError.cpnj.length > 0 ? (
                      <span className="error">{isError.cpnj}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner">
                    <label
                      htmlFor=""
                      className={
                        isError.email.length > 0
                          ? "form-label error"
                          : "form-label"
                      }
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      className={
                        isError.email.length > 0
                          ? "form-control error"
                          : "form-control"
                      }
                      id=""
                      aria-describedby=""
                      placeholder="Escreva seu e-mail"
                      value={this.state.email}
                      onChange={this.handleChange("email")}
                    />
                    {isError.email.length > 0 ? (
                      <span className="error">{isError.email}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner form-margin">
                    <label htmlFor="" className="form-label">
                      Telefone
                    </label>

                    <NumberFormat
                      format="+55 (##) #####-####"
                      className={this.state.cellError}
                      id=""
                      aria-describedby=""
                      placeholder="(11) 98000-0000"
                      value={this.state.cell}
                      onValueChange={(values) => {
                        const { formattedValue, value } = values;
                        let cellPattern = new RegExp(
                          /^([0-9]{2}[9]{1}[0-9]{7,8})$/
                        );
                        !cellPattern.test(value)
                          ? this.setState(
                              {
                                cellError: "form-control error",
                                cellInputError: true,
                              },
                              () => null
                            )
                          : this.setState(
                              {
                                cellError: "form-control",
                                cellInputError: false,
                              },
                              () => null
                            );
                        this.setState({ cell: formattedValue });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner form-margin">
                    <label htmlFor="" className="form-label">
                      Razão social
                    </label>
                    <input
                      type="text"
                      className={this.state.nameError}
                      id=""
                      aria-describedby=""
                      placeholder="Escreva o nome da sua empresa"
                      value={this.state.name}
                      onChange={this.handleChange("name")}
                    />
                    {this.state.nameFetchError.length > 0 ? (
                      <span className="error">{this.state.nameFetchError}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="page-1-hero-btn">
                    <button className="btn" onClick={this.back}>
                      VOLTAR
                    </button>
                    <button className="btn" type="submit">
                      PRÓXIMO{" "}
                      <span>
                        <img src="images/double-arrow.svg" alt="" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="cashback page-1-cashback">
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

export default Company;
