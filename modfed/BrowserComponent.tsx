import React, { Children, PropsWithChildren, HTMLAttributes, useState, useEffect } from "react";

type LoaderProps = {
    turboPermanent?: boolean;
    kind?: "vanilla" | "preact";
    mdxType?: string;
    id?: string;
    originalType?: any;
};

export function BrowserComponent(props: PropsWithChildren<LoaderProps & HTMLAttributes<any>>) {
    const { kind = "preact", turboPermanent = undefined, children, id, ...otherDivAttrs } = props;
    return Children.map(props.children, (child) => {
        if (!React.isValidElement(child)) {
            throw new Error("cannot work with none-valid child");
        }
        // @ts-ignore
        let componentName = child.type.name || child.type.displayName;
        // handle MDX wrappers
        if (child.props.mdxType && child.props.originalType) {
            componentName = child.props.originalType.name || child.props.originalType.displayName;
        }
        if (!componentName) {
            throw new Error("cannot infer name, please use displayName on the exported component");
        }
        const { children, mdxType, originalType, ...rest } = child.props;
        const hasData = Object.keys(rest).length > 0;
        const elementId = id || "modfed-id-" + componentName;

        const output = (
            <div
                {...otherDivAttrs}
                id={elementId}
                data-modfed-kind={kind}
                data-modfed-component={kind === "preact" && componentName}
                data-turbo-permanent={turboPermanent}
            >
                {child}
            </div>
        );
        if (!hasData) {
            return output;
        }

        let dataAsString = "";
        try {
            dataAsString = JSON.stringify(rest);
        } catch (e) {
            throw new Error("could not serialise props");
        }

        return (
            <>
                <script
                    type={"text/json"}
                    data-modfed-data={elementId}
                    dangerouslySetInnerHTML={{
                        __html: dataAsString.replace(/</g, "\\u003c"),
                    }}
                />
                <div
                    {...otherDivAttrs}
                    id={elementId}
                    data-modfed-kind={kind}
                    data-modfed-component={kind === "preact" && componentName}
                    data-turbo-permanent={turboPermanent}
                >
                    {props.children}
                </div>
            </>
        );
    }) as any;
}
