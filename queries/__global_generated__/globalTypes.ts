/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * The list of available currency codes
 */
export enum CurrencyEnum {
  AED = "AED",
  AFN = "AFN",
  ALL = "ALL",
  AMD = "AMD",
  ANG = "ANG",
  AOA = "AOA",
  ARS = "ARS",
  AUD = "AUD",
  AWG = "AWG",
  AZM = "AZM",
  AZN = "AZN",
  BAM = "BAM",
  BBD = "BBD",
  BDT = "BDT",
  BGN = "BGN",
  BHD = "BHD",
  BIF = "BIF",
  BMD = "BMD",
  BND = "BND",
  BOB = "BOB",
  BRL = "BRL",
  BSD = "BSD",
  BTN = "BTN",
  BUK = "BUK",
  BWP = "BWP",
  BYN = "BYN",
  BZD = "BZD",
  CAD = "CAD",
  CDF = "CDF",
  CHE = "CHE",
  CHF = "CHF",
  CHW = "CHW",
  CLP = "CLP",
  CNY = "CNY",
  COP = "COP",
  CRC = "CRC",
  CUP = "CUP",
  CVE = "CVE",
  CZK = "CZK",
  DJF = "DJF",
  DKK = "DKK",
  DOP = "DOP",
  DZD = "DZD",
  EEK = "EEK",
  EGP = "EGP",
  ERN = "ERN",
  ETB = "ETB",
  EUR = "EUR",
  FJD = "FJD",
  FKP = "FKP",
  GBP = "GBP",
  GEK = "GEK",
  GEL = "GEL",
  GHS = "GHS",
  GIP = "GIP",
  GMD = "GMD",
  GNF = "GNF",
  GQE = "GQE",
  GTQ = "GTQ",
  GYD = "GYD",
  HKD = "HKD",
  HNL = "HNL",
  HRK = "HRK",
  HTG = "HTG",
  HUF = "HUF",
  IDR = "IDR",
  ILS = "ILS",
  INR = "INR",
  IQD = "IQD",
  IRR = "IRR",
  ISK = "ISK",
  JMD = "JMD",
  JOD = "JOD",
  JPY = "JPY",
  KES = "KES",
  KGS = "KGS",
  KHR = "KHR",
  KMF = "KMF",
  KPW = "KPW",
  KRW = "KRW",
  KWD = "KWD",
  KYD = "KYD",
  KZT = "KZT",
  LAK = "LAK",
  LBP = "LBP",
  LKR = "LKR",
  LRD = "LRD",
  LSL = "LSL",
  LSM = "LSM",
  LTL = "LTL",
  LVL = "LVL",
  LYD = "LYD",
  MAD = "MAD",
  MDL = "MDL",
  MGA = "MGA",
  MKD = "MKD",
  MMK = "MMK",
  MNT = "MNT",
  MOP = "MOP",
  MRO = "MRO",
  MUR = "MUR",
  MVR = "MVR",
  MWK = "MWK",
  MXN = "MXN",
  MYR = "MYR",
  MZN = "MZN",
  NAD = "NAD",
  NGN = "NGN",
  NIC = "NIC",
  NOK = "NOK",
  NPR = "NPR",
  NZD = "NZD",
  OMR = "OMR",
  PAB = "PAB",
  PEN = "PEN",
  PGK = "PGK",
  PHP = "PHP",
  PKR = "PKR",
  PLN = "PLN",
  PYG = "PYG",
  QAR = "QAR",
  RHD = "RHD",
  ROL = "ROL",
  RON = "RON",
  RSD = "RSD",
  RUB = "RUB",
  RWF = "RWF",
  SAR = "SAR",
  SBD = "SBD",
  SCR = "SCR",
  SDG = "SDG",
  SEK = "SEK",
  SGD = "SGD",
  SHP = "SHP",
  SKK = "SKK",
  SLL = "SLL",
  SOS = "SOS",
  SRD = "SRD",
  STD = "STD",
  SVC = "SVC",
  SYP = "SYP",
  SZL = "SZL",
  THB = "THB",
  TJS = "TJS",
  TMM = "TMM",
  TND = "TND",
  TOP = "TOP",
  TRL = "TRL",
  TRY = "TRY",
  TTD = "TTD",
  TWD = "TWD",
  TZS = "TZS",
  UAH = "UAH",
  UGX = "UGX",
  USD = "USD",
  UYU = "UYU",
  UZS = "UZS",
  VEB = "VEB",
  VEF = "VEF",
  VND = "VND",
  VUV = "VUV",
  WST = "WST",
  XCD = "XCD",
  XOF = "XOF",
  XPF = "XPF",
  YER = "YER",
  YTL = "YTL",
  ZAR = "ZAR",
  ZMK = "ZMK",
  ZWD = "ZWD",
}

export interface CartItemInput {
  entered_options?: (EnteredOptionInput | null)[] | null;
  parent_sku?: string | null;
  quantity: number;
  selected_options?: (string | null)[] | null;
  sku: string;
}

export interface CustomizableOptionInput {
  id?: number | null;
  value_string: string;
}

/**
 * Defines a customer-entered option
 */
export interface EnteredOptionInput {
  uid: string;
  value: string;
}

export interface SimpleProductCartItemInput {
  customizable_options?: (CustomizableOptionInput | null)[] | null;
  data: CartItemInput;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
export {}
