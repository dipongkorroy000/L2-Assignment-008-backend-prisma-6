import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

const generateToken = async (payload: { email: string; role: string; secret: Secret; expireIn: string }) => {
  const token = await jwt.sign({ email: payload.email, role: payload.role }, payload.secret, {
    algorithm: "HS256",
    expiresIn: payload.expireIn,
  } as SignOptions);

  return token;
};

export default generateToken;
