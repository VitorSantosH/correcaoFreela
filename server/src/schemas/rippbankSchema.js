const mongoose = require("mongoose");

const rippbankSchema = mongoose.Schema(
  {
    comptype: String,
    name: String,
    cpf: String,
    dob: String,
    cell: String,
    email: String,
    pass: String,
    martials: String,
    spouse: String,
    zip: String,
    street: String,
    number: String,
    complement: String,
    city: String,
    stater: String,
    occupation: String,
    profession: String,
    income: String,
    compname: String,
    crrestriction: String,
    file: String,
    legalrep: String,
    cpfc: String,
    dobc: String,
    cnpj: String,
    cellc: String,
    emailc: String,
    corpname: String,
    scSelectedFile: String,
    ipSelectedFile: String,
    datesubmitted: String,
    isAdm: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

var ripbankdata = mongoose.model("ripbankdata", rippbankSchema);
module.exports = ripbankdata;
