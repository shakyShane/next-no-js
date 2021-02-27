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

function Header() {
    return (
        <div>
            <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    start your 14-day free trial
                </a>
            </p>
        </div>
    );
}

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
                const errorLen = Object.keys(errors).length;
                return (
                    <Form action="/api/hello" method="POST">
                        <Wrap disabled={isSubmitting}>
                            <Header />
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <Label htmlFor="email">Email address:</Label>
                                    {errors["email"] ? (
                                        <p className="text-sm text-red-900 mb-2">{errors["email"]}</p>
                                    ) : null}
                                    <Field
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        className={inputClasses(Boolean(errors["email"]))}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Password:</Label>
                                    {errors["password"] ? (
                                        <p className="text-sm text-red-900 mb-2">{errors["password"]}</p>
                                    ) : null}
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className={inputClasses(Boolean(errors["password"]))}
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="disabled:opacity-80 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg
                                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    {isSubmitting ? "Please wait..." : "Sign in"}
                                </button>
                            </div>
                            {errorLen > 0 && (
                                <p className="font-sans text-sm bg-red-100 border-red-300 border-2 p-2 rounded text-red-900">
                                    Please check the errors above
                                </p>
                            )}
                        </Wrap>
                    </Form>
                );
            }}
        </Formik>
    );
}

function Wrap(props: PropsWithChildren<{ disabled: boolean }>) {
    return (
        <div className="flex items-center justify-center bg-white rounded shadow py-12 px-4 sm:px-6 lg:px-8">
            <fieldset className="max-w-md w-full space-y-8" disabled={props.disabled}>
                {props.children}
            </fieldset>
        </div>
    );
}

function inputClasses(error: boolean) {
    const original =
        "disabled:opacity-80 appearance-none relative block w-full rounded px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm";
    return original + (error ? " text-red-500 border-red-300" : "");
}

function Label(props: PropsWithChildren<any>) {
    const { children, ...rest } = props;
    return (
        <label className="text-sm block my-2" {...rest}>
            {props.children}
        </label>
    );
}

export default FormikForm;
