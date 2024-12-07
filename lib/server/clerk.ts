import { createClerkClient } from "@clerk/backend";

export const _clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});
