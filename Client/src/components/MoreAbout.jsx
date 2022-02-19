import React, { Component } from "react";

class MoreAbout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            martials: "",
            spouse: "",
            inputAllow: true,
            spouseFormError: 'form-control',
            spouseInputError: true,
            isError: { spouse: "" }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    callbackState = () => {
        let cState = this.state;
        if (this.state.martials == 'married' && !cState.spouseInputError ) {
            this.props.handleChange("martials", this.state.martials);
            this.props.handleChange("spouse", this.state.spouse);
            this.props.nextStep();

        } else if (this.state.martials !== 'married'){
            this.props.handleChange("martials", this.state.martials);
            this.props.handleChange("spouse", this.state.spouse);
            this.props.nextStep();
        }
    }
    continue = e => {
        e.preventDefault();
        let spousePattern = /(^[A-Za-z]{3,}[ ]{1}[A-Za-z]+)/;

        if (this.state.martials == 'married') {
            if (!spousePattern.test(this.state.spouse)){
                this.setState({ spouseFormError: "form-control error", spouseInputError: true }, () => this.callbackState())
            } else if (spousePattern.test(this.state.spouse)){
                this.setState({ spouseFormError: "form-control", spouseInputError: false }, () => this.callbackState())
            }
        } else if (this.state.martials !== 'married'){
            this.setState({ spouseFormError: "form-control", spouseInputError: false }, () => this.callbackState())
        }
    };
    componentDidMount() {
        const { values } = this.props;
        this.setState({ martials: values.martials });
        this.setState({ spouse: values.spouse});
        if(values.martials === 'married'){
            this.setState({inputAllow: false})
        } 
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    handleChange = input => e => {
        let spousePattern = /(^[A-Za-z]{3,}[ ]{1}[A-Za-z]+)/;

        switch (input) {
            case "martials":
                e.target.value !== 'married' ? this.setState({ inputAllow: true, spouse: "", spouseFormError: 'form-control' }, () => null) : this.setState({ inputAllow: false }, () => null)
                break;
            case "spouse":
                if (this.state.martials == 'married') {
                    if (spousePattern.test(this.state.spouse)) {
                        this.setState({ spouseFormError: "form-control", spouseInputError: false }, () => null)
                    } else {
                        this.setState({ spouseFormError: "form-control error", spouseInputError: true }, () => null)
                    }
                }
                break;
            default:
                break;
        }       
        
        this.setState({ [input]: e.target.value });
    }

    render() {
        const { isError } = this.state;
        return (
            <React.Fragment>
                <header className="page-1-header">
                    <div className="container">
                        <div className="page-1-brand">
                            <a href="#"><img src="images/brand.png" alt="" /></a>
                        </div>
                    </div>
                </header>

                <section className="hero page-1-hero  page-3-hero">
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
                                    <label htmlFor="form-select" className="form-label">Selecione seu estado civil</label>
                                    <select className="form-select form-margin" aria-label="Default select example" id="form-select" value={this.state.martials} onChange={this.handleChange('martials')}>
                                        <option defaultValue value="single">Solteiro(a)</option>
                                        <option value="widower">Viúvo(a)</option>
                                        <option value="married">Casado(a)</option>
                                        <option value="divorced">Divorciado(a)</option>
                                        <option value="separated">Separado(a)</option>
                                    </select>
                                </div>
                                <div className="col-md-6">

                                    <div className="form-inner form-margin">
                                        <label htmlFor="exampleInputEmail1" className='form-label'>Nome do cônjuge</label>
                                        <input type="text" className={this.state.spouseFormError} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Escreva o nome do seu cônjuge" disabled={this.state.inputAllow} value={this.state.spouse} onChange={this.handleChange('spouse')} />
                                    </div>

                                </div>
                                <div className="col-md-12">
                                    <div className="page-1-hero-btn">
                                        <button className="btn" onClick={this.back}>VOLTAR</button>
                                        <button className="btn" onClick={this.continue}>PRÓXIMO <span><img src="images/double-arrow.svg" alt="" /></span></button>
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

export default MoreAbout;