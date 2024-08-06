import { z } from "zod";

const registrationValidator = z.object({
  email: z
    .string({
      required_error: "First name is required",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "First name is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(1, { message: "First name is required" }),
  lastName: z
    .string({
      required_error: "First name is required",
    })
    .min(1, { message: "Last name is required" }),
});

export default registrationValidator;
