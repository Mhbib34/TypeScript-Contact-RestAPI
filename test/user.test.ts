import supertest from "supertest";
import { web } from "../src/config/web";
import { logger } from "../src/config/logging";
import { UserTest } from "./test.util";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.deleteUser();
  });

  it("should create user", async () => {
    const res = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test123",
      name: "test",
    });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.data.username).toBe("test");
    expect(res.body.data.name).toBe("test");
  });

  it("should cant create user if username already exists", async () => {
    await supertest(web).post("/api/users").send({
      username: "test",
      password: "test123",
      name: "test",
    });
    const res = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test123",
      name: "test",
    });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(400);
    expect(res.body.errors).toBe("Username already exists");
  });

  it("should cant create user if data is invalid", async () => {
    const res = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(400);
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await UserTest.createUser();
  });

  afterEach(async () => {
    await UserTest.deleteUser();
  });

  it("should login user", async () => {
    const res = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test123",
    });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.data.username).toBe("test");
    expect(res.body.data.name).toBe("test");
    expect(res.body.data.token).toBeDefined();
  });

  it("should cant login user if password is invalid", async () => {
    const res = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test111",
    });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(401);
  });

  it("should cant login user if username is invalid", async () => {
    const res = await supertest(web).post("/api/users/login").send({
      username: "eee",
      password: "test123",
    });
    logger.debug(res.body);
    console.log(res.body);
    expect(res.status).toBe(401);
  });
});
