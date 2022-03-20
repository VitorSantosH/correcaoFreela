import React, { Component } from "react";
import api from '../services/api.jsx'
const axios = require("axios");

var FormData = require("form-data");
var qs = require("qs");




class Success extends Component {
  componentDidMount() {

    const { values } = this.props;
    console.log(values, "success page values");


    var data = new FormData();
    data.append("comptype", values.comptype);
    data.append("name", values.name);
    data.append("cnpj", values.cpnj);
    data.append("cpf", values.cpf);
    data.append("dob", values.dob);
    data.append("cell", values.cell);
    data.append("email", values.email);
    data.append("pass", values.pass);
    data.append("martials", values.martials);
    data.append("spouse", values.spouse);
    data.append("zip", values.zip);
    data.append("street", values.street);
    data.append("number", values.number);
    data.append("complement", values.complement);
    data.append("city", values.city);
    data.append("stater", values.stater);
    data.append("occupation", values.occupation);
    data.append("profession", values.profession);
    data.append("income", values.income);
    data.append("compname", values.compname);
    data.append("crrestriction", values.crrestriction);
    data.append("files", values.file);
    //data.append("fileIdPic", values.fileIdPic);
    //data.append("filePicBackSide", values.filePicBackSide);
    data.append('files',  values.fileIdPic);
    data.append('files', values.filePicBackSide);
    //data.append("scSelectedFile", values.scSelectedFile[0]);
    //data.append("ipSelectedFile", values.ipSelectedFile[0]);
    data.append("files", values.scSelectedFile[0]);
    data.append("files", values.ipSelectedFile[0]);




    var config = {
      method: "post",
      url: "http://localhost:5000/api/ripbankform",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    console.log(api.baseURL)

    axios(config)
      .then(function (response) {
        
        console.log(response)
      })

      .catch(function (error) {
        console.log(error);
      });
  }

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
        <section className="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero page-7-hero page-8-hero page-9-hero page-10-hero  page-11-hero">
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
                  <h1>Sua solicitação foi enviada com sucesso</h1>
                </div>
              </div>
              <div className="col-md-12">
                <div className="viza-div">
                  <div className="image-holder">
                    <figure>
                      <img src="images/visa-card-2.png" alt="" />
                    </figure>
                  </div>
                  <p>
                  Em breve você receberá um e-mail com o resultado da nossa análise. Mas não se preoucupe esse processo é bem rápido ,tá?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="cashback page-1-cashback page-6-cashback page-7-cashback page-10-cashback">
          <div className="container">
            <img src="images/dark-bg.svg" alt="" className="cashback-bg" />
            <img src="images/girl.png" alt="" className="visa_card man_png" />
            <img src="images/4_arrows.svg" alt="" className="arrows_4" />
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Success;



/*
import React, { Component } from "react";
import api from "../services/api";
const axios = require("axios");
var FormData = require("form-data");
var qs = require("qs");



const Success = (props) => {

  const { values } = props;
  const data = values 
  const headers = {
    "Content-Type": "multipart/form-data",
  }

  api.post('/api/ripbankform', data , {headers : headers }  )         
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })

 /* componentDidMount() {
    const { values } = this.props;
    console.log(values, "success page values");
    var data = new FormData();
    dada.append('data', values )
    var config = {
      method: "post",
      url: "/api/checkemail",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    };

    console.log(values.file)

    axios(config)
      .then(function (response) {
        //if(response.data.lengthdata < 1){

        var data = new FormData();
        data.append("comptype", values.comptype);
        data.append("name", values.name);
        data.append("cnpj", values.cpnj);
        data.append("cpf", values.cpf);
        data.append("dob", values.dob);
        data.append("cell", values.cell);
        data.append("email", values.email);
        data.append("pass", values.pass);
        data.append("martials", values.martials);
        data.append("spouse", values.spouse);
        data.append("zip", values.zip);
        data.append("street", values.street);
        data.append("number", values.number);
        data.append("complement", values.complement);
        data.append("city", values.city);
        data.append("stater", values.stater);
        data.append("occupation", values.occupation);
        data.append("profession", values.profession);
        data.append("income", values.income);
        data.append("compname", values.compname);
        data.append("crrestriction", values.crrestriction);
        data.append("file", values.file);
        data.append("fileIdPic", values.fileIdPic);
        data.append("filePicBackSide", values.filePicBackSide);
        data.append("scSelectedFile", values.scSelectedFile[0]);
        data.append("ipSelectedFile", values.ipSelectedFile[0]);

        if (values.id !== "") {
          data.append("id", values.id);
        }
        var config = {
          method: "post",
          url: "/api/ripbankform",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(response, "bottom res");
          })
          .catch(function (error) {
            console.log(error);
          });
        //}
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  */
/*

 
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
     <section className="hero page-1-hero  page-3-hero page-4-hero page-5-hero page-6-hero page-7-hero page-8-hero page-9-hero page-10-hero  page-11-hero">
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
               <h1>Sua solicitação foi enviada com sucesso</h1>
             </div>
           </div>
           <div className="col-md-12">
             <div className="viza-div">
               <div className="image-holder">
                 <figure>
                   <img src="images/visa-card-2.png" alt="" />
                 </figure>
               </div>
               <p>
                 Em breve você vai receber um e-mail com o resultado da nossa
                 análise.
               </p>
             </div>
           </div>
         </div>
       </div>
     </section>
     <section className="cashback page-1-cashback page-6-cashback page-7-cashback page-10-cashback">
       <div className="container">
         <img src="images/dark-bg.svg" alt="" className="cashback-bg" />
         <img src="images/girl.png" alt="" className="visa_card man_png" />
         <img src="images/4_arrows.svg" alt="" className="arrows_4" />
       </div>
     </section>
   </React.Fragment>
 );

}
export default Success;



*/