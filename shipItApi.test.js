"use strict";

const fetchMock = require("fetch-mock");
const {SHIPIT_SHIP_URL, SHIPIT_API_KEY} = require("./config");

const {
  shipProduct,
} = require("./shipItApi");


test("shipProduct", async function () {
  fetchMock.post(SHIPIT_SHIP_URL,{ body: {receipt: {shipId: 1001}} });

  const resp = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(resp).toEqual(1001);
});
