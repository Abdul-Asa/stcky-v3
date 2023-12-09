"use server";
import { Magic } from "@magic-sdk/admin";
import { Buffer } from "buffer";

import { cookies } from "next/headers";
import { UserInfo } from "./types";
let mAdmin = new Magic(process.env.MAGIC_SECRET_KEY);

export const setSessionToken = async (didToken: string) => {
  if (!didToken) return { error: "No token provided" };

  try {
    mAdmin.token.validate(didToken);

    const metadata = await mAdmin.users.getMetadataByToken(didToken);
    if (!metadata.issuer) return { error: "No metadata found" };

    const encodedId = Buffer.from(metadata.issuer).toString("base64");
    cookies().set("token", encodedId);

    return {
      token: encodedId,
      email: metadata.email,
      issuer: metadata.issuer,
      provider: metadata.oauthProvider || "magic",
    } as UserInfo;
  } catch (error) {
    return { error: "Invalid DID token" };
  }
};

export const removeSessionToken = () => {
  cookies().delete("token");
};

export const checkSessionToken = async (encodedId: string) => {
  try {
    if (!encodedId) return { error: "No token provided" };

    const decodedId = Buffer.from(encodedId, "base64").toString();
    const metadata = await mAdmin.users.getMetadataByIssuer(decodedId);

    if (!metadata.issuer) return { error: "No metadata found" };

    return {
      token: encodedId,
      email: metadata.email,
      issuer: metadata.issuer,
      provider: metadata.oauthProvider || "magic",
    } as UserInfo;
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
