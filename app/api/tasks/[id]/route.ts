import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ⭐ MUST AWAIT PARAMS

  const taskId = Number(id);

  console.log("🚀 ~ taskId:", taskId);

  if (isNaN(taskId)) {
    return Response.json({ error: "Invalid task ID" }, { status: 400 });
  }

  try {
    const existing = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existing) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    return Response.json({ message: "Task deleted" }, { status: 200 });
  } catch (err) {
    console.error("DELETE error:", err);
    return Response.json({ error: "Failed to delete" }, { status: 500 });
  }
}
