const yup = require("yup")

const userRule = yup
    .object()
    .shape({

        email: yup
            .string()
            .required()
            .email()
            .lowercase()
            .trim(),

            password_hash: yup.string().when("$validatePassword", {
            is: true,
            then: yup
                .string()
                .required()
                .min(8)
                .max(30),
        }),

        user_name: yup
            .string()
            .required()
            .max(30)
            .default("")
            .trim(),
    })
    .noUnknown()

module.exports = userRule