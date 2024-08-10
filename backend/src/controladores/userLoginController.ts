import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { generateToken, verificateToken } from '../help/functions';

const userLoginController = {

    loginSesion: async (req: any, res: any) => {
        try {

            const {username, password} = req.body;
            const userFound = await UserModel.findOne({
              email: username,
            });
            console.log(username, password);
            
            const validatedPassword = await bcrypt.compare(
                password,
                //password
                userFound!.password
            );

            if (validatedPassword) {
                const token = await generateToken({
                id: userFound?._id,
                email: userFound?.email,
                })
            res.json({
                res: 'Excellent',
                message: 'Access correct',
                data: token,
            });
            
            } else {
            res.json({
                res: 'todo mal unhappy',
                menssage: 'Into the ELSE is an error',
                data: null,
                });
            }

        } catch (error) {
            res.json({
                res: 'todo mal unhappy',
                menssage: 'Into the Catch generate an error',
                data: error,
            });
        }
    },

validateToken: async (req: any, res: any) => {
    try {
      const token = req.params.token;
      const decodificado = await verificateToken(token);
      if (decodificado) {
        res.json({
          res: 'bien',
          message: 'token válido',
          datas: decodificado,
        });
      } else {
        res.json({
          res: 'mal',
          message: 'token no válido',
          datas: null,
        });
      }
    } catch (error) {
      res.json({
        res: 'mal',
        message: 'ocurrió un error al validar token',
        datas: error,
      });
    }
  }
};

export default userLoginController;