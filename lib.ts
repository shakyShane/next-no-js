import Joi from "joi";

export type FieldError = {
    message: string;
    path: (string | number)[];
};

export function validate(values: Record<string, string>): FieldError[] {
    const authDataSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .lowercase()
            .required(),
        password: Joi.string().min(6).required().strict(),
    });
    const result = authDataSchema.validate(values);
    if (result.error) {
        return result.error.details.map((d) => {
            return {
                message: d.message,
                path: d.path,
            };
        });
    }

    return [];
}

export function validateObject(values): Record<string, string> {
    return obj(validate(values));
}

export function obj(errors: FieldError[]): Record<string, string> {
    const output = {};
    errors.forEach((e) => {
        output[e.path.join(".")] = e.message;
    });
    return output;
}
