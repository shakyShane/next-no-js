import { PropsWithChildren } from "react";

type LoaderProps =
    | {
          modfedType: "vanilla";
          modfedData?: any;
      }
    | {
          modfedType: "preact";
          modfedComponent: string;
          modfedData?: any;
      };

export function Loader(props: PropsWithChildren<LoaderProps>) {
    return (
        <>
            <script
                type={"text/json"}
                dangerouslySetInnerHTML={{ __html: JSON.stringify(props.modfedData || {}).replace(/</g, "\\u003c") }}
                data-modfed-data
            />
            <div
                data-modfed-type={props.modfedType}
                data-modfed-component={props.modfedType === "preact" && props.modfedComponent}
            >
                {props.children}
            </div>
        </>
    );
}
