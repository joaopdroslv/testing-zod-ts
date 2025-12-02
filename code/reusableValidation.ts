import { z } from "zod";

const validateCpf = () => {
  // Implementation of the complex/specific validation
  return true;
};

const BrazilianCpf = z.string().refine(validateCpf, "The CPF is invalid.");

const PersonSchema = z.object({
  cpf: BrazilianCpf,
});
