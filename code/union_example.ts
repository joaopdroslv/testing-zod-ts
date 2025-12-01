import { z } from "zod";

const CardPayment = z.object({
  method: z.literal("card"),
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number."),
  cvv: z.string().regex(/^\d{3,4}$/),
});

const PixPayment = z.object({
  method: z.literal("pix"),
  pixKey: z.string().min(5),
});

const BoletoPayment = z.object({
  method: z.literal("boleto"),
  cpf: z.string().regex(/^\d{11}$/),
});

const PaymentMethodSchema = z.discriminatedUnion("method", [
  CardPayment,
  PixPayment,
  BoletoPayment,
]);

type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

const result = PaymentMethodSchema.safeParse({
  method: "boleto",
  cpf: "46235456875",
});

if (!result.success) {
  console.error(result);
  console.error(result.error.format());
} else {
  const paymentMethod: PaymentMethod = result.data;
  console.info(paymentMethod);
}
