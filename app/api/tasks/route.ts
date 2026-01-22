import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (tasks.length === 0) {
      return Response.json(
        {
          message: "No tasks found",
          data: [],
        },
        { status: 200 },
      );
    }

    return Response.json(
      { message: "Tasks retrieved", data: tasks },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /tasks error:", error);

    return Response.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
};

// POST /api/tasks
export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { title, description, dueDate, status } = body;

    if (!title) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: status || "not-started",
      },
    });

    return Response.json(
      { message: "Task created", data: task },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /tasks error:", error);
    return Response.json({ error: "Failed to create task" }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const taskId = parseInt(params.id, 10);

    if (isNaN(taskId)) {
      return Response.json({ error: "Invalid task ID" }, { status: 400 });
    }

    // Check if task exists
    const existing = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existing) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }

    await prisma.task.delete({ where: { id: taskId } });

    return Response.json(
      { message: "Task deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /tasks/:id error:", error);
    return Response.json({ error: "Failed to delete task" }, { status: 500 });
  }
};
