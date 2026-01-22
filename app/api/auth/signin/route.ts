import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json(
        { error: "user-Invalid credentials" },
        { status: 401 },
      );
    }

    const ok = bcrypt.compareSync(password, user.password);

    if (!ok) {
      return Response.json(
        { error: "Password-Invalid credentials" },
        { status: 401 },
      );
    }

    return Response.json({ message: "Sign-in route" }, { status: 200 });
  } catch (err) {
    return Response.json({ error: { err } }, { status: 500 });
  }
};
