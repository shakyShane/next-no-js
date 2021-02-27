import { GetServerSideProps } from "next";
import Cookies from "cookies";
import FormikForm from "~/browser-components/FormikForm";
import { FieldError } from "~/lib";
import { BrowserComponent } from "~/modfed/BrowserComponent";
import Page from "./_with_formik_page.mdx";
import Md from "./_md_stress.mdx";

type Props =
    | {
          kind: "login-error";
          values: Record<string, string>;
          errors: FieldError[];
      }
    | {
          kind: "login";
      };

export default function WithForm(props: Props) {
    const formProps = {
        kind: props.kind,
        values: props.kind === "login-error" ? props.values : {},
        errors: props.kind === "login-error" ? props.errors : [],
    };
    return (
        <div>
            <Page />
            <div className="my-4">
                <BrowserComponent>
                    <FormikForm {...formProps} />
                </BrowserComponent>
            </div>
            <div className="py-4">
                <hr />
                <Md />
            </div>
        </div>
    );
}

export const config = {
    unstable_runtimeJS: false,
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
