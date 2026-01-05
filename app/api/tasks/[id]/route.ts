import { TaskPatchInput } from "@/types/task";
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

export const PATCH = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await context.params;
    const taskId = Number(id);

    if (!taskId) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();
    const { title, description, dueDate, status, level } = body;

    const data: TaskPatchInput = {};

    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description || null;
    if (dueDate !== undefined)
      data.dueDate = dueDate ? new Date(dueDate) : null;
    if (status !== undefined) data.status = status || null;
    if (level !== undefined) data.level = level || null;

    if (Object.keys(data).length === 0) {
      return Response.json({ error: "Empty body" }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    return Response.json(
      { message: "Task updated", data: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /tasks error:", error);
    return Response.json({ error: "Failed to update task" }, { status: 500 });
  }
};
