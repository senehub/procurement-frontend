"use server";

import { _clerkClient } from "@/lib/server/clerk";
import { ServerActionResponse } from "@/types/global";
import { revalidatePath } from "next/cache";

export type InvitationInterface = {
  id: string;
  emailAddress: string;
  createdAt: number;
  updatedAt: number;
  status: "pending" | "revoked" | "accepted";
  revoked: boolean | undefined;
  publicMetadata: {
    lastName: string;
    firstName: string;
  };
};

export async function getInvitations(
  limit?: number,
  offset?: number
): Promise<
  ServerActionResponse<{
    data: InvitationInterface[];
    totalCount: number;
  }>
> {
  try {
    const invitations = await _clerkClient.invitations.getInvitationList({
      limit: limit,
      offset: offset,
    });

    const data = invitations.data.map(
      ({
        id,
        emailAddress,
        createdAt,
        updatedAt,
        status,
        revoked,
        publicMetadata,
      }) => ({
        id,
        emailAddress,
        createdAt,
        updatedAt,
        status,
        revoked,
        publicMetadata:
          publicMetadata as unknown as InvitationInterface["publicMetadata"],
      })
    );

    return {
      data: {
        data,
        totalCount: invitations.totalCount,
      },
    };
  } catch (error) {
    let message = "Failed to get invitations";

    if (error instanceof Error) message = error.message;
    return {
      message,
      error: true,
    };
  }
}

interface InvitationData {
  emailAddress: string;
  companyName?: string;
}

export async function createInvitation(
  data: InvitationData
): Promise<ServerActionResponse<null>> {
  try {
    await _clerkClient.invitations.createInvitation({
      notify: true,
      ignoreExisting: true,
      //   ignoreExisting: false,
      emailAddress: data.emailAddress!,
      publicMetadata: {
        companyName: data.companyName,
      },
      redirectUrl: process.env.CLERK_INVITATION_REDIRECT_URL,
    });

    revalidatePath("/suppliers/invitations", "page");

    return {
      data: null,
    };
  } catch (error) {
    let message = "Failed to send invitations";

    if (error instanceof Error) message = error.message;
    return {
      message,
      error: true,
    };
  }
}
