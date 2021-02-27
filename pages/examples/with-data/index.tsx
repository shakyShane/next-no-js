import React from "react";
import { BrowserComponent } from "~/modfed/BrowserComponent";
import { DemoBlock } from "~/ui/Type";
import { GetStaticProps } from "next";
import { Gallery } from "~/browser-components/Gallery";
import Post from "./_data.mdx";

type Props = {
    data: {
        images: string[];
    };
};

export default function Index(props: Props) {
    return (
        <>
            <Post />
            <DemoBlock>
                <BrowserComponent>
                    <Gallery {...props.data} />
                </BrowserComponent>
            </DemoBlock>
        </>
    );
}

export const config = {
    unstable_runtimeJS: false,
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        props: {
            data: {
                images: [
                    "https://source.unsplash.com/ZCHj_2lJP00/600x600",
                    "https://source.unsplash.com/2JcixB1Ky3I/600x600",
                    "https://source.unsplash.com/hxn2HjZHyQE/600x600",
                ],
            },
        },
    };
};
