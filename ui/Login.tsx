import React, { useContext } from "react";
import { FormContext } from "../browser-components/Form";

export function Login() {
    const ctx = useContext(FormContext);
    return (
        <fieldset disabled={ctx.kind === "submitting"}>
            <pre>
                <code>{JSON.stringify(ctx, null, 2)}</code>
            </pre>
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                type="email"
                name="email"
                defaultValue={ctx.kind === "error" ? ctx.values["email"] : ""}
            />

            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" required />
            <p>
                <button type="submit">{ctx.kind === "submitting" ? "please wait..." : "Submit"}</button>
            </p>
        </fieldset>
    );
}
