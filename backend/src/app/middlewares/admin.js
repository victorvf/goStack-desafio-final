import User from '../models/User';

export default async (request, response, next) => {
    const user = await User.findByPk(request.userId);

    if (!user.admin) {
        return response.status(401).json({
            error: 'user has not permission',
        });
    }

    return next();
};
