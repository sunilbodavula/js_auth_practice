const validate = (schema) => {
    return (req, res, next) => {

        const result = schema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                message: "validation Failed",
                errors: result.error.issues.map((issue) => ({
                    filed: issue.path.join("."),
                    message: issue.message
                }))
            });
        }

        req.body = result.data;
        next();
    };
};

module.exports = validate;