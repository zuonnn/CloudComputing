import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKey: 'zuonnn',
            jwtFromRequest: (req: Request) => {
                let token = null;
                if (req && req.cookies) {
                    token = req.cookies['access_token'];
                }
                return token;
            },
            ignoreExpiration: false
        });
    }

    validate(payload: any) {
        return {
            id: payload.id,
            role: payload.role
        };
    }
}
