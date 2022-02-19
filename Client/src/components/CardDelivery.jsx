import React, { Component } from "react";
import NumberFormat from 'react-number-format';

class CardDelivery extends Component{
    
  constructor(props) {
        super(props);
        this.state = {
          zip:"",
          zipError:"form-control",
          street:"",
          streetError:"form-control",
          number:"",
          numberError:"form-control",
          complement:"",
          city:"",
          cityError:"form-control",
          stater:"ac",
          staterError:"form-select",
          zipInputError:true,
          streetInputError:true,
          numberInputError:true,
          cityInputError:true,
          staterInputError:true,
        };
    }

    callbackState = () => {
      let cState = this.state;

      if (!cState.zipInputError && !cState.streetInputError && !cState.numberInputError && !cState.cityInputError && !cState.staterInputError) {
        this.props.handleChange("zip", this.state.zip);
        this.props.handleChange("street", this.state.street);
        this.props.handleChange("number", this.state.number);
        this.props.handleChange("complement", this.state.complement);
        this.props.handleChange("city", this.state.city);
        this.props.handleChange("stater", this.state.stater);
        this.props.nextStep();
      }
    }

  continue = e => {
    e.preventDefault();
    let cState = this.state;

    if (cState.zip === '') {
      this.setState({ zipError : "form-control error", zipInputError: true}, () => this.callbackState())
    } else {
      this.setState({ zipError : "form-control", zipInputError: false }, () => this.callbackState())
    }

    if (cState.street === '') {
      this.setState({ streetError: "form-control error", streetInputError: true }, () => this.callbackState())
    } else {
      this.setState({ streetError: "form-control", streetInputError: false }, () => this.callbackState())
    }

    if (cState.number === '') {
      this.setState({ numberError: "form-control error", numberInputError: true }, () => this.callbackState())
    } else {
      this.setState({ numberError: "form-control", numberInputError: false }, () => this.callbackState())
    }
    
    if (cState.city === '') {
      this.setState({ cityError: "form-control error", cityInputError: true }, () => this.callbackState())
    } else {
      this.setState({ cityError: "form-control", cityInputError: false }, () => this.callbackState())
    }

    if (cState.stater === '') {
      this.setState({ staterError: "form-select selectError", staterInputError: true }, () => this.callbackState())
    } else {
      this.setState({ staterError: "form-select", staterInputError: false }, () => this.callbackState())
    }
   
    };
  
  back = e => {
      e.preventDefault();
      this.props.prevStep();
    };
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
    let elVal = e.target.value;

    if (input === 'street' && this.state.street == '') {
      this.setState({ streetError: "form-control error", streetInputError: true }, () =>  null)
    } else {
      this.setState({ streetError: "form-control", streetInputError: false }, () =>  null)
    }

    if (input === 'number' && this.state.number == '') {
      this.setState({ numberError: "form-control error", numberInputError: true }, () =>  null)
    } else if (input === 'number' && this.state.number !== '' ){
      this.setState({ numberError: "form-control", numberInputError: false }, () =>  null)
    }

