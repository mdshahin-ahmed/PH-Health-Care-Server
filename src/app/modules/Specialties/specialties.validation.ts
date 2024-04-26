import { z } from "zod";

const create = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title should string",
  }),
});

export const specialtiesValidation = {
  create,
};
