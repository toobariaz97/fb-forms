// // pages/api/getLocation.ts
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../db";
import User from "@/models/user";

export async function GET() {
  let ip;
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");
  console.log({ forwardedFor });

  if (forwardedFor) {
    ip = forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }
  console.log({ ip });

  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const locationData = await response.json();
  console.log(locationData);

  return NextResponse.json({ status: 200, locationData });
}

export async function POST(req: NextRequest) {
  await dbConnect(); // Ensure database connection

  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { email, phoneNumber } = body;
      console.log({ BODY: body.browserInfo });

      const existingUser = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      });

      if (existingUser) {
        const errorMessage =
          existingUser.email === email
            ? "Email already exists"
            : "Contact number already exists";

        return NextResponse.json({
          status: 400,
          success: false,
          message: errorMessage,
        });
      }
      const FALLBACK_IP_ADDRESS = "0.0.0.0";
      let ip;
      const forwardedFor = headers().get("x-forwarded-for");
      console.log({ forwardedFor });

      if (forwardedFor) {
        ip = forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
      }
      console.log({ ip });
      const newUser = await User.create({
        ...body,
        browserInfo: body.browserInfo,
        ip,
      });
      console.log({ newUser });

      return NextResponse.json({
        status: 201,
        success: true,
        data: newUser,
        message: "User created successfully",
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Server error",
      });
    }
  } else {
    return NextResponse.json({
      status: 405,
      success: false,
      message: "Method Not Allowed",
    });
  }
}
