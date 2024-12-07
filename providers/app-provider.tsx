"use client";
import { userStore } from "@/store/user/session";
import React, { ReactNode, useLayoutEffect } from "react";

type Props = {
  children: ReactNode;
  userId: string | null;
  sessionClaims?: unknown;
};

export default function AppProvider(props: Props) {
  const setUserId = userStore().setUserId;
  const setSession = userStore().setSession;
  const clearStore = userStore().clearStore;

  useLayoutEffect(() => {
    if (props.userId) setUserId(props.userId);
    if (props.sessionClaims)
      setSession(props.sessionClaims as CustomJwtSessionClaims);

    return () => {
      clearStore();
    };
  }, [setUserId, setSession, clearStore, props.userId, props.sessionClaims]);

  return <>{props.children}</>;
}
