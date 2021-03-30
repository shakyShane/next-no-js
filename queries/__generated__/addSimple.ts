/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SimpleProductCartItemInput, CurrencyEnum } from "./../__global_generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addSimple
// ====================================================

export interface addSimple_addSimpleProductsToCart_cart_items_product {
  __typename: "VirtualProduct" | "SimpleProduct" | "DownloadableProduct" | "BundleProduct" | "GroupedProduct" | "ConfigurableProduct" | "GiftCardProduct";
  /**
   * A number or code assigned to a product to identify the product, options, price, and manufacturer.
   */
  sku: string | null;
}

export interface addSimple_addSimpleProductsToCart_cart_items_prices_row_total_including_tax {
  __typename: "Money";
  /**
   * A number expressing a monetary value
   */
  value: number | null;
  /**
   * A three-letter currency code, such as USD or EUR
   */
  currency: CurrencyEnum | null;
}

export interface addSimple_addSimpleProductsToCart_cart_items_prices {
  __typename: "CartItemPrices";
  row_total_including_tax: addSimple_addSimpleProductsToCart_cart_items_prices_row_total_including_tax;
}

export interface addSimple_addSimpleProductsToCart_cart_items {
  __typename: "SimpleCartItem" | "VirtualCartItem" | "DownloadableCartItem" | "ConfigurableCartItem" | "BundleCartItem" | "GiftCardCartItem";
  /**
   * The unique ID for a `CartItemInterface` object
   */
  uid: string;
  product: addSimple_addSimpleProductsToCart_cart_items_product;
  quantity: number;
  prices: addSimple_addSimpleProductsToCart_cart_items_prices | null;
}

export interface addSimple_addSimpleProductsToCart_cart {
  __typename: "Cart";
  items: (addSimple_addSimpleProductsToCart_cart_items | null)[] | null;
}

export interface addSimple_addSimpleProductsToCart {
  __typename: "AddSimpleProductsToCartOutput";
  cart: addSimple_addSimpleProductsToCart_cart;
}

export interface addSimple {
  addSimpleProductsToCart: addSimple_addSimpleProductsToCart | null;
}

export interface addSimpleVariables {
  id: string;
  items: (SimpleProductCartItemInput | null)[];
}
