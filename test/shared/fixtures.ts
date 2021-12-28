import { Signer } from "ethers";

import {
    SethPairFactory,
    SethPair__factory,
    SethPairFactory__factory,
    SethPair,
} from "@sethdao/dex-core-contracts";

import { expandTo18Decimals } from "./utilities";
import {
    IERC20,
    WETH9,
    ISethRouter01,
    ISethRouter02,
    RouterEventEmitter,
    ERC20__factory,
    WETH9__factory,
    SethRouter01__factory,
    SethRouter02__factory,
    RouterEventEmitter__factory,
} from "../../types";

const overrides = {
    gasLimit: 9999999,
};

const TOTAL_SUPPLY = expandTo18Decimals(10000);

interface V2Fixture {
    token0: IERC20;
    token1: IERC20;
    WETH: WETH9;
    WETHPartner: IERC20;
    factoryV2: SethPairFactory;
    router01: ISethRouter01;
    router02: ISethRouter02;
    routerEventEmitter: RouterEventEmitter;
    router: ISethRouter02;
    pair: SethPair;
    WETHPair: SethPair;
}

export async function v2Fixture(wallet: Signer): Promise<V2Fixture> {
    // deploy tokens
    const tokenA = await new ERC20__factory(wallet).deploy(TOTAL_SUPPLY);
    const tokenB = await new ERC20__factory(wallet).deploy(TOTAL_SUPPLY);
    const WETH = await new WETH9__factory(wallet).deploy();
    const WETHPartner = await new ERC20__factory(wallet).deploy(TOTAL_SUPPLY);

    // deploy V2
    const address = await wallet.getAddress();
    const factoryV2 = await new SethPairFactory__factory(wallet).deploy(address);

    // deploy routers
    const router01 = await new SethRouter01__factory(wallet).deploy(
        factoryV2.address,
        WETH.address,
        overrides
    );
    const router02 = await new SethRouter02__factory(wallet).deploy(
        factoryV2.address,
        WETH.address,
        overrides
    );

    // event emitter for testing
    const routerEventEmitter = await new RouterEventEmitter__factory(wallet).deploy();

    // initialize V2
    await factoryV2.createPair(tokenA.address, tokenB.address);
    const pairAddress = await factoryV2.getPair(tokenA.address, tokenB.address);
    const pair = new SethPair__factory(wallet).attach(pairAddress);

    const token0Address = await pair.token0();
    const token0 = tokenA.address === token0Address ? tokenA : tokenB;
    const token1 = tokenA.address === token0Address ? tokenB : tokenA;

    await factoryV2.createPair(WETH.address, WETHPartner.address);
    const WETHPairAddress = await factoryV2.getPair(WETH.address, WETHPartner.address);
    const WETHPair = new SethPair__factory(wallet).attach(WETHPairAddress);

    return {
        token0,
        token1,
        WETH,
        WETHPartner,
        factoryV2,
        router01,
        router02,
        router: router02, // the default router, 01 had a minor bug
        routerEventEmitter,
        pair,
        WETHPair,
    };
}
