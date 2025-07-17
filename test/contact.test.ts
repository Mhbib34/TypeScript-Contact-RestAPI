import supertest from "supertest";
import { web } from "../src/config/web";
import { logger } from "../src/config/logging";
import { ContactTest, UserTest } from "./test.util";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.createUser();
  });
  afterEach(async () => {
    await ContactTest.deleteContact();
    await UserTest.deleteUser();
  });
  it("should create contact", async () => {
    const res = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "test contact",
        last_name: "test contact",
        email: "test@test.com",
        phone: "089999999999",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.first_name).toBe("test contact");
    expect(res.body.data.last_name).toBe("test contact");
    expect(res.body.data.email).toBe("test@test.com");
    expect(res.body.data.phone).toBe("089999999999");
  });

  it("should cant create contact if token is invalid", async () => {
    const res = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "salah")
      .send({
        first_name: "test contact",
        last_name: "test contact",
        email: "test@test.com",
        phone: "089999999999",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(401);
  });

  it("should cant create contact if data is invalid", async () => {
    const res = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "test",
        phone: "0899999999999999999999999999",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(400);
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await ContactTest.createContact();
  });

  afterEach(async () => {
    await ContactTest.deleteContact();
    await UserTest.deleteUser();
  });

  it("should can get contact", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.first_name).toBe("test contact");
    expect(res.body.data.last_name).toBe("test contact");
    expect(res.body.data.email).toBe("test@test.com");
    expect(res.body.data.phone).toBe("089999999999");
  });

  it("should reject get contact if token is invalid", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "salah");

    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(401);
  });

  it("should reject get contact if contactId is invalid", async () => {
    const res = await supertest(web)
      .get(`/api/contacts/121`)
      .set("X-API-TOKEN", "test");

    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await ContactTest.createContact();
  });

  afterEach(async () => {
    await ContactTest.deleteContact();
    await UserTest.deleteUser();
  });

  it("should can update contact", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "test contact 2",
        last_name: "test contact 2",
        email: "test2@test.com",
        phone: "089999999999",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.first_name).toBe("test contact 2");
    expect(res.body.data.last_name).toBe("test contact 2");
    expect(res.body.data.email).toBe("test2@test.com");
    expect(res.body.data.phone).toBe("089999999999");
  });
  it("should reject update contact if token is invalid", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "salah")
      .send({
        first_name: "test contact 2",
        last_name: "test contact 2",
        email: "test2@test.com",
        phone: "089999999999",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(401);
  });

  it("should reject update contact if contactId is invalid", async () => {
    const res = await supertest(web)
      .put(`/api/contacts/121`)
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "test contact 2",
        last_name: "test contact 2",
        email: "test2@test.com",
        phone: "089999999999",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(404);
  });

  it("should reject update contact if body is invalid", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "test",
        phone: "0899999999999999999999999999",
      });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await ContactTest.createContact();
  });

  afterEach(async () => {
    await ContactTest.deleteContact();
    await UserTest.deleteUser();
  });

  it("should can delete contact", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .delete(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(200);
  });

  it("should reject delete contact if token is invalid", async () => {
    const contact = await ContactTest.get();
    const res = await supertest(web)
      .delete(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "salah");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(401);
  });

  it("should reject delete contact if contactId is invalid", async () => {
    const res = await supertest(web)
      .delete(`/api/contacts/121`)
      .set("X-API-TOKEN", "test");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(404);
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.createUser();
    await ContactTest.createContact();
  });

  afterEach(async () => {
    await ContactTest.deleteContact();
    await UserTest.deleteUser();
  });

  it("should can get contacts", async () => {
    const res = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "test");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.data[0].id).toBeDefined();
    expect(res.body.data[0].first_name).toBe("test contact");
    expect(res.body.data[0].last_name).toBe("test contact");
    expect(res.body.data[0].email).toBe("test@test.com");
    expect(res.body.data[0].phone).toBe("089999999999");
    expect(res.body.paging.total_page).toBe(1);
    expect(res.body.paging.current_page).toBe(1);
    expect(res.body.paging.size).toBe(10);
  });

  it("should reject get contacts if token is invalid", async () => {
    const res = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "salah");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(401);
  });

  it("should can get contacts with query params first_name", async () => {
    const res = await supertest(web)
      .get("/api/contacts?first_name=test")
      .set("X-API-TOKEN", "test");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.data[0].id).toBeDefined();
    expect(res.body.data[0].first_name).toBe("test contact");
    expect(res.body.data[0].last_name).toBe("test contact");
    expect(res.body.data[0].email).toBe("test@test.com");
    expect(res.body.data[0].phone).toBe("089999999999");
    expect(res.body.paging.total_page).toBe(1);
    expect(res.body.paging.current_page).toBe(1);
    expect(res.body.paging.size).toBe(10);
  });
  it("should can get contacts with query params last_name", async () => {
    const res = await supertest(web)
      .get("/api/contacts?last_name=test")
      .set("X-API-TOKEN", "test");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.data[0].id).toBeDefined();
    expect(res.body.data[0].first_name).toBe("test contact");
    expect(res.body.data[0].last_name).toBe("test contact");
    expect(res.body.data[0].email).toBe("test@test.com");
    expect(res.body.data[0].phone).toBe("089999999999");
    expect(res.body.paging.total_page).toBe(1);
    expect(res.body.paging.current_page).toBe(1);
    expect(res.body.paging.size).toBe(10);
  });
  it("should can get contacts with query params email", async () => {
    const res = await supertest(web)
      .get("/api/contacts?email=test%40test.com")
      .set("X-API-TOKEN", "test");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.data[0].id).toBeDefined();
    expect(res.body.data[0].first_name).toBe("test contact");
    expect(res.body.data[0].last_name).toBe("test contact");
    expect(res.body.data[0].email).toBe("test@test.com");
    expect(res.body.data[0].phone).toBe("089999999999");
    expect(res.body.paging.total_page).toBe(1);
    expect(res.body.paging.current_page).toBe(1);
    expect(res.body.paging.size).toBe(10);
  });
  it("should can get contacts with query params phone", async () => {
    const res = await supertest(web)
      .get("/api/contacts?phone=089999999999")
      .set("X-API-TOKEN", "test");
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.data[0].id).toBeDefined();
    expect(res.body.data[0].first_name).toBe("test contact");
    expect(res.body.data[0].last_name).toBe("test contact");
    expect(res.body.data[0].email).toBe("test@test.com");
    expect(res.body.data[0].phone).toBe("089999999999");
    expect(res.body.paging.total_page).toBe(1);
    expect(res.body.paging.current_page).toBe(1);
    expect(res.body.paging.size).toBe(10);
  });
});
