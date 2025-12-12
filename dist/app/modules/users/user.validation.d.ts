import z from "zod";
export declare const userValidation: {
    createTouristValidationSchema: z.ZodObject<{
        password: z.ZodString;
        tourist: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            address: z.ZodOptional<z.ZodString>;
            contactNumber: z.ZodString;
            gender: z.ZodEnum<{
                MALE: "MALE";
                FEMALE: "FEMALE";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    createGuideValidationSchema: z.ZodObject<{
        password: z.ZodString;
        guide: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            address: z.ZodOptional<z.ZodString>;
            contactNumber: z.ZodString;
            gender: z.ZodEnum<{
                MALE: "MALE";
                FEMALE: "FEMALE";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    createAdminValidationSchema: z.ZodObject<{
        password: z.ZodString;
        admin: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            address: z.ZodOptional<z.ZodString>;
            contactNumber: z.ZodString;
            gender: z.ZodEnum<{
                MALE: "MALE";
                FEMALE: "FEMALE";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=user.validation.d.ts.map