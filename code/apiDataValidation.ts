import { z } from "zod";

const RatingSchema = z.object({
  rate: z.number(),
  count: z.int(),
});

const ProductSchema = z.object({
  id: z.int(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.url(),
  rating: RatingSchema,
});

async function fetchProduct(id: number) {
  const data = await fetch(`https://fakestoreapi.com/products/${id}`).then(
    (r) => r.json()
  );

  const parsed = ProductSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("The API returned invalid product data.");
  }

  return parsed.data;
}

fetchProduct(1).then((output) => console.log(output));
