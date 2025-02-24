// const validator = (schema) => async (req, res, next) => {
//     try {
//         const parseBody = await schema.parseAsync(req.body);
//         req.body = parseBody
//         next();
//     } catch (err) {
//         const status = 422;
//         const message = "Fill the Input fields properly";
//         const extraDetails = err.errors[0].message;
//         // const message = error.errors[0].message;

//         const error = {
//             status,
//             message,
//             extraDetails
//         };
        
//         console.log("error in validate middleware", error);
//         next(error);
//         // res.status(400).json({ msg: message });
//     }
// }

// module.exports = validator;



const validator = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        const status = 422;
        const errors = err.errors.map(e => e.message); // Get all validation errors

        const errorResponse = {
            status,
            message: "Validation failed",
            errors // Send all validation errors
        };

        console.log("Error in validation middleware:", errorResponse);
        return res.status(status).json(errorResponse); // Return response instead of passing to `next()`
    }
};

module.exports = validator;
