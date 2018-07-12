var GW2API = require("../../../GW2API");

var expect = require("chai").expect;

let functionCall = new GW2API.API.gw2apiError('test');

describe("testing gw2apiError", () => {
    it("should return an object", () => {
        expect(functionCall).to.be.a("object");
    });
    
    it("should have property success", () => {
        expect(functionCall).to.have.property("success");
    });
    
    it("should have property data", () => {
        expect(functionCall).to.have.property("data");
    });
    
    it("should have property message", () => {
        expect(functionCall).to.have.property("message");
    });
    
    it("should should have property success that is a boolean and is false", () => {
        expect(functionCall).to.have.property("success").that.is.a("boolean");
        expect(functionCall.success).to.be.false;
    });
    
    it("should should have property data that is null");
    
    it("should should have property message that is a string and is an error message like 'Error Occurred'");
});