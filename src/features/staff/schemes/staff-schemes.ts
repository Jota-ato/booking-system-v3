import z from "zod";

export const staffSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  occupation: z.string().optional(),
  about: z.string().optional(),
  image: z.url({ error: "Invalid image URL" }).nullable().optional(),
});

export const staffUpdateSchema = staffSchema.partial();
export type UpdateStaffInput = z.infer<typeof staffUpdateSchema>;
