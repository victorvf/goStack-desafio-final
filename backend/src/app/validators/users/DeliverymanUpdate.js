import * as Yup from 'yup';

export default async (request, response, next) => {
    try {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            avatar_id: Yup.number(),
        });

        await schema.validate(request.body);

        return next();
    } catch (err) {
        return response.status(400).json({
            error: 'validation fails',
            message: err.inner,
        });
    }
};
