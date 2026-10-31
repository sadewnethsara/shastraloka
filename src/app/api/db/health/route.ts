import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";

export async function GET() {
  try {
    const userList = await db.select().from(users).limit(5);
    return NextResponse.json({
      status: "connected",
      database: "Cloud SQL PostgreSQL",
      usersCount: userList.length,
      sampleUsers: userList,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        status: "error",
        database: "Cloud SQL PostgreSQL",
        message,
      },
      { status: 500 }
    );
  }
}
