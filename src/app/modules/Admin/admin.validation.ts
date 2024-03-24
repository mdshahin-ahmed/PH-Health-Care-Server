import { z } from "zod";

const update = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name should be string",
      })
      .optional(),
    contactNumber: z
      .string({
        invalid_type_error: "Contact number should be string",
      })
      .optional(),
  }),
});

export const adminValidationSchemas = {
  update,
};
