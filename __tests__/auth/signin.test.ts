import { POST } from "@/app/api/auth/signin/route";

const makeRequest = (body: object) =>
  new Request("http://localhost:3000/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

describe("POST /api/auth/signin", () => {
  it("fails with missing credentials", async () => {
    const req = makeRequest({
      email: "test1@testj.com",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
