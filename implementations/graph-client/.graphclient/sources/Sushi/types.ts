// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace SushiTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Bundle = {
  id: Scalars['ID'];
  ethPrice: Scalars['BigDecimal'];
};

export type Bundle_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  ethPrice?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_not?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_gt?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_lt?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_gte?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_lte?: InputMaybe<Scalars['BigDecimal']>;
  ethPrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  ethPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Bundle_orderBy =
  | 'id'
  | 'ethPrice';

export type Burn = {
  id: Scalars['ID'];
  transaction: Transaction;
  timestamp: Scalars['BigInt'];
  pair: Pair;
  liquidity: Scalars['BigDecimal'];
  sender?: Maybe<Scalars['Bytes']>;
  amount0?: Maybe<Scalars['BigDecimal']>;
  amount1?: Maybe<Scalars['BigDecimal']>;
  to?: Maybe<Scalars['Bytes']>;
  logIndex?: Maybe<Scalars['BigInt']>;
  amountUSD?: Maybe<Scalars['BigDecimal']>;
  complete: Scalars['Boolean'];
  feeTo?: Maybe<Scalars['Bytes']>;
  feeLiquidity?: Maybe<Scalars['BigDecimal']>;
};

export type Burn_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_?: InputMaybe<Pair_filter>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount0?: InputMaybe<Scalars['BigDecimal']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  complete?: InputMaybe<Scalars['Boolean']>;
  complete_not?: InputMaybe<Scalars['Boolean']>;
  complete_in?: InputMaybe<Array<Scalars['Boolean']>>;
  complete_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  feeTo?: InputMaybe<Scalars['Bytes']>;
  feeTo_not?: InputMaybe<Scalars['Bytes']>;
  feeTo_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeTo_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeTo_contains?: InputMaybe<Scalars['Bytes']>;
  feeTo_not_contains?: InputMaybe<Scalars['Bytes']>;
  feeLiquidity?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Burn_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'pair'
  | 'liquidity'
  | 'sender'
  | 'amount0'
  | 'amount1'
  | 'to'
  | 'logIndex'
  | 'amountUSD'
  | 'complete'
  | 'feeTo'
  | 'feeLiquidity';

export type DayData = {
  id: Scalars['ID'];
  date: Scalars['Int'];
  factory: Factory;
  volumeETH: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
  untrackedVolume: Scalars['BigDecimal'];
  liquidityETH: Scalars['BigDecimal'];
  liquidityUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
};

export type DayData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  factory?: InputMaybe<Scalars['String']>;
  factory_not?: InputMaybe<Scalars['String']>;
  factory_gt?: InputMaybe<Scalars['String']>;
  factory_lt?: InputMaybe<Scalars['String']>;
  factory_gte?: InputMaybe<Scalars['String']>;
  factory_lte?: InputMaybe<Scalars['String']>;
  factory_in?: InputMaybe<Array<Scalars['String']>>;
  factory_not_in?: InputMaybe<Array<Scalars['String']>>;
  factory_contains?: InputMaybe<Scalars['String']>;
  factory_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_not_contains?: InputMaybe<Scalars['String']>;
  factory_not_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_starts_with?: InputMaybe<Scalars['String']>;
  factory_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_starts_with?: InputMaybe<Scalars['String']>;
  factory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_ends_with?: InputMaybe<Scalars['String']>;
  factory_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']>;
  factory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_?: InputMaybe<Factory_filter>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolume?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type DayData_orderBy =
  | 'id'
  | 'date'
  | 'factory'
  | 'volumeETH'
  | 'volumeUSD'
  | 'untrackedVolume'
  | 'liquidityETH'
  | 'liquidityUSD'
  | 'txCount';

export type Factory = {
  id: Scalars['ID'];
  pairCount: Scalars['BigInt'];
  volumeUSD: Scalars['BigDecimal'];
  volumeETH: Scalars['BigDecimal'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
  liquidityUSD: Scalars['BigDecimal'];
  liquidityETH: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  tokenCount: Scalars['BigInt'];
  userCount: Scalars['BigInt'];
  pairs: Array<Pair>;
  tokens: Array<Token>;
  hourData: Array<HourData>;
  dayData: Array<DayData>;
};


export type FactorypairsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pair_filter>;
};


export type FactorytokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
};


export type FactoryhourDataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<HourData_filter>;
};


export type FactorydayDataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DayData_filter>;
};

