import { _clerkClient } from "@/lib/server/clerk";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const defaultPassword = "prc@2k2*";
    const { userId, sessionClaims } = await auth();

    if (!sessionClaims?.hasDefaultPassword) {
      return NextResponse.json({
        verified: true,
      });
    }

    const data = await _clerkClient.users.verifyPassword({
      userId: userId!,
      password: defaultPassword,
    });

    if (data.verified) {
      await _clerkClient.users.updateUserMetadata(userId!, {
        publicMetadata: {
          hasDefaultPassword: false,
        },
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 400 });
  }
}
