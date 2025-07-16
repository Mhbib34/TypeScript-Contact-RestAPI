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
