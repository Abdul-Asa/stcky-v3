"use server";
import { Magic } from "@magic-sdk/admin";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
let mAdmin = new Magic(process.env.MAGIC_SECRET_KEY);

export const setSessionToken = async (didToken: string) => {
  if (!didToken) return { error: "No token provided" };

  try {
    mAdmin.token.validate(didToken);

    const metadata = await mAdmin.users.getMetadataByToken(didToken);
    if (!metadata.issuer) return { error: "No metadata found" };

    const hashdId = await bcrypt.hash(metadata.issuer, 10);
    cookies().set("token", hashdId);

    return { hashdId };
  } catch (error) {
    return { error: "Invalid DID token" };
  }
};

export const deleteCookie = () => {
  cookies().delete("token");
};
