import jwt, {type Secret, type SignOptions} from "jsonwebtoken";

interface IToken {
  email: string;
  role: string;
  secret: Secret;
  expiresIn: string;
}

const generateToken = async ({email, role, secret, expiresIn}: IToken) => {
  return jwt.sign({email: email, role: role}, secret, {algorithm: "HS256", expiresIn: expiresIn} as SignOptions);
};

const verifyToken = (token: string, secret: Secret) => jwt.verify(token, secret);

export const jsonwebtoken = {generateToken, verifyToken};