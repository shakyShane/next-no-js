/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: global
// ====================================================

export interface global_storeConfig {
  __typename: "StoreConfig";
  /**
   * Category URL Suffix.
   */
  category_url_suffix: string | null;
  /**
   * Product URL Suffix.
   */
  product_url_suffix: string | null;
}

export interface global_menu_children_children {
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

export interface global_menu_children {
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
  /**
   * Child categories tree.
   */
  children: (global_menu_children_children | null)[] | null;
}

export interface global_menu {
  __typename: "CategoryTree";
  /**
   * Child categories tree.
   */
  children: (global_menu_children | null)[] | null;
}

export interface global {
  /**
   * The store config query
   */
  storeConfig: global_storeConfig | null;
  /**
   * The category query searches for categories that match the criteria specified in the search and filter attributes.
   */
  menu: global_menu | null;
}

export interface globalVariables {
  id?: number | null;
}
