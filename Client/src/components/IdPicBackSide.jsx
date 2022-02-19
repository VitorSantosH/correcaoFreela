import React, { Component } from "react";
import UploadDocument from "./UploadDocument";
import ImageCapturer from "./ImageCapturer";

class IdPicBackside extends Component {
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
    this.props.handleChange("filePicBackSide", this.state.image);
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
            <header className="page-1-header">
              <div className="container">
                <div className="page-1-brand">
                  <a href="#">
                    <img src="images/brand.png" alt="" />
                  </a>
                </div>
              </div>
            </header>
            <section className="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero page-7-hero page-8-hero page-9-hero page-10-hero  page-12-hero page-13-hero page-14-hero">
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
                      <h1>Agora vamos tirar uma foto do verso</h1>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <UploadDocument
                      imgSrc={this.state.src}
                      handleCaptureImage={this.handleCaptureImage}
                      toggle={this.toggleCapture}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="image-holder main-image">
                      <figure>
                        <img
                          src={
                            values.docType == "option1"
                              ? "images/back.png"
                              : "images/identity-back.png"
                          }
                          alt=""
                        />
                      </figure>
                    </div>
                    <div className="inner-text">
                      <p>
                        Procure um local <span>Iluminado!</span>
                        <span>Não aceitamos</span> documentos{" "}
                        <span>escaneados.</span>
                        Selecione a <span>frente</span> do seu{" "}
                        <span>documento!</span>
                        Retire seu documento do <span>plastico.</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="page-1-hero-btn">
                      <a href="#" className="btn" onClick={this.back}>
                        VOLTAR
                      </a>
                      <a href="#" className="btn" onClick={this.continue}>
                        PRÓXIMO{" "}
                        <span>
                          <img src="images/double-arrow.svg" alt="" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="cashback page-1-cashback page-6-cashback page-7-cashback page-10-cashback page-12-cashback">
              <div className="container">
                <img src="images/dark-bg.svg" alt="" className="cashback-bg" />
                <img src="images/visa_card.png" alt="" className="visa_card" />
                <img src="images/4_arrows.svg" alt="" className="arrows_4" />
              </div>
            </section>
          </React.Fragment>
        )}
      </>
    );
  }
}
export default IdPicBackside;
