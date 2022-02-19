import React, { Component } from "react";
import Aboutyou from "./AboutYou";
import Start from "./Start";
import CardDelivery from "./CardDelivery";
import Company from "./Company";
import CreditRestriction from "./CreditRestriction";
import DocumentType from "./DocumentType";
import MoreAbout from "./MoreAbout";
import MoreAboutYou from "./MoreAboutYou";
import Selfie from "./Selfie";
import IdPic from "./IdPic";
import IdPicBackSide from "./IdPicBackSide";
import SocialContract from "./SocialContract";
import IncomeProof from "./IncomeProof";
import Success from "./Success";
import CompanyNegative from "./CompanyNegative";
import CreatePass from "./CreatePass";
import ChnBack from "./ChnBack";
import ChnFront from "./ChnFront";
import { withRouter } from "react-router-dom";
const axios = require("axios");

export class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      comptype: "",
      name: "",
      cpf: "",
      dob: "",
      cell: "",
      email: "",
      pass: "",
      martials: "",
      spouse: "",
      zip: "",
      street: "",
      number: "",
      complement: "",
      city: "",
      stater: "",
      occupation: "",
      profession: "",
      income: "",
      compname: "",
      crrestriction: "",
      file: "",
      fileIdPic: "",
      filePicBackSide: "",
      src: "",
      legalrep: "",
      cpfc: "",
      dobc: "",
      cpnj: "",
      cellc: "",
      emailc: "",
      corpname: "",
      id: "",
      scSelectedFile: "",
      ipSelectedFile: "",
      docType: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  // Proceed to next step
  nextStep = (ans) => {
    const { step } = this.state;
    this.forceUpdate();

    setTimeout(() => {
      if (ans) {
        this.setState({
          step: ans,
        });
      } else {
        this.setState({
          step: step + 1,
        });
      }
    }, 500);
  };

  componentDidMount() {
    var currcomp = this;
    var id = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    if (id !== "card-app" && id !== "") {
      var config = {
        method: "get",
        url: "http://localhost:5000/api/rippbank/" + id,
      };

      axios(config)
        .then(function (response) {
          currcomp.setState({ comptype: response.data[0].comptype });
          currcomp.setState({ name: response.data[0].name });
          currcomp.setState({ cpf: response.data[0].cpf });
          currcomp.setState({ dob: response.data[0].dob });
          currcomp.setState({ cell: response.data[0].cell });
          currcomp.setState({ email: response.data[0].email });
          currcomp.setState({ pass: response.data[0].pass });
          currcomp.setState({ martials: response.data[0].martials });
          currcomp.setState({ spouse: response.data[0].spouse });
          currcomp.setState({ zip: response.data[0].zip });
          currcomp.setState({ street: response.data[0].street });
          currcomp.setState({ number: response.data[0].number });
          currcomp.setState({ complement: response.data[0].complement });
          currcomp.setState({ city: response.data[0].city });
          currcomp.setState({ stater: response.data[0].stater });
          currcomp.setState({ occupation: response.data[0].occupation });
          currcomp.setState({ profession: response.data[0].profession });
          currcomp.setState({ income: response.data[0].income });
          currcomp.setState({ compname: response.data[0].compname });
          currcomp.setState({ crrestriction: response.data[0].crrestriction });
          currcomp.setState({ file: response.data[0].file });
          currcomp.setState({ src: response.data[0].file });
          currcomp.setState({ legalrep: response.data[0].legalrep });
          currcomp.setState({ cpnj: response.data[0].cpnj });
          currcomp.setState({ corpname: response.data[0].corpname });
          currcomp.setState({ id: response.data[0]._id });
          currcomp.setState({
            scSelectedFile: response.data[0].scSelectedFile,
          });
          currcomp.setState({
            ipSelectedFile: response.data[0].ipSelectedFile,
          });
          currcomp.setState({ fileIdPic: response.data[0].fileIdPic });
          currcomp.setState({
            filePicBackSide: response.data[0].filePicBackSide,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  // Go back to prev step
  prevStep = (num) => {
    const { step } = this.state;

    if (num) {
      this.setState({
        step: num,
      });
    } else {
      this.setState({
        step: step - 1,
      });
    }
  };

  // Handle fields change
  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    const { step } = this.state;
    const {
      comptype,
      name,
      cpf,
      dob,
      cell,
      email,
      pass,
      martials,
      spouse,
      zip,
      street,
      number,
      complement,
      city,
      stater,
      occupation,
      profession,
      income,
      compname,
      crrestriction,
      file,
      legalrep,
      cpfc,
      dobc,
      cpnj,
      cellc,
      emailc,
      corpname,
      id,
      scSelectedFile,
      ipSelectedFile,
      fileIdPic,
      filePicBackSide,
      docType,
    } = { ...this.state };
    const values = {
      comptype,
      name,
      cpf,
      dob,
      cell,
      email,
      pass,
      martials,
      spouse,
      zip,
      street,
      number,
      complement,
      city,
      stater,
      occupation,
      profession,
      income,
      compname,
      crrestriction,
      file,
      legalrep,
      cpfc,
      dobc,
      cpnj,
      cellc,
      emailc,
      corpname,
      id,
      scSelectedFile,
      ipSelectedFile,
      fileIdPic,
      filePicBackSide,
      docType,
    };
    switch (step) {
      case 1:
        return (
          <Aboutyou
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        if (this.state.comptype == "yes") {
          return (
            <Company
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          );
        } else {
          return (
            <Start
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          );
        }

      case 3:
        return (
          <CreatePass
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <MoreAbout
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 5:
        return (
          <CardDelivery
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );

      case 6:
        return (
          <MoreAboutYou
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 7:
        if (this.state.comptype == "yes") {
          return (
            <CompanyNegative
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          );
        } else {
          return (
            <CreditRestriction
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          );
        }
      case 8:
        return (
          <Selfie
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 9:
        return (
          <DocumentType
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 10:
        return (
          <IdPic
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 11:
        return (
          <IdPicBackSide
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 12:
        return (
          <IncomeProof
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 13:
        if (this.state.comptype == "yes") {
          return (
            <SocialContract
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          );
        } else {
          return (
            <Success
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          );
        }
      case 14:
        return (
          <Success
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 15:
        return (
          <CompanyNegative
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

export default UserForm;
