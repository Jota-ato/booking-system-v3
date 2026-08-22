import z from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Name is required" })
    .max(50, { error: "Name must be less than 50 characters" }),
  email: z.email({ error: "Invalid email address" }),
  image: z.url({ error: "Invalid image URL" }).nullable().optional(),
});

export const updateUserSchema = userSchema.partial();
export type UserInput = z.infer<typeof userSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
