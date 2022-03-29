const request = require("supertest");

it("should return 200 for google", async () => {
  let response = await request("http://www.google.com").get("/");
  expect(response.statusCode).toEqual(200);
});
