import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ComplexSchema = z.object({
  name: z.string().min(3),
  phones: z.array(
    z.object({
      type: z.enum(["mobile", "home", "work"]),
      number: z.string().regex(/^\d{10,11}$/),
    })
  ),
  address: z.object({
    street: z.string(),
    city: z.string(),
    geo: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
});

type FormData = z.infer<typeof ComplexSchema>;

// Usage example inside of a react component
export function CustomComponent() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ComplexSchema),
    defaultValues: {
      name: "",
      phones: [{ type: "mobile", number: "" }],
      address: {
        street: "",
        city: "",
        geo: { lat: 0, lng: 0 },
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
  });

  const onSubmit = (data: FormData) => console.log(data);

  // rest of the component code ...
}
