/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: category
// ====================================================

export interface category_category_breadcrumbs {
    __typename: "Breadcrumb";
    /**
     * Category ID.
     */
    category_id: number | null;
    /**
     * Category level.
     */
    category_level: number | null;
    /**
     * Category name.
     */
    category_name: string | null;
    /**
     * Category URL key.
     */
    category_url_key: string | null;
    /**
     * Category URL path.
     */
    category_url_path: string | null;
}

export interface category_category {
    __typename: "CategoryTree";
    /**
     * An optional description of the category.
     */
    description: string | null;
    /**
     * The display name of the category.
     */
    name: string | null;
    /**
     * The url key assigned to the category.
     */
    url_key: string | null;
    /**
     * The url path assigned to the category.
     */
    url_path: string | null;
    /**
     * Breadcrumbs, parent categories info.
     */
    breadcrumbs: (category_category_breadcrumbs | null)[] | null;
    meta_description: string | null;
    meta_title: string | null;
    image: string | null;
    meta_keywords: string | null;
    /**
     * An ID that uniquely identifies the category.
     */
    id: number | null;
}

export interface category {
    /**
     * The category query searches for categories that match the criteria specified in the search and filter attributes.
     */
    category: category_category | null;
}

export interface categoryVariables {
    id?: number | null;
}
