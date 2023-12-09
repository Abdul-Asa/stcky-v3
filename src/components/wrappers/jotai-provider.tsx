"use client";

import { UserInfo } from "@/lib/types";
import { Provider, atom } from "jotai";

export default function JotaiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}

export const userAtom = atom<UserInfo>({
  email: "",
  issuer: "",
  provider: "none",
  token: "",
});

export const updateOnSignInAtom = atom(
  null,
  (get, set, signInInfo: UserInfo) => {
    set(userAtom, signInInfo);
  }
);
