// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Joi from "joi";
import Cookies from "cookies";

type PostError = {
    message: string;
    path: (string | number)[];
};

export default (req, res) => {
    switch (req.method) {
        case "POST": {
            const { email } = req.body;
            if (email === "dup@example.com") {
                const errors: PostError[] = [
                    {
                        message: "This email already exists",
                        path: ["email"],
                    },
                ];
                return delay(() => error(req, res, errors, { email }));
            }
            const authDataSchema = Joi.object({
                email: Joi.string().email().lowercase().required(),
                password: Joi.string().min(6).required().strict(),
            });
            const result = authDataSchema.validate(req.body);
            if (result.error) {
                const errors = result.error.details.map((d) => {
                    return {
                        message: d.message,
                        path: d.path,
                    };
                });
                return delay(() => error(req, res, errors, { email }));
            }
            return delay(() => redirect(req, res, "/account"));
        }
        default: {
            return delay(() => redirect(req, res, "/"));
        }
    }
};

function error(req, res, errors: PostError[], values: Record<string, string>) {
    const jsonResp = req.query.resp === "json";
    const json = { values, errors };
    if (jsonResp) {
        return res.status(400).json({ kind: "error", values, errors });
    }
    try {
        const cookies = new Cookies(req, res);
        cookies.set("error", Buffer.from(JSON.stringify(json)).toString("base64"), { httpOnly: true });
    } catch (e) {
        console.error("could not set cookie", e);
    }
    return redirect(req, res, req.headers.referer || "/");
}

function redirect(req, res, to) {
    const jsonResp = req.query.resp === "json";
    if (jsonResp) {
        return res.status(200).json({ kind: "redirect", to });
    }
    res.setHeader("location", to);
    res.statusCode = 302;
    return res.end();
}

function delay(fn) {
    setTimeout(fn, 1000);
}
