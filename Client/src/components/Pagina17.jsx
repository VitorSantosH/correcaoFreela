import React, { Component } from "react";
import ImageCapture from "react-image-data-capture";
import UploadDocument from "./UploadDocument";
import { isMobile } from "react-device-detect";
import swal from 'sweetalert'


class Pag17 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            image: "",
            src: "",
            capture: true,
        };
    }
    continue = (e) => {
        e.preventDefault();

        if (this.state.src == "") {
            swal('Erro!', "Por favor envie uma selfie!", "error")
            return
        }
        this.props.handleChange("file", this.state.image);
        this.props.nextStep();
    };

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    };
    takeselfie = () => {
        this.setState({ show: true });
    };
    onCapture = (imageData) => {
        // read as webP
        this.setState({ src: imageData.webP });

        // read as file
        let file = new File([imageData.blob], new Date().getTime() + ".png");
        this.setState({ image: file });
        this.setState({ capture: false });
    };
    onError = (error) => {
        console.log(error);
    };
    handleCaptureImage = (file, source) => {
        this.setState({
            src: source,
            image: file,
        });
    };

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

                <section class="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero page-7-hero page-8-hero page-9-hero page-10-hero  page-11-hero page-12-hero page-17-hero">
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
                        </div>
                        <div class="col-md-12">
                            <div class="form-top">
                                <h1>Vamos tirar uma foto sua com seu documento?</h1>
                                <p>Procure um local <span>Iluminado!</span>
                                    Retire os <span>acessórios</span> do rosto e cabeça!
                                    Segure seu <span>documento</span> e de um <span>click!</span></p>
                            </div>
                        </div>
                        <div class="document-tittle">
                            <h2>Enviar imagens</h2>
                        </div>
                        <div className="flexDiv" style={{ 'display': 'flex', 'flexWrap': 'wrap' }}>
                            <div class="col-md-6">

                                <UploadDocument
                                    imgSrc={this.state.src}
                                    handleCaptureImage={this.handleCaptureImage}
                                />
                            </div>

                            <div class="col-md-6"  style={{ 'paddingLeft': "5px" }} >
                                <div class="image-holder main-image" style={{ 'marginTop': "0px" }}>
                                    <figure><img src="images/man_4.png" alt="" style={{ 'minHeight': '350px', 'width': "auto" }} /></figure>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="page-1-hero-btn">
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

export default Pag17;