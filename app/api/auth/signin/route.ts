import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const token = crypto.randomUUID();

  const cookieStore = await cookies();

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

    await prisma.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return Response.json(
      { message: "Logged in successfully" },
      { status: 200 },
    );
  } catch (err) {
    return Response.json({ error: { err } }, { status: 500 });
  }
};
