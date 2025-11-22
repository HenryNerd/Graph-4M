import * as z from "zod";

export const SignupForm = z.object({
    username: z
        .string()
        .min(3, {error: "Username must be over 3 characters."})
        .max(12, {error: "Username must be below 12 characters"})
        .trim(),
    password: z
        .string()
        .min(7, {error: "Password must be over 7 characters"})
        .max(64, {error: "Password must be under 64 characters"})
        .trim()
});