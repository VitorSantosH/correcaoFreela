import React, { Component } from "react";

class IncomeProof extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipSelectedFile: "",
      isIPFilePicked: false,
      ipFileName: "",
    };
  }
  continue = e => {
    e.preventDefault();
    this.props.handleChange("ipSelectedFile", this.state.ipSelectedFile);
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  ipFileHandler = e => {
    var files = e.target.files;
    this.setState({
      ipSelectedFile: files,
      isIPFilePicked: true,
      ipFileName: files ? files[0].name : "",
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
        <section className="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero page-7-hero page-8-hero page-9-hero">
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
                  <h1>Comprovante de renda (opcional)</h1>
                  <p>Envie um arquivo</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="file-wrapper">
                  <label>
                    <img src="images/file-icon.svg" />
                    <input
                      type="file"
                      name="file"
                      size="60"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={this.ipFileHandler}
                    />
                    {this.state.ipFileName ? (
                      <p>Selected File : {this.state.ipFileName}</p>
                    ) : (
                      ""
                    )}
                    <div className="inner-text">
                      <p>
                        <span className="d-md-block d-none">
                          Clique para enviar seu arquivo
                        </span>
                        <span className="d-md-none">
                          Toque para enviar seu arquivo
                        </span>
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="col-md-12">
                <div className="page-1-hero-btn page-6-hero-btn">
                  <a href="#" className="btn" onClick={this.back}>
                    VOLTAR
                  </a>
                  <a
                    id="com-page"
                    href="#"
                    className="btn"
                    onClick={this.continue}
                  >
                    PRÓXIMO{" "}
                    <span>
                      <img src="images/double-arrow.svg" alt="" />
                    </span>
                  </a>
                </div>
              </div>
              <div className="pra">
                <p>*Isso acelera o processo de aprovação</p>
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
      </React.Fragment>
    );
  }
}
export default IncomeProof;
