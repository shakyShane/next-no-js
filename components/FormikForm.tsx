import React, { PropsWithChildren, useState } from "react";
import { Formik, Field, Form } from "formik";
import { obj, validateObject } from "../lib";

type FormError = {
    message: string;
    path: (string | number)[];
};

type Props =
    | {
          kind: "login-error";
          values: Record<string, string>;
          errors: FormError[];
      }
    | {
          kind: "login";
      };

export function FormikForm(props: PropsWithChildren<Props>) {
    const [success, setSuccess] = useState(false);
    const initial = {
        email: props.kind === "login-error" ? props.values.email ?? "" : "",
        password: "",
    };
    if (success) {
        return (
            <div>
                <p>Thank you, we're sending to your account...</p>
                <p>
                    <button type="button" onClick={() => setSuccess(false)}>
                        Reset
                    </button>
                </p>
            </div>
        );
    }
    return (
        <Formik
            validate={validateObject}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            initialValues={initial}
            initialErrors={props.kind === "login-error" ? obj(props.errors) : {}}
            onSubmit={async (values, formikHelpers) => {
                const r = await fetch("/api/hello?resp=json", {
                    method: "POST",
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                    }),
                    headers: { "Content-Type": "application/json" },
                });
                const resp = await r.json();
                switch (resp.kind) {
                    case "redirect": {
                        return setSuccess(true);
                    }
                    case "error": {
                        return formikHelpers.setErrors(obj(resp.errors));
                    }
                    default: {
                        console.log("default handler", resp);
                    }
                }
            }}
        >
            {({ isSubmitting, errors }) => {
                return (
                    <Form action="/api/hello" method="POST">
                        <fieldset disabled={isSubmitting}>
                            <pre>
                                <code>Errors: {JSON.stringify(errors, null, 2)}</code>
                            </pre>
                            <label htmlFor="email">Email:</label>
                            <Field id="email" type="email" name="email" />

                            <label htmlFor="password">Password:</label>
                            <Field id="password" type="password" name="password" required />
                            <p>
                                <button type="submit">{isSubmitting ? "please wait..." : "Submit"}</button>
                            </p>
                        </fieldset>
                    </Form>
                );
            }}
        </Formik>
    );
}
export default FormikForm;
