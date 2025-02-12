const {z} = require('zod');
const User = require('../schema/user-schema');

// creating an object schema
const registerSchema = z.object({
   username: z
   .string({required_error : "Name is required"}).trim()
   .min(3, { message : " name must be at least of 3 character" })
   .max(50,{ message : "name must be less than 50 character" }),
   email: z.string({required_error : "Email is required"}).trim()
   .email({ message : "Invalid email" })
    .min(13, { message : "email must be at least of 13 character" })
    .max(50,{ message : "email must be less than 50 character" }),
    phone: z.string({required_error : "Phone number is required"}).trim()
    .min(10, { message : "phone number must be at least of 10 character" })
    .max(10,{ message : "phone number must be less than 13 character" }),
    password: z.string({required_error : "Password is required"}).trim()
    .min(8, { message : "password must be at least of 8 character" })
    .max(50,{ message : "password must be less than 50 character" }),
})

module.exports = registerSchema ;