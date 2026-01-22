import { POST } from "@/app/api/auth/signup/route";
import { prisma } from "@/lib/prisma";

const makeRequest = (body: object) =>
  new Request("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /api/auth/signup", () => {
  it("should create a new user", async () => {
    const req = makeRequest({
      email: `test-${Date.now()}@test.com`,
      name: "Test User",
      password: "password",
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
  });
});
