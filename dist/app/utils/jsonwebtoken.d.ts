import jwt, { type Secret } from "jsonwebtoken";
interface IToken {
    email: string;
    role: string;
    secret: Secret;
    expiresIn: string;
}
export declare const jsonwebtoken: {
    generateToken: ({ email, role, secret, expiresIn }: IToken) => Promise<string>;
    verifyToken: (token: string, secret: Secret) => string | jwt.JwtPayload;
};
export {};
//# sourceMappingURL=jsonwebtoken.d.ts.map