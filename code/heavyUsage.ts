import { z } from "zod";

const BaseUser = z.object({
  name: z.string().min(3),
  email: z.email(),
});

const AdminUser = BaseUser.extend({
  role: z.literal("admin"),
  permissions: z.array(z.enum(["read", "write", "delete"])),
});

const RegularUser = BaseUser.extend({
  role: z.literal("user"),
  age: z.number().int().positive(),
});

const GuestUser = BaseUser.extend({
  role: z.literal("guest"),
  expiresAt: z.string().transform((val) => new Date(val)),
});

const AnyUserSchema = z
  .discriminatedUnion("role", [AdminUser, RegularUser, GuestUser])
  .refine(
    (data) => {
      if (data.role === "admin" && data.permissions.length === 0) {
        return false;
      }
      return true;
    },
    { message: "Admin must have at least one permission granted." }
  );
