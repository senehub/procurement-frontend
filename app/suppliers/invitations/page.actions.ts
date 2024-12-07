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

export async function getInvitations(): Promise<
  ServerActionResponse<{
    data: InvitationInterface[];
    totalCount: number;
  }>
> {
  try {
    const invitaions = await _clerkClient.invitations.getInvitationList({});

    const data = invitaions.data.map(
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
        totalCount: invitaions.totalCount,
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

interface InivationData {
  emailAddress: string;
  lastName?: string;
  firstName?: string;
}

export async function createIntitation(
  data: InivationData
): Promise<ServerActionResponse<null>> {
  try {
    await _clerkClient.invitations.createInvitation({
      notify: true,
      ignoreExisting: true,
      //   ignoreExisting: false,
      emailAddress: data.emailAddress!,
      publicMetadata: {
        lastName: data.lastName,
        firstName: data.firstName,
      },
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