export type Factory_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pairCount?: InputMaybe<Scalars['BigInt']>;
  pairCount_not?: InputMaybe<Scalars['BigInt']>;
  pairCount_gt?: InputMaybe<Scalars['BigInt']>;
  pairCount_lt?: InputMaybe<Scalars['BigInt']>;
  pairCount_gte?: InputMaybe<Scalars['BigInt']>;
  pairCount_lte?: InputMaybe<Scalars['BigInt']>;
  pairCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pairCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenCount?: InputMaybe<Scalars['BigInt']>;
  tokenCount_not?: InputMaybe<Scalars['BigInt']>;
  tokenCount_gt?: InputMaybe<Scalars['BigInt']>;
  tokenCount_lt?: InputMaybe<Scalars['BigInt']>;
  tokenCount_gte?: InputMaybe<Scalars['BigInt']>;
  tokenCount_lte?: InputMaybe<Scalars['BigInt']>;
  tokenCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  userCount?: InputMaybe<Scalars['BigInt']>;
  userCount_not?: InputMaybe<Scalars['BigInt']>;
  userCount_gt?: InputMaybe<Scalars['BigInt']>;
  userCount_lt?: InputMaybe<Scalars['BigInt']>;
  userCount_gte?: InputMaybe<Scalars['BigInt']>;
  userCount_lte?: InputMaybe<Scalars['BigInt']>;
  userCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  userCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pairs_?: InputMaybe<Pair_filter>;
  tokens_?: InputMaybe<Token_filter>;
  hourData_?: InputMaybe<HourData_filter>;
  dayData_?: InputMaybe<DayData_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Factory_orderBy =
  | 'id'
  | 'pairCount'
  | 'volumeUSD'
  | 'volumeETH'
  | 'untrackedVolumeUSD'
  | 'liquidityUSD'
  | 'liquidityETH'
  | 'txCount'
  | 'tokenCount'
  | 'userCount'
  | 'pairs'
  | 'tokens'
  | 'hourData'
  | 'dayData';

export type HourData = {
  id: Scalars['ID'];
  date: Scalars['Int'];
  factory: Factory;
  volumeETH: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
  untrackedVolume: Scalars['BigDecimal'];
  liquidityETH: Scalars['BigDecimal'];
  liquidityUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
};

export type HourData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  factory?: InputMaybe<Scalars['String']>;
  factory_not?: InputMaybe<Scalars['String']>;
  factory_gt?: InputMaybe<Scalars['String']>;
  factory_lt?: InputMaybe<Scalars['String']>;
  factory_gte?: InputMaybe<Scalars['String']>;
  factory_lte?: InputMaybe<Scalars['String']>;
  factory_in?: InputMaybe<Array<Scalars['String']>>;
  factory_not_in?: InputMaybe<Array<Scalars['String']>>;
  factory_contains?: InputMaybe<Scalars['String']>;
  factory_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_not_contains?: InputMaybe<Scalars['String']>;
  factory_not_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_starts_with?: InputMaybe<Scalars['String']>;
  factory_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_starts_with?: InputMaybe<Scalars['String']>;
  factory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_ends_with?: InputMaybe<Scalars['String']>;
  factory_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']>;
  factory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_?: InputMaybe<Factory_filter>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolume?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type HourData_orderBy =
  | 'id'
  | 'date'
  | 'factory'
  | 'volumeETH'
  | 'volumeUSD'
  | 'untrackedVolume'
  | 'liquidityETH'
  | 'liquidityUSD'
  | 'txCount';

export type LiquidityPosition = {
  id: Scalars['ID'];
  user: User;
  pair: Pair;
  liquidityTokenBalance: Scalars['BigDecimal'];
  snapshots: Array<Maybe<LiquidityPositionSnapshot>>;
  block: Scalars['Int'];
  timestamp: Scalars['Int'];
};


export type LiquidityPositionsnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPositionSnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPositionSnapshot_filter>;
};

export type LiquidityPositionSnapshot = {
  id: Scalars['ID'];
  liquidityPosition: LiquidityPosition;
  timestamp: Scalars['Int'];
  block: Scalars['Int'];
  user: User;
  pair: Pair;
  token0PriceUSD: Scalars['BigDecimal'];
  token1PriceUSD: Scalars['BigDecimal'];
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  liquidityTokenTotalSupply: Scalars['BigDecimal'];
  liquidityTokenBalance: Scalars['BigDecimal'];
};