    if (input === 'city' && this.state.city == '') {
      this.setState({ cityError: "form-control error", cityInputError: true }, () =>   null)
    } else if (input === 'city' && this.state.city !== ''){
      this.setState({ cityError: "form-control", cityInputError: false }, () => null)
    }

  }
  componentDidMount() {
    const { values } = this.props;
    this.setState({zip: values.zip});
    this.setState({street: values.street});
    this.setState({number: values.number});
    this.setState({complement: values.complement});
    this.setState({city: values.city});
    this.setState({stater: values.stater});
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
        
        <section className="hero page-1-hero  page-3-hero page-4-hero">
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
                            <h1>Onde devemos entregar seu cartão?</h1>
                        </div>
                    </div>
                    <div className="col-md-4">
                          
                            <div className="form-inner">
                              <label htmlFor="exampleInputEmail1" className="form-label">CEP</label>
                        <NumberFormat className={this.state.zipError} format="#####-###" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="00000-000" value={this.state.zip} onValueChange={(values) => {
                          const { formattedValue, value } = values;
                          if (value === '') {
                            this.setState({ zipError: "form-control error", zipInputError: true }, () => this.callbackState())
                          } else {
                            this.setState({ zipError: "form-control", zipInputError: false }, () => this.callbackState())
                          }
                          if(value.length === 8){
                            fetch(`https://viacep.com.br/ws/${value}/json/`)
                              .then(it => it.json())
                              .then(js => {
                                this.setState({ street: js.logradouro, stater: js.uf, city: js.localidade})
                              })
                              .catch(err => console.log(err));
                          }
                          this.setState({ zip: formattedValue });
                        }} />
                            </div>
                         
                    </div>     
                    <div className="col-md-5">
                        
                            <div className="form-inner form-margin">
                              <label htmlFor="exampleInputEmail2" className="form-label">Rua/Avenida</label>
                        <input type="text" className={this.state.streetError} id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Escreva o nome da sua rua" value={this.state.street} onChange={this.handleChange('street')} />
                            </div>
                          
                    </div>
                     <div className="col-md-3">
                        
                            <div className="form-inner form-margin">
                              <label htmlFor="exampleInputEmail3" className="form-label">Número</label>
                        <input type="text" className={this.state.numberError} id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Insira numeros" value={this.state.number} onChange={this.handleChange('number')}/>
                            </div>
                         
                    </div>      
                    <div className="col-md-4">
                         
                            <div className="form-inner">
                              <label htmlFor="exampleInputEmail4" className="form-label">Complemento </label>
                              <input type="text" className="form-control" id="exampleInputEmail4" aria-describedby="emailHelp" placeholder="123" value={this.state.complement} onChange={this.handleChange('complement')}/>
                            </div>
                          
                    </div>     
                    <div className="col-md-5">
                       
                            <div className="form-inner form-margin">
                              <label htmlFor="exampleInputEmail5" className="form-label">Cidade </label>
                        <input type="text" className={this.state.cityError} id="exampleInputEmail5" aria-describedby="emailHelp" placeholder="Escreva o nome da sua rua" value={this.state.city} onChange={this.handleChange('city')}/>
                            </div>
                          
                    </div>
                     <div className="col-md-3">
                      <label htmlFor="form-select" className="form-label">Estado</label>
                      <select className={this.state.staterError} aria-label="Default select example" id="form-select" onChange={this.handleChange('stater')} value={this.state.stater}>
                        <option defaultValue value="">Please Choose options</option>
                        <option value="Acre">Acre (AC)</option>
                        <option value="AL"> Alagoas (AL) </option>
                        <option value="AM"> Amazonas (AM) </option>
                        <option value="AP"> Amapá (AP) </option>
                        <option value="BA"> Bahia (BA) </option>
                        <option value="CE"> Ceará (CE) </option>
                        <option value="DF"> Distrito Federal (DF) </option>
                        <option value="ES"> Espírito Santo (ES) </option>
                        <option value="GO"> Goiás (GO) </option>
                        <option value="MA"> Maranhão (MA) </option>
                        <option value="MG"> Minas Gerais (MG) </option>
                        <option value="MS"> Mato Grosso do Sul (MS) </option>
                        <option value="MT"> Mato Grosso (MT) </option>
                        <option value="PA"> Pará (PA) </option>
                        <option value="PB"> Paraíba (PB) </option>
                        <option value="PE"> Pernambuco (PE) </option>
                        <option value="PI"> Piauí (PI) </option>
                        <option value="PR"> Paraná (PR) </option>
                        <option value="RJ"> Rio de Janeiro (RJ) </option>
                        <option value="RN"> Rio Grande do Norte (RN) </option>
                        <option value="RO"> Rondônia (RO) </option>
                        <option value="RR"> Roraima (RR) </option>
                        <option value="RS"> Rio Grande do Sul (RS) </option>
                        <option value="SC"> Santa Catarina (SC) </option>
                        <option value="SE"> Sergipe (SE) </option>
                        <option value="SP"> São Paulo (SP) </option>
                        <option value="TO"> Tocantins (TO) </option>
                          </select>
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

export default CardDelivery;