import * as Yup from 'yup';

export default async (request, response, next) => {
    try {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string()
                .email()
                .required(),
            old_password: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('old_password', (old_password, field) =>
                    old_password ? field.required() : field
                ),
            confirm_password: Yup.string()
                .min(6)
                .when('password', (password, field) =>
                    password
                        ? field.required().oneOf([Yup.ref('password')])
                        : field
                ),
        });

        await schema.validate(request.body, { abortEarly: false });

        return next();
    } catch (err) {
        return response.status(400).json({
            error: 'validation fails',
            message: err.inner,
        });
    }
};
