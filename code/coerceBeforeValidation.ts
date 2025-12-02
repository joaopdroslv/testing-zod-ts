import { z } from "zod";

// Using coerce before validation to transform "18" => 18 and "true" => true
const MySchema = z.object({
  age: z.coerce.number().min(18),
  active: z.coerce.boolean(),
});
