import jwt from 'jsonwebtoken';


export function generateToken(payload: any) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'secret code', { expiresIn: '1h' }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

export function verificateToken(token: any) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secret code', (error: any, decodificado: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(decodificado);
      }
    });
  });
}