import { NextRequest, NextResponse } from "next/server"
import { addUser, findUserByEmail } from "@/lib/users"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
  }

  if (findUserByEmail(email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  addUser({
    id: uuidv4(),
    email,
    password,
  })

  return NextResponse.json({ message: "User created" })
}