export type LiquidityPositionSnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidityPosition?: InputMaybe<Scalars['String']>;
  liquidityPosition_not?: InputMaybe<Scalars['String']>;
  liquidityPosition_gt?: InputMaybe<Scalars['String']>;
  liquidityPosition_lt?: InputMaybe<Scalars['String']>;
  liquidityPosition_gte?: InputMaybe<Scalars['String']>;
  liquidityPosition_lte?: InputMaybe<Scalars['String']>;
  liquidityPosition_in?: InputMaybe<Array<Scalars['String']>>;
  liquidityPosition_not_in?: InputMaybe<Array<Scalars['String']>>;
  liquidityPosition_contains?: InputMaybe<Scalars['String']>;
  liquidityPosition_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_contains?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidityPosition_starts_with?: InputMaybe<Scalars['String']>;
  liquidityPosition_starts_with_nocase?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_starts_with?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  liquidityPosition_ends_with?: InputMaybe<Scalars['String']>;
  liquidityPosition_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_ends_with?: InputMaybe<Scalars['String']>;
  liquidityPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidityPosition_?: InputMaybe<LiquidityPosition_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  block?: InputMaybe<Scalars['Int']>;
  block_not?: InputMaybe<Scalars['Int']>;
  block_gt?: InputMaybe<Scalars['Int']>;
  block_lt?: InputMaybe<Scalars['Int']>;
  block_gte?: InputMaybe<Scalars['Int']>;
  block_lte?: InputMaybe<Scalars['Int']>;
  block_in?: InputMaybe<Array<Scalars['Int']>>;
  block_not_in?: InputMaybe<Array<Scalars['Int']>>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_filter>;
  pair?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_?: InputMaybe<Pair_filter>;
  token0PriceUSD?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  token0PriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token0PriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token1PriceUSD?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  token1PriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token1PriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenTotalSupply?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenTotalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenTotalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenBalance?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type LiquidityPositionSnapshot_orderBy =
  | 'id'
  | 'liquidityPosition'
  | 'timestamp'
  | 'block'
  | 'user'
  | 'pair'
  | 'token0PriceUSD'
  | 'token1PriceUSD'
  | 'reserve0'
  | 'reserve1'
  | 'reserveUSD'
  | 'liquidityTokenTotalSupply'
  | 'liquidityTokenBalance';

export type LiquidityPosition_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_filter>;
  pair?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_?: InputMaybe<Pair_filter>;
  liquidityTokenBalance?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityTokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityTokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  snapshots_?: InputMaybe<LiquidityPositionSnapshot_filter>;
  block?: InputMaybe<Scalars['Int']>;
  block_not?: InputMaybe<Scalars['Int']>;
  block_gt?: InputMaybe<Scalars['Int']>;
  block_lt?: InputMaybe<Scalars['Int']>;
  block_gte?: InputMaybe<Scalars['Int']>;
  block_lte?: InputMaybe<Scalars['Int']>;
  block_in?: InputMaybe<Array<Scalars['Int']>>;
  block_not_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type LiquidityPosition_orderBy =
  | 'id'
  | 'user'
  | 'pair'
  | 'liquidityTokenBalance'
  | 'snapshots'
  | 'block'
  | 'timestamp';

export type Mint = {
  id: Scalars['ID'];
  transaction: Transaction;
  timestamp: Scalars['BigInt'];
  pair: Pair;
  to: Scalars['Bytes'];
  liquidity: Scalars['BigDecimal'];
  sender?: Maybe<Scalars['Bytes']>;
  amount0?: Maybe<Scalars['BigDecimal']>;
  amount1?: Maybe<Scalars['BigDecimal']>;
  logIndex?: Maybe<Scalars['BigInt']>;
  amountUSD?: Maybe<Scalars['BigDecimal']>;
  feeTo?: Maybe<Scalars['Bytes']>;
  feeLiquidity?: Maybe<Scalars['BigDecimal']>;
};

export type Mint_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_?: InputMaybe<Pair_filter>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount0?: InputMaybe<Scalars['BigDecimal']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeTo?: InputMaybe<Scalars['Bytes']>;
  feeTo_not?: InputMaybe<Scalars['Bytes']>;
  feeTo_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeTo_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeTo_contains?: InputMaybe<Scalars['Bytes']>;
  feeTo_not_contains?: InputMaybe<Scalars['Bytes']>;
  feeLiquidity?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Mint_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'pair'
  | 'to'
  | 'liquidity'
  | 'sender'
  | 'amount0'
  | 'amount1'
  | 'logIndex'
  | 'amountUSD'
  | 'feeTo'
  | 'feeLiquidity';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Pair = {
  id: Scalars['ID'];
  factory: Factory;
  name: Scalars['String'];
  token0: Token;
  token1: Token;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  totalSupply: Scalars['BigDecimal'];
  reserveETH: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  trackedReserveETH: Scalars['BigDecimal'];
  token0Price: Scalars['BigDecimal'];
  token1Price: Scalars['BigDecimal'];
  volumeToken0: Scalars['BigDecimal'];
  volumeToken1: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  liquidityProviderCount: Scalars['BigInt'];
  liquidityPositions: Array<LiquidityPosition>;
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  dayData: Array<PairDayData>;
  hourData: Array<PairHourData>;
  mints: Array<Mint>;
  burns: Array<Burn>;
  swaps: Array<Swap>;
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};


