const validator = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody
        next();
    } catch (err) {
        const status = 422;
        const message = "Fill the Input fields properly";
        const extraDetails = err.errors[0].message;
        // const message = error.errors[0].message;

        const error = {
            status,
            message,
            extraDetails
        };
        
        console.log("error in error middleware", error);
        next(error);
        // res.status(400).json({ msg: message });
    }
}

module.exports = validator;