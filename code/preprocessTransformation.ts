import { z } from "zod";

/*
Using .preprocess() to transform "dirty" data

Useful when fields come as strings but you need a number.
*/
const NumericSchema = z.object({
  age: z.preprocess((val) => Number(val), z.number().int().positive()),
});
