import { z } from "zod";

type MenuNode = {
  label: string;
  children?: MenuNode[];
};

/*
Zod only executes the function given to lazy()
when it actually needs the schema, allowing
MenuSchema to be referenced within itself.
*/
const MenuSchema: z.ZodType<MenuNode> = z.lazy(() =>
  z.object({
    label: z.string(),
    children: z.array(MenuSchema).optional(),
  })
);

const input = {
  label: "Root",
  children: [
    { label: "A" },
    {
      label: "B",
      children: [{ label: "C" }],
    },
  ],
};

const parsed = MenuSchema.parse(input);
console.log(parsed);
