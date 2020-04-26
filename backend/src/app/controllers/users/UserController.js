import User from '../../models/User';

class UserController {
    async index(request, response) {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'admin'],
        });

        return response.json(users);
    }

    async show(request, response) {
        const user = await User.findByPk(request.params.id, {
            attributes: ['id', 'name', 'email', 'admin'],
        });

        if (!user) {
            return response.status(404).json({
                error: 'User not found',
            });
        }

        return response.json(user);
    }

    async store(request, response) {
        const userExist = await User.findOne({
            where: {
                email: request.body.email,
            },
        });

        if (userExist) {
            return response.status(400).json({
                error: 'user already exists',
            });
        }

        const { id, name, email } = await User.create(request.body);

        return response.json({
            id,
            name,
            email,
        });
    }

    async update(request, response) {
        const { email, old_password } = request.body;
        const user = await User.findByPk(request.userId);

        if (!user) {
            return response.status(404).json({
                error: 'user not found',
            });
        }

        if (email && email !== user.email) {
            const userExist = await User.findOne({ where: { email } });

            if (userExist) {
                return response.status(401).json({
                    error: 'email already exists',
                });
            }
        }

        if (old_password && !user.checkPassword(old_password)) {
            return response.status(401).json({
                error: 'password does not match',
            });
        }

        const { id, name } = await user.update(request.body);

        return response.json({
            id,
            name,
            email,
        });
    }

    async delete(request, response) {
        const user = await User.findByPk(request.params.id);

        if (!user) {
            return response.status(404).json({
                error: 'user not found',
            });
        }

        await user.destroy();

        return response.json({
            message: 'deleted user',
        });
    }
}

export default new UserController();
