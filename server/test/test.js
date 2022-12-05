const assert = require("chai").assert;
const app = require("../app");
const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const { expect } = require("chai");

chai.use(chaiHttp);

let newStuffId;
describe("Stuff API", () => {
  it("Return all stuffs", (done) => {
    chai
      .request(app)
      .get("/api/stuffs/")
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("message");
        res.body.should.have.property("data");
        res.body.message.should.be.a("string");
        res.body.success.should.be.a("boolean");
        res.body.data.should.be.a("array");
        done();
      });
  });
  it("Create Stuff", (done) => {
    const newStuff = {
      name: "Objet test",
      type: "Type test",
      state: "Etat test",
    };
    chai
      .request(app)
      .post("/api/stuffs/add/")
      .send(newStuff)
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("message");
        res.body.success.should.be.a("boolean");
        res.body.message.should.be.a("string");
        if (res.body.success === false) {
          res.body.message.should.be.a("string");
          res.body.should.not.have.property("data");
          done();
        } else {
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          res.body.data.should.have.property("name");
          res.body.data.should.have.property("type");
          res.body.data.should.have.property("state");
          res.body.data.should.have.property("loaned");
          res.body.data.name.should.be.a("string");
          res.body.data.type.should.be.a("string");
          res.body.data.state.should.be.a("string");
          res.body.data.loaned.should.be.a("boolean");
          newStuffId = res.body.data._id.toString();
          done();
        }
      });
  });
  it("Return specific stuff", (done) => {
    chai
      .request(app)
      .get(`/api/stuffs/${newStuffId}`)
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        res.body.success.should.be.a("boolean");
        if (res.body.success === false) {
          res.body.message.should.be.a("string");
          done();
        } else {
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          done();
        }
      });
  });
});

describe("Loan API", () => {
  it("Return all Loans", (done) => {
    chai
      .request(app)
      .get("/api/loans/")
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("message");
        res.body.should.have.property("data");
        res.body.message.should.be.a("string");
        res.body.success.should.be.a("boolean");
        res.body.data.should.be.a("array");
        done();
      });
  });
  let newLoanId;
  it("Make loan", (done) => {
    const newLoan = {
      takenBy: "Roger",
      stuffTaken: newStuffId,
      nbrOfDays: "0",
    };
    chai
      .request(app)
      .post("/api/loans/add/")
      .send(newLoan)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("message");
        res.body.success.should.be.a("boolean");
        res.body.message.should.be.a("string");
        if (res.body.success === false) {
          res.body.message.should.be.a("string");
          res.body.should.not.have.property("data");
          done();
        } else {
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          res.body.data.should.have.property("takenBy");
          res.body.data.should.have.property("stuffTaken");
          res.body.data.should.have.property("returnDate");
          res.body.data.should.have.property("createdAt");
          res.body.data.takenBy.should.be.a("string");
          res.body.data.returnDate.should.be.a("string");
          res.body.data.createdAt.should.be.a("string");
          res.body.data.stuffTaken.should.be.a("string");
          newLoanId = res.body.data._id.toString();
          done();
        }
      });
  });
  it("Return specific loan", (done) => {
    chai
      .request(app)
      .get(`/api/loans/${newLoanId}`)
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        res.body.success.should.be.a("boolean");
        if (res.body.success === false) {
          res.body.message.should.be.a("string");
          done();
        } else {
          res.body.should.have.property("data");
          res.body.data.should.be("object");
          done();
        }
      });
  });
  it("Delete loan", (done) => {
    chai
      .request(app)
      .delete("/api/loans/delete/")
      .send({ _id: newLoanId })
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        res.body.success.should.be.a("boolean");
        // res.body.message.should.be.oneOf([
        //   "Loan was deleted",
        //   "No loan with this id was found",
        // ]);
        done();
      });
  });
});
describe("Delete created stuff after loan was return", (done) => {
  it("Delete stuff", (done) => {
    chai
      .request(app)
      .delete("/api/stuffs/delete/")
      .send({ _id: newStuffId })
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        res.body.success.should.be.a("boolean");
        // res.body.message.should.be.oneOf([
        //   "Loan was deleted",
        //   "No loan with this id was found",
        // ]);
        done();
      });
  });
});
