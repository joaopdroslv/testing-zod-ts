import { z } from "zod";

const UserSchema = z.object({
  id: z.int(),
  name: z.string().min(3),
  email: z.email(),
  password: z.string(),
});

/*
partial()

Transforms every field into optional
*/
const PartialUserSchema = UserSchema.partial();

// pick()
const LoginSchema = UserSchema.pick({ email: true, password: true });

// omit()
const WithoutPasswordSchema = UserSchema.omit({ password: true });

// merge()
const RoleSchema = z.object({
  role: z.string(),
  permissions: z.string().array(),
});

// extend()
const UserWithRoleSchema = UserSchema.extend(RoleSchema);
