const request = require("supertest");
const { User } = require("../models"); // Import User model
const sequelize = require("../src/config/database"); // Import DB connection
const { app, server } = require("../src/app");

describe("Auth Routes", () => {
  afterAll(async () => {
    console.log("Closing database connection...");
    await sequelize.close();
    if (server) server.close();
  });

  let testUser = {
    full_name: "John Doe",
    email: "johndoe@example.com",
    password: "Test@1234",
  };

  // ✅ Test Signup (Success)
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .expect(201);
    expect(res.body).toHaveProperty("message", "User created successfully!");
    expect(res.body.user.email).toBe(testUser.email);
  });

  // ❌ Test Signup (Existing Email)
  it("should not allow duplicate email signup", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .expect(400);

    expect(res.body).toHaveProperty("message", "User already exists!");
  });

  let NoFullNameuser = {
    email: "hello@example.com",
    password: "Test@1234",
  };

  it("fullname is required during signup", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send(NoFullNameuser)
      .expect(400);

    console.log("respio", res.body);

    expect(res.body).toHaveProperty("message", "Bad request");
  });

  // ✅ Test Login (Success)
  it("should login successfully", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);
    // expect(res.headers["set-cookie"]).toBeDefined();

    expect(res.body).toHaveProperty("accessToken");
    accessToken = res.body.accessToken; // Save access token for further tests
  });

  // ❌ Test Login (Incorrect Password)
  it("should fail to login with incorrect password", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: testUser.email,
        password: "WrongPassword",
      })
      .expect(401);
    // expect(res.headers["set-cookie"]).toBeDefined();

    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });

  // ❌ Test Login (Non-existent User)
  it("should fail to login with non-existent user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "notfound@example.com",
        password: "Password123",
      })
      .expect(401);
    // expect(res.headers["set-cookie"]).toBeDefined();

    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });

  // ✅ Test Logout
  it("should log out the user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/logout")
      .send({ userId: 1 })
      .expect(200);

    expect(res.body).toHaveProperty("message", "User logged out successfully!");
  });
});