export type PairliquidityPositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPosition_filter>;
};


export type PairliquidityPositionSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPositionSnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPositionSnapshot_filter>;
};


export type PairdayDataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairDayData_filter>;
};


export type PairhourDataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairHourData_filter>;
};


export type PairmintsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
};


export type PairburnsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Burn_filter>;
};


export type PairswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
};

export type PairDayData = {
  id: Scalars['ID'];
  date: Scalars['Int'];
  pair: Pair;
  token0: Token;
  token1: Token;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  totalSupply: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  volumeToken0: Scalars['BigDecimal'];
  volumeToken1: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
};

export type PairDayData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_?: InputMaybe<Pair_filter>;
  token0?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_?: InputMaybe<Token_filter>;
  token1?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_?: InputMaybe<Token_filter>;
  reserve0?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PairDayData_orderBy =
  | 'id'
  | 'date'
  | 'pair'
  | 'token0'
  | 'token1'
  | 'reserve0'
  | 'reserve1'
  | 'totalSupply'
  | 'reserveUSD'
  | 'volumeToken0'
  | 'volumeToken1'
  | 'volumeUSD'
  | 'txCount';

export type PairHourData = {
  id: Scalars['ID'];
  date: Scalars['Int'];
  pair: Pair;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  volumeToken0: Scalars['BigDecimal'];
  volumeToken1: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
};

export type PairHourData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_?: InputMaybe<Pair_filter>;
  reserve0?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PairHourData_orderBy =
  | 'id'
  | 'date'
  | 'pair'
  | 'reserve0'
  | 'reserve1'
  | 'reserveUSD'
  | 'volumeToken0'
  | 'volumeToken1'
  | 'volumeUSD'
  | 'txCount';

export type Pair_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  factory?: InputMaybe<Scalars['String']>;
  factory_not?: InputMaybe<Scalars['String']>;
  factory_gt?: InputMaybe<Scalars['String']>;
  factory_lt?: InputMaybe<Scalars['String']>;
  factory_gte?: InputMaybe<Scalars['String']>;
  factory_lte?: InputMaybe<Scalars['String']>;
  factory_in?: InputMaybe<Array<Scalars['String']>>;
  factory_not_in?: InputMaybe<Array<Scalars['String']>>;
  factory_contains?: InputMaybe<Scalars['String']>;
  factory_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_not_contains?: InputMaybe<Scalars['String']>;
  factory_not_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_starts_with?: InputMaybe<Scalars['String']>;
  factory_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_starts_with?: InputMaybe<Scalars['String']>;
  factory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_ends_with?: InputMaybe<Scalars['String']>;
  factory_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']>;
  factory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_?: InputMaybe<Factory_filter>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_?: InputMaybe<Token_filter>;
  token1?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_?: InputMaybe<Token_filter>;
  reserve0?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveETH?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  trackedReserveETH?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_not?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  trackedReserveETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token0Price?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_not?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_gt?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_lt?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_gte?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_lte?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token1Price?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_not?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_gt?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_lt?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_gte?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_lte?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidityProviderCount?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_not?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_gt?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_lt?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_gte?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_lte?: InputMaybe<Scalars['BigInt']>;
  liquidityProviderCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidityProviderCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidityPositions_?: InputMaybe<LiquidityPosition_filter>;
  liquidityPositionSnapshots_?: InputMaybe<LiquidityPositionSnapshot_filter>;
  dayData_?: InputMaybe<PairDayData_filter>;
  hourData_?: InputMaybe<PairHourData_filter>;
  mints_?: InputMaybe<Mint_filter>;
  burns_?: InputMaybe<Burn_filter>;
  swaps_?: InputMaybe<Swap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Pair_orderBy =
  | 'id'
  | 'factory'
  | 'name'
  | 'token0'
  | 'token1'
  | 'reserve0'
  | 'reserve1'
  | 'totalSupply'
  | 'reserveETH'
  | 'reserveUSD'
  | 'trackedReserveETH'
  | 'token0Price'
  | 'token1Price'
  | 'volumeToken0'
  | 'volumeToken1'
  | 'volumeUSD'
  | 'untrackedVolumeUSD'
  | 'txCount'
  | 'liquidityProviderCount'
  | 'liquidityPositions'
  | 'liquidityPositionSnapshots'
  | 'dayData'
  | 'hourData'
  | 'mints'
  | 'burns'
  | 'swaps'
  | 'timestamp'
  | 'block';

