/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: productDetail
// ====================================================

export interface productDetail_productDetail_items_price_range_minimum_price_regular_price {
  __typename: "Money";
  /**
   * A number expressing a monetary value
   */
  value: number | null;
}

export interface productDetail_productDetail_items_price_range_minimum_price {
  __typename: "ProductPrice";
  /**
   * The regular price of the product.
   */
  regular_price: productDetail_productDetail_items_price_range_minimum_price_regular_price;
}

export interface productDetail_productDetail_items_price_range {
  __typename: "PriceRange";
  /**
   * The lowest possible price for the product.
   */
  minimum_price: productDetail_productDetail_items_price_range_minimum_price;
}

export interface productDetail_productDetail_items_image {
  __typename: "ProductImage";
  /**
   * The label of the product image or video.
   */
  label: string | null;
  /**
   * The URL of the product image or video.
   */
  url: string | null;
}

export interface productDetail_productDetail_items_small_image {
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

export interface productDetail_productDetail_items_media_gallery {
  __typename: "ProductImage" | "ProductVideo";
  /**
   * The label of the product image or video.
   */
  label: string | null;
  /**
   * The URL of the product image or video.
   */
  url: string | null;
}

export interface productDetail_productDetail_items_short_description {
  __typename: "ComplexTextValue";
  /**
   * HTML format
   */
  html: string;
}

export interface productDetail_productDetail_items_description {
  __typename: "ComplexTextValue";
  /**
   * HTML format
   */
  html: string;
}

export interface productDetail_productDetail_items {
  __typename: "VirtualProduct" | "SimpleProduct" | "DownloadableProduct" | "BundleProduct" | "GroupedProduct" | "ConfigurableProduct" | "GiftCardProduct";
  /**
   * A number or code assigned to a product to identify the product, options, price, and manufacturer.
   */
  sku: string | null;
  /**
   * The ID number assigned to the product.
   */
  id: number | null;
  /**
   * The product name. Customers use this name to identify the product.
   */
  name: string | null;
  /**
   * The discounted price of the product.
   */
  special_price: number | null;
  /**
   * A PriceRange object, indicating the range of prices for the product
   */
  price_range: productDetail_productDetail_items_price_range;
  /**
   * The relative path to the main image on the product page.
   */
  image: productDetail_productDetail_items_image | null;
  /**
   * The relative path to the small image, which is used on catalog pages.
   */
  small_image: productDetail_productDetail_items_small_image | null;
  /**
   * An array of Media Gallery objects.
   */
  media_gallery: (productDetail_productDetail_items_media_gallery | null)[] | null;
  /**
   * A short description of the product. Its use depends on the theme.
   */
  short_description: productDetail_productDetail_items_short_description | null;
  /**
   * Detailed information about the product. The value can include simple HTML tags.
   */
  description: productDetail_productDetail_items_description | null;
  /**
   * A string that is displayed in the title bar and tab of the browser and in search results lists.
   */
  meta_title: string | null;
  /**
   * A comma-separated list of keywords that are visible only to search engines.
   */
  meta_keyword: string | null;
  /**
   * A brief overview of the product for search results listings, maximum 255 characters.
   */
  meta_description: string | null;
  /**
   * The part of the URL that identifies the product
   */
  url_key: string | null;
  url_path: string | null;
}

export interface productDetail_productDetail {
  __typename: "Products";
  /**
   * An array of products that match the specified search criteria.
   */
  items: (productDetail_productDetail_items | null)[] | null;
}

export interface productDetail {
  /**
   * The products query searches for products that match the criteria specified in the search and filter attributes.
   */
  productDetail: productDetail_productDetail | null;
}

export interface productDetailVariables {
  urlKey?: string | null;
}
