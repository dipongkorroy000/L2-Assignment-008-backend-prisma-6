import type {NextFunction, Request, Response} from "express";
import status from "http-status";
import ServerError from "../errors/ServerError";

import type {JwtPayload} from "jsonwebtoken";
import config from "../../config";
import {jsonwebtoken} from "../utils/jsonwebtoken";

const auth = (...roles: string[]) => {
  return async (req: Request & {token?: any}, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken || req.headers.accessToken;

      if (!accessToken) throw new ServerError(status.UNAUTHORIZED, "You are not authorized!");

      const token = jsonwebtoken.verifyToken(accessToken, config.JWT.ACCESS_TOKEN_SECRET) as JwtPayload;
      req.token = token;

      if (roles.length && !roles.includes(token.role)) throw new ServerError(status.UNAUTHORIZED, "You are not authorized user!");

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
