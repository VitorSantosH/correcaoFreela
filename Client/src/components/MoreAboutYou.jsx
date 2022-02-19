import React, { Component } from "react";
import NumberFormat from 'react-number-format';

class MoreAboutYou extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            occupation:"assalarido",
            occupationError:"form-select active form-margin",
            occInputError:true,
            profession:"",
            professionError: "form-control",
            profInputError: true,
            income:"",
            incomeError: "form-control",
            incInputError: true,
            compname:"",
            compnameError: "form-control",
            compInputError: true,
          };
    }

    callbackState = () => {
        let cState = this.state;

        if (!cState.occInputError && !cState.profInputError && !cState.incInputError && !cState.compInputError) {
            this.props.handleChange("occupation", this.state.occupation);
            this.props.handleChange("profession", this.state.profession);
            this.props.handleChange("income", this.state.income);
            this.props.handleChange("compname", this.state.compname);
            this.props.nextStep();
        }
    }

    continue = e => {
        e.preventDefault();
        let cMState = this.state;

        if (cMState.occupation === '') {
            this.setState({ occupationError: "form-select active form-margin selectError", occInputError: true }, () => this.callbackState())
        } else {
            this.setState({ occupationError: "form-select active form-margin", occInputError: false }, () => this.callbackState())
        }

        if (cMState.profession === '') {
            this.setState({ professionError: "form-control error", profInputError: true }, () => this.callbackState())
        } else {
            this.setState({ professionError: "form-control", profInputError: false }, () => this.callbackState())
        }

        if (cMState.income === '') {
            this.setState({ incomeError: "form-control error", incInputError: true }, () => this.callbackState())
        } else {
            this.setState({ incomeError: "form-control", incInputError: false }, () => this.callbackState())
        }

        if (cMState.compname === '') {
            this.setState({ compnameError: "form-control error", compInputError: true }, () => this.callbackState())
        } else {
            this.setState({ compnameError: "form-control", compInputError: false }, () => this.callbackState())
        }

      };
    
    back = e => {
        e.preventDefault();
        this.props.prevStep();
      };

    numberFormat = value => {
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value);
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });

    }
    componentDidMount() {
        const { values } = this.props;
        this.setState({occupation: values.occupation});
        this.setState({profession: values.profession});
        this.setState({income: values.income});
        this.setState({compname: values.compname});
      }
    render(){
        return(
        <React.Fragment> 
            <header className="page-1-header">
            <div className="container">
                <div className="page-1-brand">
                    <a href="#"><img src="images/brand.png" alt=""/></a>
                </div>
            </div>
            </header>
            
            <section className="hero page-1-hero  page-3-hero page-4-hero page-5-hero">
            <div className="container">
                <form action="">
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
                            <h1>Me fale mais sobre você</h1>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="form-select" className="form-label">Selecione uma das opções</label>
                            <select className={this.state.occupationError} aria-label="Default select example" id="form-select"   onChange={this.handleChange('occupation')}>
                            <option defaultValue value="">Please choose options</option>
                            <option value="assalarido">Assalariado</option>
                            <option value="1">Aposentado pensionista</option>
                            <option value="2">Autônomo</option>
                            <option value="3">Funcionário público concursado</option>
                            <option value="4">Funcionário público contratado</option>
                            <option value="5">Sócio-proprietário</option>
                            <option value="6">Micro-empresário</option>
                            <option value="7">Outros</option>
                        </select>
                    </div>     
                    <div className="col-md-6">
                        
                            <div className="form-inner">
                            <label htmlFor="exampleInputEmail1" className="form-label">Escreva sua profissão</label>
                            <input type="text" className={this.state.professionError} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Escreva sua profissão"  value={this.state.profession} onChange={this.handleChange('profession')}/>
                            </div>
                        
                    </div>
                    <div className="col-md-6">
                        
                            <div className="form-inner form-margin">
                            <label htmlFor="exampleInputEmail3" className="form-label">Informe sua renda</label>
                                    <NumberFormat prefix="R$" suffix=".00" thousandSeparator={true} className={this.state.incomeError} id="exampleInputEmail3" aria-describedby="" placeholder="R$ 0.00" value={this.state.income} onValueChange={(values) => {
                                    const { formattedValue, value } = values;
                                    this.setState({ income: formattedValue });
                                }} />
                            </div>
                        
                    </div>      
                    <div className="col-md-6">
                        
                            <div className="form-inner form-margin">
                            <label htmlFor="exampleInputEmail4" className="form-label">Qual o nome da sua empresa?</label>
                            <input type="text" className={this.state.compnameError} id="exampleInputEmail4" aria-describedby="emailHelp" placeholder="Nome da sua empresa"  value={this.state.compname} onChange={this.handleChange('compname')}/>
                            </div>
                        
                    </div>     
                    <div className="col-md-12">
                        <div className="page-1-hero-btn">
                        <button className="btn" onClick={this.back}>VOLTAR</button>
                        <button className="btn" onClick={this.continue}>PRÓXIMO <span><img src="images/double-arrow.svg" alt=""/></span></button>
                    </div>
                    </div>
                </div>
            </form>
            </div>
            </section>

            <section className="cashback page-1-cashback">
            <div className="container">
                <img src="images/dark-bg.svg" alt="" className="cashback-bg"/>
            <img src="images/visa_card.png" alt="" className="visa_card"/>
            <img src="images/4_arrows.svg" alt="" className="arrows_4"/>
            </div>
            </section>
            </React.Fragment>
        );
    }
}

export default MoreAboutYou;