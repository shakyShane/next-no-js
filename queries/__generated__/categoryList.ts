/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: categoryList
// ====================================================

export interface categoryList_categoryList_breadcrumbs {
    __typename: "Breadcrumb";
    /**
     * Category level.
     */
    category_level: number | null;
    /**
     * Category name.
     */
    category_name: string | null;
    /**
     * The unique ID for a `Breadcrumb` object.
     */
    category_uid: string;
    /**
     * Category URL key.
     */
    category_url_key: string | null;
    /**
     * Category URL path.
     */
    category_url_path: string | null;
    /**
     * Category ID.
     */
    category_id: number | null;
}

export interface categoryList_categoryList_products_items_image {
    __typename: "ProductImage";
    /**
     * The URL of the product image or video.
     */
    url: string | null;
    /**
     * The label of the product image or video.
     */
    label: string | null;
}

export interface categoryList_categoryList_products_items_price_range_minimum_price_regular_price {
    __typename: "Money";
    /**
     * A number expressing a monetary value
     */
    value: number | null;
}

export interface categoryList_categoryList_products_items_price_range_minimum_price {
    __typename: "ProductPrice";
    /**
     * The regular price of the product.
     */
    regular_price: categoryList_categoryList_products_items_price_range_minimum_price_regular_price;
}

export interface categoryList_categoryList_products_items_price_range {
    __typename: "PriceRange";
    /**
     * The lowest possible price for the product.
     */
    minimum_price: categoryList_categoryList_products_items_price_range_minimum_price;
}

export interface categoryList_categoryList_products_items {
    __typename:
        | "VirtualProduct"
        | "SimpleProduct"
        | "DownloadableProduct"
        | "BundleProduct"
        | "GroupedProduct"
        | "ConfigurableProduct"
        | "GiftCardProduct";
    /**
     * The product name. Customers use this name to identify the product.
     */
    name: string | null;
    /**
     * A number or code assigned to a product to identify the product, options, price, and manufacturer.
     */
    sku: string | null;
    /**
     * The relative path to the main image on the product page.
     */
    image: categoryList_categoryList_products_items_image | null;
    /**
     * A PriceRange object, indicating the range of prices for the product
     */
    price_range: categoryList_categoryList_products_items_price_range;
}

export interface categoryList_categoryList_products {
    __typename: "CategoryProducts";
    /**
     * An array of products that are assigned to the category.
     */
    items: (categoryList_categoryList_products_items | null)[] | null;
}

export interface categoryList_categoryList_children {
    __typename: "CategoryTree";
    /**
     * The display name of the category.
     */
    name: string | null;
    /**
     * The url path assigned to the category.
     */
    url_path: string | null;
    /**
     * The url key assigned to the category.
     */
    url_key: string | null;
    image: string | null;
    /**
     * An ID that uniquely identifies the category.
     */
    id: number | null;
}

export interface categoryList_categoryList {
    __typename: "CategoryTree";
    /**
     * Breadcrumbs, parent categories info.
     */
    breadcrumbs: (categoryList_categoryList_breadcrumbs | null)[] | null;
    /**
     * The display name of the category.
     */
    name: string | null;
    /**
     * An optional description of the category.
     */
    description: string | null;
    image: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    /**
     * The list of products assigned to the category.
     */
    products: categoryList_categoryList_products | null;
    /**
     * Child categories tree.
     */
    children: (categoryList_categoryList_children | null)[] | null;
}

export interface categoryList {
    /**
     * The category query searches for categories that match the criteria specified in the search and filter attributes.
     */
    categoryList: categoryList_categoryList | null;
}

export interface categoryListVariables {
    id?: number | null;
}
