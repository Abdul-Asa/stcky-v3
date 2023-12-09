import * as z from "zod";

export const formSchema = z.object({
  email: z.string().email(),
});

export type UserInfo = {
  email: string;
  issuer: string;
  provider: "magic" | "google" | "github" | "none";
  token: string;
};
