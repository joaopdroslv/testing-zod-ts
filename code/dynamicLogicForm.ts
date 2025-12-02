import { z } from "zod";

const DeliveryType = z.enum(["withdrawal", "mail", "delivery"]);

const DeliverySchema = z
  .object({
    type: DeliveryType,
    address: z.string().optional(),
    cep: z.string().optional(),
    storeId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "withdrawal" && !data.storeId) {
      ctx.addIssue({
        path: ["storeId"],
        message: "Please select a store.",
        code: "custom",
      });
    }

    if (data.type === "mail" && !data.cep) {
      ctx.addIssue({
        path: ["cep"],
        message: "CEP is required.",
        code: "custom",
      });
    }

    if (data.type === "delivery" && !data.address) {
      ctx.addIssue({
        path: ["Address"],
        message: "Address is required.",
        code: "custom",
      });
    }
  });
