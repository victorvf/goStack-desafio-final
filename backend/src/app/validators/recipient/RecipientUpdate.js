import * as Yup from 'yup';

export default async (request, response, next) => {
    try {
        const schema = Yup.object().shape({
            name: Yup.string(),
            cep: Yup.string(),
            street: Yup.string().when('cep', (cep, field) =>
                cep ? field.required() : field
            ),
            city: Yup.string().when('street', (street, field) =>
                street ? field.required() : field
            ),
            state: Yup.string().when('city', (city, field) =>
                city ? field.required() : field
            ),
            number: Yup.number(),
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
