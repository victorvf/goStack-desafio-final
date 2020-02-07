import jwt from 'jsonwebtoken';
import {promisify} from 'util';

import authConfig from '../../config/auth';

import User from '../models/User';

export default {
    async authenticated(request, response, next){
        const authHeader = request.headers.authorization;

        if(!authHeader){
            return response.status(401).json({
                error: "token not provided"
            });
        };

        const [, token] = authHeader.split(' ');

        try{
            const decoded = await promisify(jwt.verify)(token, authConfig.secret);

            request.userId = decoded.id;

            return next();
        } catch(error){
            return response.status(401).json({
                error: "token invalid"
            });
        };


    },

    async isAdmin(request, response, next){
        const user = await User.findByPk(request.userId);

        if(!user.admin){
            return response.status(401).json({
                error: "user has not permission"
            });
        };

        return next();
    }
};
