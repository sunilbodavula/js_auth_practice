const { z } = require("zod");

const registerSchema = z.object({
    name: z
    .string()
    .trim()
    .min(2, "Name must be atleast 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

    email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email cannot exceed 255 characters"),

    password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(72, "Password cannot exceed 72 characters")

});

const loginSchema = z.object({
    email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email cannot exceed 255 characters"),

    password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(72, "Password cannot exceed 72 characters")
})

module.exports = {
    registerSchema,
    loginSchema
};