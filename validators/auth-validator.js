// const {z} = require('zod');
// const User = require('../schema/user-schema');


// // login validator

// const loginSchema = z.object({
//     email: z.string({required_error : "Email is required"}).trim()
//     .email({ message : "Invalid email" })
//      .min(13, { message : "email must be at least of 13 character" }),
//      password: z.string({required_error : "Password is required"}).trim()
//     .min(8, { message : "password must be at least of 8 character" })
//     .max(50,{ message : "password must be less than 50 character" })
// })

// // creating an object schema
// const registerSchema = loginSchema.extend({
//    username: z
//    .string({required_error : "Name is required"}).trim()
//    .min(3, { message : " name must be at least of 3 character" })
//    .max(50,{ message : "name must be less than 50 character" }),

//     phone: z.string({required_error : "Phone number is required"}).trim()
//     .min(10, { message : "phone number must be at least of 10 character" })
//     .max(10,{ message : "phone number must be less than 13 character" }),
// })

// module.exports = {registerSchema, loginSchema} ;



const { z } = require('zod');

// Login Schema
const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).trim()
        .email({ message: "Invalid email" }),
    password: z.string({ required_error: "Password is required" }).trim()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(50, { message: "Password must be less than 50 characters" })
});

// Register Schema (Extending Login Schema)
const registerSchema = loginSchema.extend({
    username: z.string({ required_error: "Name is required" }).trim()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name must be less than 50 characters" }),

    phone: z.string({ required_error: "Phone number is required" }).trim()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(13, { message: "Phone number must be at most 13 digits" }) // Fixed issue
});

module.exports = { registerSchema, loginSchema };
