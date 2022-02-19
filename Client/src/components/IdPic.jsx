import React, { Component } from "react";
import UploadDocument from "./UploadDocument";
import ImageCapturer from "./ImageCapturer";

class IdPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      image: "",
      src: "",
      capture: true,
    };
  }

  continue = e => {
    e.preventDefault();
    this.props.handleChange("fileIdPic", this.state.image);
    this.props.nextStep();
  };

  toggleCapture = () => {
    this.setState({ show: !this.state.show });
  };

  ipFileHandler = e => {
    var files = e.target.files;
    this.setState({
      image: files ? files[0] : null,
      src: files ? files[0].name : "",
    });
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleCaptureImage = (file, source) => {
    this.setState({
      src: source,
      image: file,
    });
  };

  render() {
    const { values } = this.props;
    const { show } = this.state;
    return (
      <>
        {show ? (
          <ImageCapturer
            handleCaptureImage={this.handleCaptureImage}
            toggle={this.toggleCapture}
          />
        ) : (
          <React.Fragment>
            <header class="page-1-header">
              <div class="container">
                <div class="page-1-brand">
                  <a href="#">
                    <img src="images/brand.png" alt="" />
                  </a>
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
                    <UploadDocument
                      imgSrc={this.state.src}
                      handleCaptureImage={this.handleCaptureImage}
                      toggle={this.toggleCapture}
                    />
                  </div>
                  <div class="col-md-6">
                    <div class="image-holder main-image">
                      <figure>
                        <img
                          src={
                            values.docType == "option1"
                              ? "images/front.png"
                              : "images/identity-pic.png"
                          }
                          alt=""
                        />
                      </figure>
                    </div>
                    <div class="inner-text">
                      <p>
                        Procure um local <span>Iluminado.</span> <br />
                        Não aceitamos documentos <span>escaneados.</span> <br />
                        Retire seu documento do <span>plastico.</span>
                      </p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="page-1-hero-btn">
                      <a href="#" className="btn" onClick={this.back}>
                        VOLTAR
                      </a>
                      <a href="#" className="btn" onClick={this.continue}>
                        PRÓXIMO{" "}
                        <span>
                          <img
                            src="https://bancorappi.com/images/double-arrow.svg"
                            alt=""
                          />
                        </span>
                      </a>
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
        )}
      </>
    );
  }
}
export default IdPic;
