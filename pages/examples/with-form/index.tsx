import { GetServerSideProps } from "next";
import Cookies from "cookies";
import { Form } from "~/browser-components/Form";
import { BrowserComponent } from "~/modfed/BrowserComponent";
import Page from "./_with_form_data.mdx";
import { DemoBlock } from "~/ui/Type";

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

export default function Index(props: Props) {
    const formProps = {
        kind: props.kind,
        values: props.kind === "login-error" ? props.values : {},
        errors: props.kind === "login-error" ? props.errors : [],
    };
    return (
        <div>
            <Page name={"shane"} />
            <aside>
                <DemoBlock>
                    <BrowserComponent>
                        <Form {...formProps} />
                    </BrowserComponent>
                </DemoBlock>
            </aside>
        </div>
    );
}

export const config = {
    unstable_runtimeJS: process.env.NODE_ENV === "development",
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
    if (req.cookies["error"]) {
        const cookies = new Cookies(req, res);
        cookies.set("error", null);
        const json = JSON.parse(Buffer.from(req.cookies["error"], "base64").toString());
        const { values, errors } = json;
        return {
            props: {
                kind: "login-error",
                values,
                errors,
            },
        };
    }
    return {
        props: {
            kind: "login",
        },
    };
};
