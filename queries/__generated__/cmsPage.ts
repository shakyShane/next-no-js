/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: cmsPage
// ====================================================

export interface cmsPage_cmsPage {
    __typename: "CmsPage";
    /**
     * CMS page title
     */
    title: string | null;
    /**
     * CMS page content
     */
    content: string | null;
    /**
     * CMS page content heading
     */
    content_heading: string | null;
    /**
     * CMS page meta title
     */
    meta_title: string | null;
    /**
     * CMS page meta description
     */
    meta_description: string | null;
    /**
     * CMS page meta keywords
     */
    meta_keywords: string | null;
    /**
     * CMS page content heading
     */
    page_layout: string | null;
}

export interface cmsPage {
    /**
     * The CMS page query returns information about a CMS page
     */
    cmsPage: cmsPage_cmsPage | null;
}

export interface cmsPageVariables {
    id: number;
}
