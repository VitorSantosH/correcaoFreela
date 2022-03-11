import React, { Component } from "react";
import ImageCapture from "react-image-data-capture";
import UploadDocument from "./UploadDocument";
import { isMobile } from "react-device-detect";
import swal from 'sweetalert'

class Selfie extends Component {
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

    if(this.state.src == ""){
      swal('Erro!',"Por favor envie uma selfie!", "error")
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
        <header className="page-1-header">
          <div className="container">
            <div className="page-1-brand">
              <a href="#">
                <img src="images/brand.png" alt="" />
              </a>
            </div>
          </div>
        </header>

        <section className="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero page-7-hero page-8-hero">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="page-1-hero-progress">
                  <ul>
                    <li className="active"></li>
                    <li className="active"></li>
                    <li></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-top">
                  <h1>Agora vamos precisar de uma foto do seu rosto!</h1>
                </div>
              </div>
              <div className="col-md-12">
                <div className="front-camera">
                  <div className="panel">
                    {this.state.src ? (
                      <></>
                    ) : isMobile ? <img
                      src="images/camera-icon.svg"
                      id="switchFrontBtn"
                      onClick={this.takeselfie}
                    /> : <></>}
                    {isMobile &&
                      this.state.show && (
                        this.state.capture && (
                          <div className="">
                            {" "}
                            <ImageCapture
                              onCapture={this.onCapture}
                              onError={this.onError}
                              width={300}
                              userMediaConfig={{ video: true }}
                            />
                          </div>
                        )
                      )
                    }
                    {!isMobile &&
                      (
                        <UploadDocument
                          imgSrc={this.state.src}
                          handleCaptureImage={this.handleCaptureImage}
                        />

                      )
                    }

                    {/**
                     * 
                     * {this.state.src ? (
                      <div className="">
                        <img src={this.state.src} alt="captured-img" />
                      </div>
                    ) : (
                      <></>
                    )}
                     * 
                     */}
                  </div>
                  <div className="vdo-holder">
                    <video id="cam" autoPlay muted playsInline>
                      Not available
                    </video>

                    <canvas id="canvas" style={{ display: "none" }}></canvas>
                  </div>
                  <div className="inner-text">
                    <p>
                      Para confirmar sua identidade envie uma foto do seu rosto,
                      para evitar falhas no processo retire qualquer tipo de
                      acessório do seu rosto e procure um local bem iluminado.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page-1-hero-btn page-6-hero-btn">
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

        <section className="cashback page-1-cashback page-6-cashback page-7-cashback">
          <div className="container">
            <img src="images/dark-bg.svg" alt="" className="cashback-bg" />
            <img src="images/visa_card.png" alt="" className="visa_card" />
            <img src="images/4_arrows.svg" alt="" className="arrows_4" />
          </div>
        </section>

        <div
          className="modal fade"
          id="Modal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <a data-bs-dismiss="modal" href="#">
                  <img
                    src="http://localhost:5000/api/images/close.svg"
                    alt=""
                  />
                </a>
                <p>
                  Não foi possível validar sua selfie, precisamos que você faça
                  novamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Selfie;
