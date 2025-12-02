import { z } from "zod";

const CustomerSchema = z
  .object({
    isCompany: z.boolean(),
    cpf: z.string().optional(),
    cnpj: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isCompany) {
        return !!data.cnpj;
      } else {
        return !!data.cpf;
      }
    },
    {
      message: "CPF or CNPJ are required depending if its a company or not.",
      path: ["cpf"],
    }
  );

type Customer = z.infer<typeof CustomerSchema>;

const result = CustomerSchema.safeParse({
  isCompany: true,
  cpf: "123",
});

if (!result.success) {
  console.error(result.error);
} else {
  const customer: Customer = result.data;
  console.info(customer);
}
