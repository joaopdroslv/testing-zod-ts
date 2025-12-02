import { z } from "zod";

const ItemSchema = z.object({
  id: z.string(),
  qty: z.number().int().positive(),
  price: z.number().positive(),
});

const OderSchema = z
  .object({
    orderId: z.string(),
    items: z.array(ItemSchema).nonempty("A order must have at least one item."),
  })
  .refine(
    (order) => {
      const total = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
      return total >= 50;
    },
    {
      message: "The minimum order value is $50.",
    }
  );
