import invariant from "tiny-invariant";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Link from "next/link";

import { initializeApollo } from "~/lib/apollo.ts";
import cmsQuery from "~/queries/getCmsPage.graphql";
import { cmsPage, cmsPage_cmsPage, cmsPageVariables } from "~/queries/__generated__/cmsPage";

export function Product(props: Result) {
    return (
        <div>
            <h1 className="text-4xl">{props.cms.title}</h1>
            {props.cms.content === "--home--" && (
                <div>
                    <p>homepage content here</p>
                    <p>
                        <Link locale={"default"} href="/venia-dresses.html?page=1">
                            <a className="underline hover:no-underline">Dresses</a>
                        </Link>
                    </p>
                </div>
            )}
            {props.cms.content !== "--home--" && <div dangerouslySetInnerHTML={{ __html: props.cms.content }} />}
        </div>
    );
}

type Result = {
    id: number;
    cms: cmsPage_cmsPage;
};

export const getServerSideProps: GetServerSideProps = async (context): Promise<GetServerSidePropsResult<Result>> => {
    const client = initializeApollo(null, context);
    invariant(context.query.id, "query.id missing for cms page");
    const res = await client.query<cmsPage, cmsPageVariables>({
        query: cmsQuery,
        variables: { id: Number(context.query.id) },
    });
    invariant(res.data?.cmsPage, "res.data.cmsPage missing");
    if (context.query.pathname === "/") {
        const cms: cmsPage_cmsPage = {
            __typename: "CmsPage",
            content: `--home--`,
            content_heading: null,
            meta_description: null,
            meta_keywords: null,
            meta_title: null,
            page_layout: null,
            title: "Homepage",
        };
        return { props: { id: Number(context.query.id), cms } };
    }
    return { props: { id: Number(context.query.id), cms: res.data.cmsPage } };
};

export default Product;

export const config = {
    unstable_runtimeJS: false,
};
