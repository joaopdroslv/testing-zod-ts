import { z } from "zod";

const UserInputSchema = z
  .object({
    email: z.email(),
    name: z.string().min(1),
    birthDate: z.string(),
  })
  .transform((data) => ({
    ...data,
    email: data.email.toLocaleLowerCase(),
    birthDate: new Date(data.birthDate),
  }));


type UserInput = z.infer<typeof UserInputSchema>;