export type Query = {
  user?: Maybe<User>;
  users: Array<User>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  factory?: Maybe<Factory>;
  factories: Array<Factory>;
  hourData?: Maybe<HourData>;
  hourDatas: Array<HourData>;
  dayData?: Maybe<DayData>;
  dayDatas: Array<DayData>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  tokenHourData?: Maybe<TokenHourData>;
  tokenHourDatas: Array<TokenHourData>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  pair?: Maybe<Pair>;
  pairs: Array<Pair>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  liquidityPosition?: Maybe<LiquidityPosition>;
  liquidityPositions: Array<LiquidityPosition>;
  liquidityPositionSnapshot?: Maybe<LiquidityPositionSnapshot>;
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  tokenSearch: Array<Token>;
  pairSearch: Array<Pair>;
  userSearch: Array<User>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybundleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybundlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bundle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bundle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfactoryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfactoriesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Factory_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Factory_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhourDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhourDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<HourData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenHourDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenHourDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenHourData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pair_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairHourDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairHourDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairHourData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidityPositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidityPositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidityPositionSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidityPositionSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPositionSnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPositionSnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryburnArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryburnsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Burn_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenSearchArgs = {
  text: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairSearchArgs = {
  text: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserSearchArgs = {
  text: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  user?: Maybe<User>;
  users: Array<User>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  factory?: Maybe<Factory>;
  factories: Array<Factory>;
  hourData?: Maybe<HourData>;
  hourDatas: Array<HourData>;
  dayData?: Maybe<DayData>;
  dayDatas: Array<DayData>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  tokenHourData?: Maybe<TokenHourData>;
  tokenHourDatas: Array<TokenHourData>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  pair?: Maybe<Pair>;
  pairs: Array<Pair>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  liquidityPosition?: Maybe<LiquidityPosition>;
  liquidityPositions: Array<LiquidityPosition>;
  liquidityPositionSnapshot?: Maybe<LiquidityPositionSnapshot>;
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbundleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbundlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bundle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bundle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfactoryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfactoriesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Factory_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Factory_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhourDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhourDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<HourData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenHourDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenHourDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenHourData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pair_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairHourDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairHourDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairHourData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidityPositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidityPositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidityPositionSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidityPositionSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPositionSnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPositionSnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmintArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmintsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionburnArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionburnsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Burn_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Swap = {
  id: Scalars['ID'];
  transaction: Transaction;
  timestamp: Scalars['BigInt'];
  pair: Pair;
  sender: Scalars['Bytes'];
  amount0In: Scalars['BigDecimal'];
  amount1In: Scalars['BigDecimal'];
  amount0Out: Scalars['BigDecimal'];
  amount1Out: Scalars['BigDecimal'];
  to: Scalars['Bytes'];
  logIndex?: Maybe<Scalars['BigInt']>;
  amountUSD: Scalars['BigDecimal'];
};

export type Swap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_?: InputMaybe<Pair_filter>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount0In?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0In_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1In?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1In_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0Out?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0Out_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1Out?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1Out_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Swap_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'pair'
  | 'sender'
  | 'amount0In'
  | 'amount1In'
  | 'amount0Out'
  | 'amount1Out'
  | 'to'
  | 'logIndex'
  | 'amountUSD';

export type Token = {
  id: Scalars['ID'];
  factory: Factory;
  symbol: Scalars['String'];
  name: Scalars['String'];
  decimals: Scalars['BigInt'];
  totalSupply: Scalars['BigInt'];
  volume: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  liquidity: Scalars['BigDecimal'];
  derivedETH: Scalars['BigDecimal'];
  hourData: Array<TokenHourData>;
  dayData: Array<TokenDayData>;
  basePairs: Array<Pair>;
  quotePairs: Array<Pair>;
  basePairsDayData: Array<PairDayData>;
  quotePairsDayData: Array<PairDayData>;
};


export type TokenhourDataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenHourData_filter>;
};


export type TokendayDataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenDayData_filter>;
};


export type TokenbasePairsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pair_filter>;
};


export type TokenquotePairsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pair_filter>;
};


export type TokenbasePairsDayDataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairDayData_filter>;
};


export type TokenquotePairsDayDataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairDayData_filter>;
};

export type TokenDayData = {
  id: Scalars['ID'];
  date: Scalars['Int'];
  token: Token;
  volume: Scalars['BigDecimal'];
  volumeETH: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  liquidity: Scalars['BigDecimal'];
  liquidityETH: Scalars['BigDecimal'];
  liquidityUSD: Scalars['BigDecimal'];
  priceUSD: Scalars['BigDecimal'];
};

export type TokenDayData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceUSD?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TokenDayData_orderBy =
  | 'id'
  | 'date'
  | 'token'
  | 'volume'
  | 'volumeETH'
  | 'volumeUSD'
  | 'txCount'
  | 'liquidity'
  | 'liquidityETH'
  | 'liquidityUSD'
  | 'priceUSD';

