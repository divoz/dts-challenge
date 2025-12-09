import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const taskId = Number(id);

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

// DYNAMIC UPDATE <-- accepts {status}, {level}, any select with options
export const PATCH = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  const taskId = Number(id);

  if (!taskId) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await req.json(); // { status: "...", level: "..." }

    if (!body || Object.keys(body).length === 0) {
      return Response.json({ error: "Empty body" }, { status: 400 });
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: body, // <— accepts {status}, {level}, ANYTHING
    });

    return Response.json(
      { message: "Task updated", data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH error:", error);
    return Response.json({ error: "Failed to update task" }, { status: 500 });
  }
};
