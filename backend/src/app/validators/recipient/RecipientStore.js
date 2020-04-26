import * as Yup from 'yup';

export default async (request, response, next) => {
    try {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cep: Yup.string().required(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            complement: Yup.string(),
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
