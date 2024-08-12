const bcrypt = require('bcryptjs');
const { UserModel } = require('../models/usermodel.js');
const { generateToken, verificateToken } = require('../help/functions.js');

const userLoginController = {
    loginSesion: async (req, res) => {
        try {
            const { username, password } = req.body;
            const userFound = await UserModel.findOne({ email: username });
            console.log(username, password);
            
            const validatedPassword = await bcrypt.compare(password, userFound.password);

            if (validatedPassword) {
                const token = await generateToken({
                    id: userFound._id,
                    email: userFound.email,
                });
                res.json({
                    res: 'Excellent',
                    message: 'Access correct',
                    data: token,
                });
            } else {
                res.json({
                    res: 'todo mal unhappy',
                    message: 'Into the ELSE is an error',
                    data: null,
                });
            }
        } catch (error) {
            res.json({
                res: 'todo mal unhappy',
                message: 'Into the Catch generate an error',
                data: error,
            });
        }
    },

    validateToken: async (req, res) => {
        try {
            const token = req.params.token;
            const decodificado = await verificateToken(token);
            if (decodificado) {
                res.json({
                    res: 'bien',
                    message: 'token válido',
                    data: decodificado,
                });
            } else {
                res.json({
                    res: 'mal',
                    message: 'token no válido',
                    data: null,
                });
            }
        } catch (error) {
            res.json({
                res: 'mal',
                message: 'ocurrió un error al validar token',
                data: error,
            });
        }
    }
};

module.exports = userLoginController;
