import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const POST = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    return Response.json({ error: "No session token found" }, { status: 400 });
  }

  await prisma.session.deleteMany({
    where: {
      id: token,
    },
  });

  cookieStore.delete("session");

  return Response.json({
    message: "Logged out successfully",
  });
};
