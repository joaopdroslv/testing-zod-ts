import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(3, "Name is too short.").describe("User's full name."),
  age: z
    .number()
    .int("Age must be a integer.")
    .positive("Age should be a positive number.")
    .gt(18, "User should be older than 18 years old.")
    .optional()
    .describe("User's age."),
  email: z
    .email("E-mail is invalid.")
    .describe("User's valid email address for later contact."),
});

type User = z.infer<typeof UserSchema>;

// const result = UserSchema.safeParse({name: "John Doe", email: "example@gmail.com"});
const result = UserSchema.safeParse({
  name: "Ann",
  age: 15,
  email: "example@gmail.com",
});

if (!result.success) {
  console.error(result.error);
} else {
  const user: User = result.data;
  console.info(user);
}
