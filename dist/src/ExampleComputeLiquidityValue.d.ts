/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ExampleComputeLiquidityValueInterface extends ethers.utils.Interface {
  functions: {
    "factory()": FunctionFragment;
    "getGasCostOfGetLiquidityValueAfterArbitrageToPrice(address,address,uint256,uint256,uint256)": FunctionFragment;
    "getLiquidityValue(address,address,uint256)": FunctionFragment;
    "getLiquidityValueAfterArbitrageToPrice(address,address,uint256,uint256,uint256)": FunctionFragment;
    "getReservesAfterArbitrage(address,address,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getGasCostOfGetLiquidityValueAfterArbitrageToPrice",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getLiquidityValue",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getLiquidityValueAfterArbitrageToPrice",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getReservesAfterArbitrage",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getGasCostOfGetLiquidityValueAfterArbitrageToPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLiquidityValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLiquidityValueAfterArbitrageToPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getReservesAfterArbitrage",
    data: BytesLike
  ): Result;

  events: {};
}

export class ExampleComputeLiquidityValue extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ExampleComputeLiquidityValueInterface;

  functions: {
    factory(overrides?: CallOverrides): Promise<[string]>;

    getGasCostOfGetLiquidityValueAfterArbitrageToPrice(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getLiquidityValue(
      tokenA: string,
      tokenB: string,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        tokenAAmount: BigNumber;
        tokenBAmount: BigNumber;
      }
    >;

    getLiquidityValueAfterArbitrageToPrice(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        tokenAAmount: BigNumber;
        tokenBAmount: BigNumber;
      }
    >;

    getReservesAfterArbitrage(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { reserveA: BigNumber; reserveB: BigNumber }
    >;
  };

  factory(overrides?: CallOverrides): Promise<string>;

  getGasCostOfGetLiquidityValueAfterArbitrageToPrice(
    tokenA: string,
    tokenB: string,
    truePriceTokenA: BigNumberish,
    truePriceTokenB: BigNumberish,
    liquidityAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getLiquidityValue(
    tokenA: string,
    tokenB: string,
    liquidityAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      tokenAAmount: BigNumber;
      tokenBAmount: BigNumber;
    }
  >;

  getLiquidityValueAfterArbitrageToPrice(
    tokenA: string,
    tokenB: string,
    truePriceTokenA: BigNumberish,
    truePriceTokenB: BigNumberish,
    liquidityAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      tokenAAmount: BigNumber;
      tokenBAmount: BigNumber;
    }
  >;

  getReservesAfterArbitrage(
    tokenA: string,
    tokenB: string,
    truePriceTokenA: BigNumberish,
    truePriceTokenB: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { reserveA: BigNumber; reserveB: BigNumber }
  >;

  callStatic: {
    factory(overrides?: CallOverrides): Promise<string>;

    getGasCostOfGetLiquidityValueAfterArbitrageToPrice(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLiquidityValue(
      tokenA: string,
      tokenB: string,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        tokenAAmount: BigNumber;
        tokenBAmount: BigNumber;
      }
    >;

    getLiquidityValueAfterArbitrageToPrice(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        tokenAAmount: BigNumber;
        tokenBAmount: BigNumber;
      }
    >;

    getReservesAfterArbitrage(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { reserveA: BigNumber; reserveB: BigNumber }
    >;
  };

  filters: {};

  estimateGas: {
    factory(overrides?: CallOverrides): Promise<BigNumber>;

    getGasCostOfGetLiquidityValueAfterArbitrageToPrice(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLiquidityValue(
      tokenA: string,
      tokenB: string,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLiquidityValueAfterArbitrageToPrice(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getReservesAfterArbitrage(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getGasCostOfGetLiquidityValueAfterArbitrageToPrice(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLiquidityValue(
      tokenA: string,
      tokenB: string,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLiquidityValueAfterArbitrageToPrice(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      liquidityAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getReservesAfterArbitrage(
      tokenA: string,
      tokenB: string,
      truePriceTokenA: BigNumberish,
      truePriceTokenB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
