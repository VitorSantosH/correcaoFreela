import React, { Component } from "react";
import { cpf } from "cpf-cnpj-validator";
import NumberFormat from "react-number-format";
import api from '../services/api.jsx';
import swal from 'sweetalert';


var emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameLabel: "Nome completo",
      cpf: "",
      cpfLabel: "CPF",
      dob: "",
      cell: "",
      email: "",
      cpfValid: false,
      nameError: "form-control",
      cpfError: "form-control",
      cellError: "form-control",
      emailError: "form-control",
      dobError: "form-control",
      nameInputError: true,
      cpfInputError: true,
      dobInputError: true,
      cellInputError: true,
      emailInputError: true,
      isError: {
        cpnj: "",
        email: "",
        cpf: "",
      },
    };
  }
  componentDidMount() {
    const { values } = this.props;
    this.setState({ name: values.name });
    this.setState({ cpf: values.cpf });
    this.setState({ dob: values.dob });
    this.setState({ cell: values.cell });
    this.setState({ email: values.email });


  }

  componentDidUpdate() {

  }

  testMail(e) {



    api.post('/verifyIdentity', {
      email: this.state.email,
      cpf: this.state.cpf
    })
      .then(res => {

        if (res.data.respEmail) {
          swal('Erro!', "Este e-mail já esta em uso!", "error")
        }

        if (res.data.respCpf) {
          swal('Erro!', "Este cpf já esta em uso!", "error")
        }

        if (!res.data.respCpf && !res.data.respEmail) {
          this.continue(e)
        }

      })
      .catch(err => {
        console.log(err)
      })

  }

  setEmail() {

    var emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


    if (emailRegex.test(this.state.email)) {
      console.log('aqui')
      this.setState(
        { emailError: "form-control", emailInputError: false }
      )
    } else {
      console.log('teste')
      this.setState(
        { emailError: "form-control error", emailInputError: true },

      );

    }
  }



  callbackState = () => {
    let cState = this.state;
    if (
      !cState.nameInputError &&
      !cState.dobInputError &&
      !cState.cellInputError &&
      !cState.emailInputError &&
      !cState.cpfInputError
    ) {
      this.props.handleChange("cpf", this.state.cpf);
      this.props.handleChange("dob", this.state.dob);
      this.props.handleChange("cell", this.state.cell);
      this.props.handleChange("cpnj", this.state.cpnj);
      this.props.handleChange("email", this.state.email);
      this.props.handleChange("corpname", this.state.corpname);
      this.props.handleChange("legalrep", this.state.legalrep);
      this.props.handleChange("name", this.state.name);
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
  continue = async (e) => {
    e.preventDefault();

    console.log(this.state)

    const err = await api.post('http://localhost:5000/verifyIdentity', {
      email: this.state.email,
      cpf: this.state.cpf
    })
      .then(res => {



        if (res.data.respEmail) {
          swal('Erro!', "Este e-mail já esta em uso!", "error")
          return true
        }

        if (res.data.respCpf) {
          swal('Erro!', "Este cpf já esta em uso!", "error")
          return true
        }

        /**
         * if(!res.data.respCpf && !res.data.respEmail){
          this.continue(e)
        }
         */

      })
      .catch(err => {
        console.log(err)
      })

    if (err) return

    let cMState = this.state;
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (cMState.name === "") {
      this.setState(
        { nameError: "form-control error", nameInputError: true },
        () => this.callbackState()
      );
    } else {
      this.setState({ nameError: "form-control", nameInputError: false }, () =>
        this.callbackState()
      );
    }

    if (!cMState.cpfValid) {
      this.setState(
        { cpfError: "form-control error", cpfInputError: true },
        () => this.callbackState()
      );
    } else {
      this.setState({ cpfError: "form-control", cpfInputError: false }, () =>
        this.callbackState()
      );
    }

    if (cMState.dob === "") {
      this.setState(
        { dobError: "form-control error", dobInputError: true },
        () => this.callbackState()
      );
    } else {
      this.setState({ dobError: "form-control", dobInputError: false }, () =>
        this.callbackState()
      );
    }

    if (cMState.cellInputError) {
      this.setState(
        { cellError: "form-control error", cellInputError: true },
        () => this.callbackState()
      );
    } else {
      this.setState({ cellError: "form-control", cellInputError: false }, () =>
        this.callbackState()
      );
    }

    if (emailRegex.test(this.state.email)) {
      this.setState(
        { emailError: "form-control", emailInputError: false },
        () => this.callbackState()
      );
    } else {
      this.setState(
        { emailError: "form-control error", emailInputError: true },
        () => this.callbackState()
      );
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  // Handle fields change
  handleChange = (input) => (e) => {
    console.log("www")
    let isError = { ...this.state.isError };
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let namePattern = /(^[A-Za-z]{3,}[ ]{1}[A-Za-z]+)/;
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    switch (input) {
      case "email":
        console.log(this.state.email)
        console.log(emailRegex.test(this.state.email))

        if (emailRegex.test(this.state.email)) {
          console.log('aqui')
          this.setState(
            { emailError: "form-control", emailInputError: false },
            () => null
          )
        } else {
          this.setState(
            { emailError: "form-control error", emailInputError: true },
            () => null
          );
        }
        isError.email = !emailRegex.test(this.state.email)
          ? "Endereço de e-mail inválido!"
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
              nameLabel: "Por favor digite o nome completo",
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
            <form>
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
                      {this.state.nameLabel}
                    </label>
                    <input
                      type="text"
                      className={this.state.nameError}
                      id=""
                      aria-describedby=""
                      placeholder="Escreva seu nome completo"
                      value={this.state.name}
                      onChange={this.handleChange("name")}
                      required
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
                      {this.state.cpfLabel}
                    </label>
                    <NumberFormat
                      format="###.###.###-##"
                      className={this.state.cpfError}
                      id=""
                      aria-describedby=""
                      placeholder="000.000.000-00"
                      value={this.state.cpf}
                      onValueChange={(values) => {
                        const { formattedValue, value } = values;
                        !cpf.isValid(value)
                          ? this.setState({
                            cpfValid: false,
                            cpfLabel: "Por favor digite um CPF válido",
                          })
                          : this.setState({ cpfValid: true, cpfLabel: "CPF" });
                        isError.cpf = !cpf.isValid(value)
                          ? "Digite um cpf válido"
                          : "";
                        this.setState({ cpf: formattedValue });
                      }}
                    />
                    {isError.cpf.length > 0 ? (
                      <span className="error">{isError.cpfc}</span>
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
                      min="1935-01-01"
                      max="2003-12-31"
                      className={this.state.dobError}
                      id="reportdate"
                      name="reportdate"
                      value={this.state.dob}
                      onChange={this.handleChange("dob")}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner form-margin">
                    <label htmlFor="" className="form-label">
                      celular
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
                    <label htmlFor="exampleInputEmail5" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className={this.state.emailError}
                      id="exampleInputEmail5"
                      aria-describedby="emailHelp"
                      placeholder="Escreva seu e-mail"
                      value={this.state.email}
                      onChange={e => {
                        this.setState({ email: e.target.value })
                        this.setEmail();
                        let quantidade = 0
                        if (!emailRegex.test(this.setState.email)) {
                          let interval = setInterval(() => {
                            this.setEmail()
                            quantidade++

                            if (quantidade == 2) {
                              clearInterval(interval);
                            }

                          }, 2000)
                        }
                      }}
                      required
                    />

                    {this.state.emailInputError ? (
                      <span className="error">{isError.email}</span>
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
                    <button className="btn" onClick={e => this.continue(e)}>
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

export default Start;
