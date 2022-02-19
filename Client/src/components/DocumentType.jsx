import React, { Component } from "react";
import { Navigate } from "react-router";
const axios = require("axios");
var FormData = require("form-data");
var qs = require("qs");

class DocumentType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctype: "",
    };
  }
  componentDidMount() {
    const { values } = this.props;
    this.setState({ doctype: values.doctype });
  }
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  finish = e => {
    e.preventDefault();
    this.props.handleChange("docType", this.state.doctype);
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
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

        <section class="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero page-7-hero page-8-hero page-9-hero page-10-hero  page-12-hero page-13-hero page-14-hero page-16-hero">
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
                  <h1>Qual documento deseja enviar?</h1>
                </div>
              </div>
              <div id="" class="col-md-6 chn-btn">
                <div class="form-check">
                  <div class="form-input">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="option1"
                      onChange={this.handleChange("doctype")}
                    />
                  </div>
                  <div class="form-label">
                    <label class="form-check-label" for="flexRadioDefault1">
                      <img src="images/CNH-1.png" alt="" />
                    </label>
                  </div>
                </div>
              </div>
              <div id="" class="col-md-6 id-btn">
                <div class="form-check" id="form-label">
                  <div class="form-input">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="option2"
                      onChange={this.handleChange("doctype")}
                    />
                  </div>
                  <div class="form-label">
                    <label class="form-check-label" for="flexRadioDefault2">
                      <img src="images/document_2.png" alt="" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page-1-hero-btn">
                  <a href="#" className="btn" onClick={this.back}>
                    VOLTAR
                  </a>
                  <a href="#" className="btn" onClick={this.finish}>
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
    );
  }
}

export default DocumentType;