export type TokenHourData = {
  id: Scalars['ID'];
  date: Scalars['Int'];
  token: Token;
  volume: Scalars['BigDecimal'];
  volumeETH: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
  txCount: Scalars['BigInt'];
  liquidity: Scalars['BigDecimal'];
  liquidityETH: Scalars['BigDecimal'];
  liquidityUSD: Scalars['BigDecimal'];
  priceUSD: Scalars['BigDecimal'];
};

export type TokenHourData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceUSD?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TokenHourData_orderBy =
  | 'id'
  | 'date'
  | 'token'
  | 'volume'
  | 'volumeETH'
  | 'volumeUSD'
  | 'txCount'
  | 'liquidity'
  | 'liquidityETH'
  | 'liquidityUSD'
  | 'priceUSD';

export type Token_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  factory?: InputMaybe<Scalars['String']>;
  factory_not?: InputMaybe<Scalars['String']>;
  factory_gt?: InputMaybe<Scalars['String']>;
  factory_lt?: InputMaybe<Scalars['String']>;
  factory_gte?: InputMaybe<Scalars['String']>;
  factory_lte?: InputMaybe<Scalars['String']>;
  factory_in?: InputMaybe<Array<Scalars['String']>>;
  factory_not_in?: InputMaybe<Array<Scalars['String']>>;
  factory_contains?: InputMaybe<Scalars['String']>;
  factory_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_not_contains?: InputMaybe<Scalars['String']>;
  factory_not_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_starts_with?: InputMaybe<Scalars['String']>;
  factory_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_starts_with?: InputMaybe<Scalars['String']>;
  factory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_ends_with?: InputMaybe<Scalars['String']>;
  factory_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']>;
  factory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_?: InputMaybe<Factory_filter>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['BigInt']>;
  decimals_not?: InputMaybe<Scalars['BigInt']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']>;
  decimals_lt?: InputMaybe<Scalars['BigInt']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  derivedETH?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_not?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  derivedETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  derivedETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  hourData_?: InputMaybe<TokenHourData_filter>;
  dayData_?: InputMaybe<TokenDayData_filter>;
  basePairs_?: InputMaybe<Pair_filter>;
  quotePairs_?: InputMaybe<Pair_filter>;
  basePairsDayData_?: InputMaybe<PairDayData_filter>;
  quotePairsDayData_?: InputMaybe<PairDayData_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Token_orderBy =
  | 'id'
  | 'factory'
  | 'symbol'
  | 'name'
  | 'decimals'
  | 'totalSupply'
  | 'volume'
  | 'volumeUSD'
  | 'untrackedVolumeUSD'
  | 'txCount'
  | 'liquidity'
  | 'derivedETH'
  | 'hourData'
  | 'dayData'
  | 'basePairs'
  | 'quotePairs'
  | 'basePairsDayData'
  | 'quotePairsDayData';

export type Transaction = {
  id: Scalars['ID'];
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  mints: Array<Maybe<Mint>>;
  burns: Array<Maybe<Burn>>;
  swaps: Array<Maybe<Swap>>;
};


export type TransactionmintsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
};


export type TransactionburnsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Burn_filter>;
};


export type TransactionswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
};

export type Transaction_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  mints?: InputMaybe<Array<Scalars['String']>>;
  mints_not?: InputMaybe<Array<Scalars['String']>>;
  mints_contains?: InputMaybe<Array<Scalars['String']>>;
  mints_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  mints_not_contains?: InputMaybe<Array<Scalars['String']>>;
  mints_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  mints_?: InputMaybe<Mint_filter>;
  burns?: InputMaybe<Array<Scalars['String']>>;
  burns_not?: InputMaybe<Array<Scalars['String']>>;
  burns_contains?: InputMaybe<Array<Scalars['String']>>;
  burns_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  burns_not_contains?: InputMaybe<Array<Scalars['String']>>;
  burns_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  burns_?: InputMaybe<Burn_filter>;
  swaps?: InputMaybe<Array<Scalars['String']>>;
  swaps_not?: InputMaybe<Array<Scalars['String']>>;
  swaps_contains?: InputMaybe<Array<Scalars['String']>>;
  swaps_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  swaps_not_contains?: InputMaybe<Array<Scalars['String']>>;
  swaps_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  swaps_?: InputMaybe<Swap_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Transaction_orderBy =
  | 'id'
  | 'blockNumber'
  | 'timestamp'
  | 'mints'
  | 'burns'
  | 'swaps';

export type User = {
  id: Scalars['ID'];
  liquidityPositions: Array<LiquidityPosition>;
};


export type UserliquidityPositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityPosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPosition_filter>;
};

