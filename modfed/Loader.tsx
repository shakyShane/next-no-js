import { PropsWithChildren } from "react";

type LoaderProps = {
    modfedId: string;
    modfedType: "vanilla" | "preact";
};

export function Loader(props: PropsWithChildren<LoaderProps>) {
    return (
        <div data-modfed-id={props.modfedId} data-modfed-type={props.modfedType}>
            {props.children}
        </div>
    );
}
