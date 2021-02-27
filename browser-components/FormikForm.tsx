import React, { ButtonHTMLAttributes, PropsWithChildren, useState } from "react";
import { Formik, Field, Form, FormikErrors, FormikValues } from "formik";
import { FieldError } from "~/lib";

const API = "/api/hello";

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
            <Wrap>
                <Header title="Thanks">
                    <div className="pt-4">
                        <Button>Reset</Button>
                    </div>
                </Header>
            </Wrap>
        );
    }
    return (
        <Formik
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            initialValues={initial}
            initialErrors={props.kind === "login-error" ? obj(props.errors) : {}}
            onSubmit={async (values, formikHelpers) => {
                const resp = await fetch(API, {
                    method: "POST",
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                    }),
                    headers: { "Content-Type": "application/json" },
                });
                const json = await resp.json();
                switch (json.kind) {
                    case "redirect": {
                        return setSuccess(true);
                    }
                    case "error": {
                        return formikHelpers.setErrors(obj(json.errors));
                    }
                    default: {
                        console.log("default handler", json);
                    }
                }
            }}
        >
            {({ isSubmitting, errors }) => {
                const errorLen = Object.keys(errors).length;
                return (
                    <Form action={API} method="POST">
                        <Wrap>
                            <fieldset className="max-w-md w-full space-y-8" disabled={isSubmitting}>
                                <Header title={"Sign in to your account"}>
                                    <p className="mt-2 text-center text-gray-500">
                                        Without JavaScript, this form will post/redirect/validate on the server
                                    </p>
                                    <p className="mt-2 text-center text-sm text-indigo-500">
                                        If JavaScript is enabled however, this form will validate & submit inline.
                                    </p>
                                </Header>
                                <div className="rounded-md shadow-sm">
                                    <Email errors={errors} />
                                    <Password errors={errors} />
                                </div>
                                <div>
                                    <Submit submitting={isSubmitting} />
                                </div>
                                {errorLen > 0 && (
                                    <p className="font-sans text-sm bg-red-100 border-red-300 border-2 p-2 rounded text-red-900">
                                        Please check the errors above
                                    </p>
                                )}
                            </fieldset>
                        </Wrap>
                    </Form>
                );
            }}
        </Formik>
    );
}

function Header(props: PropsWithChildren<{ title: string }>) {
    return (
        <div>
            <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{props.title}</h2>
            {props.children}
        </div>
    );
}

function Wrap(props: PropsWithChildren<any>) {
    return (
        <div className="flex items-center justify-center bg-white rounded shadow py-12 px-4 sm:px-6 lg:px-8">
            {props.children}
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

function Button(props: PropsWithChildren<ButtonHTMLAttributes<any>>) {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className="disabled:opacity-80 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {props.children}
        </button>
    );
}

function Email(props: { errors: FormikErrors<FormikValues> }) {
    return (
        <div>
            <Label htmlFor="email">Email address:</Label>
            {props.errors["email"] ? <p className="text-sm text-red-900 mb-2">{props.errors["email"]}</p> : null}
            <Field
                id="email"
                type="email"
                name="email"
                placeholder="Email address"
                className={inputClasses(Boolean(props.errors["email"]))}
                required
            />
        </div>
    );
}

function Password(props: { errors: FormikErrors<FormikValues> }) {
    return (
        <div>
            <Label htmlFor="email">Password:</Label>
            {props.errors["password"] ? <p className="text-sm text-red-900 mb-2">{props.errors["password"]}</p> : null}
            <Field
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={6}
                className={inputClasses(Boolean(props.errors["password"]))}
                placeholder="Password"
            />
        </div>
    );
}

function Submit(props: { submitting: boolean }) {
    return (
        <Button type={"submit"}>
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
            {props.submitting ? "Please wait..." : "Sign in"}
        </Button>
    );
}

export default FormikForm;

export function obj(errors: FieldError[]): Record<string, string> {
    const output = {};
    errors.forEach((e) => {
        output[e.path.join(".")] = e.message;
    });
    return output;
}
