import * as Yup from 'yup';

export default async (request, response, next) => {
    try {
        const schema = Yup.object().shape({
            delivery: Yup.number().required(),
            start_date: Yup.date().required(),
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