export type User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidityPositions_?: InputMaybe<LiquidityPosition_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type User_orderBy =
  | 'id'
  | 'liquidityPositions';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Query['users'], QueryusersArgs, MeshContext>,
  /** null **/
  bundle: InContextSdkMethod<Query['bundle'], QuerybundleArgs, MeshContext>,
  /** null **/
  bundles: InContextSdkMethod<Query['bundles'], QuerybundlesArgs, MeshContext>,
  /** null **/
  factory: InContextSdkMethod<Query['factory'], QueryfactoryArgs, MeshContext>,
  /** null **/
  factories: InContextSdkMethod<Query['factories'], QueryfactoriesArgs, MeshContext>,
  /** null **/
  hourData: InContextSdkMethod<Query['hourData'], QueryhourDataArgs, MeshContext>,
  /** null **/
  hourDatas: InContextSdkMethod<Query['hourDatas'], QueryhourDatasArgs, MeshContext>,
  /** null **/
  dayData: InContextSdkMethod<Query['dayData'], QuerydayDataArgs, MeshContext>,
  /** null **/
  dayDatas: InContextSdkMethod<Query['dayDatas'], QuerydayDatasArgs, MeshContext>,
  /** null **/
  token: InContextSdkMethod<Query['token'], QuerytokenArgs, MeshContext>,
  /** null **/
  tokens: InContextSdkMethod<Query['tokens'], QuerytokensArgs, MeshContext>,
  /** null **/
  tokenHourData: InContextSdkMethod<Query['tokenHourData'], QuerytokenHourDataArgs, MeshContext>,
  /** null **/
  tokenHourDatas: InContextSdkMethod<Query['tokenHourDatas'], QuerytokenHourDatasArgs, MeshContext>,
  /** null **/
  tokenDayData: InContextSdkMethod<Query['tokenDayData'], QuerytokenDayDataArgs, MeshContext>,
  /** null **/
  tokenDayDatas: InContextSdkMethod<Query['tokenDayDatas'], QuerytokenDayDatasArgs, MeshContext>,
  /** null **/
  pair: InContextSdkMethod<Query['pair'], QuerypairArgs, MeshContext>,
  /** null **/
  pairs: InContextSdkMethod<Query['pairs'], QuerypairsArgs, MeshContext>,
  /** null **/
  pairHourData: InContextSdkMethod<Query['pairHourData'], QuerypairHourDataArgs, MeshContext>,
  /** null **/
  pairHourDatas: InContextSdkMethod<Query['pairHourDatas'], QuerypairHourDatasArgs, MeshContext>,
  /** null **/
  pairDayData: InContextSdkMethod<Query['pairDayData'], QuerypairDayDataArgs, MeshContext>,
  /** null **/
  pairDayDatas: InContextSdkMethod<Query['pairDayDatas'], QuerypairDayDatasArgs, MeshContext>,
  /** null **/
  liquidityPosition: InContextSdkMethod<Query['liquidityPosition'], QueryliquidityPositionArgs, MeshContext>,
  /** null **/
  liquidityPositions: InContextSdkMethod<Query['liquidityPositions'], QueryliquidityPositionsArgs, MeshContext>,
  /** null **/
  liquidityPositionSnapshot: InContextSdkMethod<Query['liquidityPositionSnapshot'], QueryliquidityPositionSnapshotArgs, MeshContext>,
  /** null **/
  liquidityPositionSnapshots: InContextSdkMethod<Query['liquidityPositionSnapshots'], QueryliquidityPositionSnapshotsArgs, MeshContext>,
  /** null **/
  transaction: InContextSdkMethod<Query['transaction'], QuerytransactionArgs, MeshContext>,
  /** null **/
  transactions: InContextSdkMethod<Query['transactions'], QuerytransactionsArgs, MeshContext>,
  /** null **/
  mint: InContextSdkMethod<Query['mint'], QuerymintArgs, MeshContext>,
  /** null **/
  mints: InContextSdkMethod<Query['mints'], QuerymintsArgs, MeshContext>,
  /** null **/
  burn: InContextSdkMethod<Query['burn'], QueryburnArgs, MeshContext>,
  /** null **/
  burns: InContextSdkMethod<Query['burns'], QueryburnsArgs, MeshContext>,
  /** null **/
  swap: InContextSdkMethod<Query['swap'], QueryswapArgs, MeshContext>,
  /** null **/
  swaps: InContextSdkMethod<Query['swaps'], QueryswapsArgs, MeshContext>,
  /** null **/
  tokenSearch: InContextSdkMethod<Query['tokenSearch'], QuerytokenSearchArgs, MeshContext>,
  /** null **/
  pairSearch: InContextSdkMethod<Query['pairSearch'], QuerypairSearchArgs, MeshContext>,
  /** null **/
  userSearch: InContextSdkMethod<Query['userSearch'], QueryuserSearchArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  user: InContextSdkMethod<Subscription['user'], SubscriptionuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Subscription['users'], SubscriptionusersArgs, MeshContext>,
  /** null **/
  bundle: InContextSdkMethod<Subscription['bundle'], SubscriptionbundleArgs, MeshContext>,
  /** null **/
  bundles: InContextSdkMethod<Subscription['bundles'], SubscriptionbundlesArgs, MeshContext>,
  /** null **/
  factory: InContextSdkMethod<Subscription['factory'], SubscriptionfactoryArgs, MeshContext>,
  /** null **/
  factories: InContextSdkMethod<Subscription['factories'], SubscriptionfactoriesArgs, MeshContext>,
  /** null **/
  hourData: InContextSdkMethod<Subscription['hourData'], SubscriptionhourDataArgs, MeshContext>,
  /** null **/
  hourDatas: InContextSdkMethod<Subscription['hourDatas'], SubscriptionhourDatasArgs, MeshContext>,
  /** null **/
  dayData: InContextSdkMethod<Subscription['dayData'], SubscriptiondayDataArgs, MeshContext>,
  /** null **/
  dayDatas: InContextSdkMethod<Subscription['dayDatas'], SubscriptiondayDatasArgs, MeshContext>,
  /** null **/
  token: InContextSdkMethod<Subscription['token'], SubscriptiontokenArgs, MeshContext>,
  /** null **/
  tokens: InContextSdkMethod<Subscription['tokens'], SubscriptiontokensArgs, MeshContext>,
  /** null **/
  tokenHourData: InContextSdkMethod<Subscription['tokenHourData'], SubscriptiontokenHourDataArgs, MeshContext>,
  /** null **/
  tokenHourDatas: InContextSdkMethod<Subscription['tokenHourDatas'], SubscriptiontokenHourDatasArgs, MeshContext>,
  /** null **/
  tokenDayData: InContextSdkMethod<Subscription['tokenDayData'], SubscriptiontokenDayDataArgs, MeshContext>,
  /** null **/
  tokenDayDatas: InContextSdkMethod<Subscription['tokenDayDatas'], SubscriptiontokenDayDatasArgs, MeshContext>,
  /** null **/
  pair: InContextSdkMethod<Subscription['pair'], SubscriptionpairArgs, MeshContext>,
  /** null **/
  pairs: InContextSdkMethod<Subscription['pairs'], SubscriptionpairsArgs, MeshContext>,
  /** null **/
  pairHourData: InContextSdkMethod<Subscription['pairHourData'], SubscriptionpairHourDataArgs, MeshContext>,
  /** null **/
  pairHourDatas: InContextSdkMethod<Subscription['pairHourDatas'], SubscriptionpairHourDatasArgs, MeshContext>,
  /** null **/
  pairDayData: InContextSdkMethod<Subscription['pairDayData'], SubscriptionpairDayDataArgs, MeshContext>,
  /** null **/
  pairDayDatas: InContextSdkMethod<Subscription['pairDayDatas'], SubscriptionpairDayDatasArgs, MeshContext>,
  /** null **/
  liquidityPosition: InContextSdkMethod<Subscription['liquidityPosition'], SubscriptionliquidityPositionArgs, MeshContext>,
  /** null **/
  liquidityPositions: InContextSdkMethod<Subscription['liquidityPositions'], SubscriptionliquidityPositionsArgs, MeshContext>,
  /** null **/
  liquidityPositionSnapshot: InContextSdkMethod<Subscription['liquidityPositionSnapshot'], SubscriptionliquidityPositionSnapshotArgs, MeshContext>,
  /** null **/
  liquidityPositionSnapshots: InContextSdkMethod<Subscription['liquidityPositionSnapshots'], SubscriptionliquidityPositionSnapshotsArgs, MeshContext>,
  /** null **/
  transaction: InContextSdkMethod<Subscription['transaction'], SubscriptiontransactionArgs, MeshContext>,
  /** null **/
  transactions: InContextSdkMethod<Subscription['transactions'], SubscriptiontransactionsArgs, MeshContext>,
  /** null **/
  mint: InContextSdkMethod<Subscription['mint'], SubscriptionmintArgs, MeshContext>,
  /** null **/
  mints: InContextSdkMethod<Subscription['mints'], SubscriptionmintsArgs, MeshContext>,
  /** null **/
  burn: InContextSdkMethod<Subscription['burn'], SubscriptionburnArgs, MeshContext>,
  /** null **/
  burns: InContextSdkMethod<Subscription['burns'], SubscriptionburnsArgs, MeshContext>,
  /** null **/
  swap: InContextSdkMethod<Subscription['swap'], SubscriptionswapArgs, MeshContext>,
  /** null **/
  swaps: InContextSdkMethod<Subscription['swaps'], SubscriptionswapsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["Sushi"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
