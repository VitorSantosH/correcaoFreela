import React, { Component } from "react";
import ImageCapture from 'react-image-data-capture';
class ChnBack extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            image: "",
            src: "",
            capture: true
        }
    }

    componentDidMount() {
        console.log(this.props, 'props picjsx');
    }
    continue = e => {
        e.preventDefault();
        this.props.handleChange("fileIdPic", this.state.image);
        this.props.nextStep();
    };

    takeselfie = () => {
        this.setState({ show: true });
    }
    onCapture = (imageData) => {
        // read as webP
        this.setState({ src: imageData.webP });
        // read as file

        let file = new File([imageData.blob], new Date().getTime() + ".png")
        this.setState({ image: file });
        this.setState({ capture: false });

        console.log(imageData, 'imageData')
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    onError = (error) => { console.log(error); }


    render() {
        return (
            <React.Fragment>
                <header class="page-1-header">
                    <div class="container">
                        <div class="page-1-brand">
                            <a href="#"><img src="images/brand.png" alt="" /></a>
                        </div>
                    </div>
                </header>
                <section class="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero page-7-hero page-8-hero page-9-hero page-10-hero  page-12-hero page-13-hero">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="page-1-hero-progress">
                                    <ul>
                                        <li class="active"></li>
                                        <li class="active"></li>
                                        <li></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-top">
                                    <h1>Vamos tirar uma foto da frente do seu RG?</h1>
                                </div>
                            </div>
                            <div class="col-md-6">
                            <div className="file-wrapper">
                                    <label>
                                        <img src="images/file-icon.svg" />
                                        <input type="file" name="file" size="60" accept="image/jpeg,image/png,application/pdf" onChange={this.ipFileHandler} />
                                        {this.state.ipFileName ? <p>Selected File : {this.state.ipFileName}</p> : ''}
                                        <div className="inner-text">
                                            <p><span className="d-md-block d-none">Clique para enviar seu arquivo</span><span className="d-md-none">Toque para enviar seu arquivo</span></p>
                                        </div>
                                    </label>
                                </div>
                                
                            </div>
                            <div class="col-md-6">
                                <div class="image-holder main-image">
                                    <figure><img src="images/chn-front.png" alt="" /></figure>
                                </div>
                                <div class="inner-text">
                                    <p>Procure um local <span>Iluminado.</span> <br />
                                        Não aceitamos documentos <span>escaneados.</span> <br />
                                        Retire seu documento do <span>plastico.</span></p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="page-1-hero-btn">
                                    <a href="#" className="btn" onClick={this.back}>VOLTAR</a>
                                    <a href="#" className="btn" onClick={this.continue}>PRÓXIMO <span><img src="https://bancorappi.com/images/double-arrow.svg" alt="" /></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="cashback page-1-cashback page-6-cashback page-7-cashback page-10-cashback page-12-cashback">
                    <div class="container">
                        <img src="images/dark-bg.svg" alt="" class="cashback-bg" />
                        <img src="images/visa_card.png" alt="" class="visa_card" />
                        <img src="images/4_arrows.svg" alt="" class="arrows_4" />
                    </div>
                </section>

            </React.Fragment>
        );
    }
}
export default ChnBack;
