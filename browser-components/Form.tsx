import React, { PropsWithChildren, useCallback, useState } from "react";
import { Login } from "../ui/Login";
type FormError = {
    message: string;
    path: (string | number)[];
};
type FormStates =
    | {
          kind: "idle";
          values: Record<string, string>;
      }
    | {
          kind: "submitting";
          to: string;
      }
    | {
          kind: "redirecting";
          to: string;
      }
    | {
          kind: "error";
          values: Record<string, string>;
          errors: FormError[];
      };

export const FormContext = React.createContext<FormStates>({
    kind: "idle",
    values: {},
});

type Props = {
    values: Record<string, string>;
    errors: FormError[];
};

export function Form(props: PropsWithChildren<Props>) {
    const [state, setState] = useState<FormStates>({ kind: "idle", values: props.values });
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        async function send() {
            const r = await fetch(e.target.action + "?resp=json", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: { "Content-Type": "application/json" },
            });
            const resp = await r.json();
            switch (resp.kind) {
                case "error": {
                    const { values, errors } = resp;
                    setState({ kind: "error", values, errors });
                    break;
                }
                case "redirect": {
                    setState({ kind: "redirecting", to: "/account" });
                    break;
                }
                default: {
                    setState({ kind: "idle", values: {} });
                    break;
                }
            }
        }
        setState({
            kind: "submitting",
            to: e.target.action,
        });
        send().catch((e) => {
            setState({
                kind: "error",
                values: { email, password },
                errors: [{ path: ["."], message: e.message }],
            });
        });
    }, []);
    return (
        <FormContext.Provider value={state}>
            <form method="POST" action="/api/hello" onSubmit={onSubmit}>
                <Login />
            </form>
        </FormContext.Provider>
    );
}
export default Form;
