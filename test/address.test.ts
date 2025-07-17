import supertest from "supertest";
import { web } from "../src/config/web";
import { logger } from "../src/config/logging";
import { AddressTest, ContactTest, UserTest } from "./test.util";

describe("POST /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await ContactTest.createContact();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteContact();
    await UserTest.deleteUser();
  });

  it("should can create address", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "test street",
        city: "test city",
        province: "test province",
        country: "test country",
        postal_code: "1212",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.street).toBe("test street");
    expect(res.body.data.city).toBe("test city");
    expect(res.body.data.province).toBe("test province");
    expect(res.body.data.country).toBe("test country");
    expect(res.body.data.postal_code).toBe("1212");
  });

  it("should reject create address if token is invalid", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "salah")
      .send({
        street: "test street",
        city: "test city",
        province: "test province",
        country: "test country",
        postal_code: "1212",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(401);
  });

  it("should reject create address if contact is not found", async () => {
    const res = await supertest(web)
      .post(`/api/contacts/1/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "test street",
        city: "test city",
        province: "test province",
        country: "test country",
        postal_code: "1212",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(404);
  });

  it("should reject create address if request body is invalid", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "",
        city: "",
        province: "",
        country: "",
        postal_code: "1212",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(400);
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await ContactTest.createContact();
    await AddressTest.createAddress();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteContact();
    await UserTest.deleteUser();
  });

  it("should can get address", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const res = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.street).toBe("test street");
    expect(res.body.data.city).toBe("test city");
    expect(res.body.data.province).toBe("test province");
    expect(res.body.data.country).toBe("test country");
    expect(res.body.data.postal_code).toBe("1212");
  });

  it("should reject get address if token is invalid", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const res = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "salah");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(401);
  });

  it("should reject get address if contact is not found", async () => {
    const address = await AddressTest.get();
    const res = await supertest(web)
      .get(`/api/contacts/1121/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(404);
  });

  it("should reject get address if address is not found", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/2121221`)
      .set("X-API-TOKEN", "test");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await ContactTest.createContact();
    await AddressTest.createAddress();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteContact();
    await UserTest.deleteUser();
  });

  it("should can update address", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const res = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "test street baru",
        city: "test city baru",
        province: "test province baru",
        country: "test country baru",
        postal_code: "999999",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(200);
  });

  it("should reject update address if token is invalid", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const res = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "salah")
      .send({
        street: "test street baru",
        city: "test city baru",
        province: "test province baru",
        country: "test country baru",
        postal_code: "999999",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(401);
  });

  it("should reject update address if contact is not found", async () => {
    const address = await AddressTest.get();
    const res = await supertest(web)
      .put(`/api/contacts/1121/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "test street baru",
        city: "test city baru",
        province: "test province baru",
        country: "test country baru",
        postal_code: "999999",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(404);
  });

  it("should reject update address if address is not found", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/2121221`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "test street baru",
        city: "test city baru",
        province: "test province baru",
        country: "test country baru",
        postal_code: "999999",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(404);
  });
});
