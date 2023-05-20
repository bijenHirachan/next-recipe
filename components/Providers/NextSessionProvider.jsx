"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

const NextSessionProvider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NextSessionProvider;
