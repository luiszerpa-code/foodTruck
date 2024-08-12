const jwt = require('jsonwebtoken');



export function generateToken(payload) {
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

export function verificateToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secret code', (error, decodificado) => {
      if (error) {
        reject(error);
      } else {
        resolve(decodificado);
      }
    });
  });
}