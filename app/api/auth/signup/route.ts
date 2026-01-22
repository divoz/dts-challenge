import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  const { email, name, password } = await req.json();

  if (!email || !name || !password) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return Response.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return Response.json(
    { message: "User created successfully" },
    { status: 201 },
  );
};


