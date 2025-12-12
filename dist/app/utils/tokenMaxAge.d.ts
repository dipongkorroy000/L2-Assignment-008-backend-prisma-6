export default function tokenDateValidate({ accessTokenExpiresIn, refreshTokenExpiresIn }: {
    accessTokenExpiresIn: string;
    refreshTokenExpiresIn: string;
}): {
    accessTokenMaxAge: number;
    refreshTokenMaxAge: number;
};
//# sourceMappingURL=tokenMaxAge.d.ts.map