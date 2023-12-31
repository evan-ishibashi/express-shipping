"use strict";
const shipItApi = require("../shipItApi");
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    shipItApi.shipProduct.mockReturnValue(1500);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 1500 });
  });

  test("throws error if empty request body", async function () {

    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("Throws errors on bad data", async function () {

    const resp = await request(app).post("/shipments").send({
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual(
      {
        "error": {
        "message": [
          "instance.zip does not match pattern \"[0-9]{5}(-[0-9]{4})?\"",
            "instance requires property \"productId\""
          ],
          "status": 400
        }
      }
    )
  })
});
