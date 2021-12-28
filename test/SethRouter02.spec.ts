import chai, { expect } from "chai";
import { ethers } from "hardhat";
import { Wallet } from "ethers";
import { smock } from "@defi-wonderland/smock";
import { BigNumber } from "@ethersproject/bignumber";
import { MockProvider } from "ethereum-waffle";
import { ecsign } from "ethereumjs-util";

import { SethPair, SethPair__factory } from "@sethdao/dex-core-contracts";

import { v2Fixture } from "./shared/fixtures";
import {
    bigNumberify,
    expandTo18Decimals,
    getApprovalDigest,
    MINIMUM_LIQUIDITY,
} from "./shared/utilities";
import { DeflatingERC20, DeflatingERC20__factory, IERC20, ISethRouter02, WETH9 } from "../types";

const { MaxUint256 } = ethers.constants;
const CHAIN_ID = "1";

chai.use(smock.matchers);

const overrides = {
    gasLimit: 9999999,
};

describe("SethRouter02", () => {
    let wallet: Wallet;

    let token0: IERC20;
    let token1: IERC20;
    let router: ISethRouter02;

    const provider = new MockProvider({
        ganacheOptions: {
            hardfork: "istanbul",
            mnemonic: "horn horn horn horn horn horn horn horn horn horn horn horn",
            ...overrides,
        },
    });

    beforeEach(async function () {
        [wallet] = provider.getWallets();
        const fixture = await v2Fixture(wallet);

        token0 = fixture.token0;
        token1 = fixture.token1;
        router = fixture.router02;
    });

    it("quote", async () => {
        expect(await router.quote(bigNumberify(1), bigNumberify(100), bigNumberify(200))).to.eq(
            bigNumberify(2)
        );
        expect(await router.quote(bigNumberify(2), bigNumberify(200), bigNumberify(100))).to.eq(
            bigNumberify(1)
        );
        await expect(
            router.quote(bigNumberify(0), bigNumberify(100), bigNumberify(200))
        ).to.be.revertedWith("SethLibrary: INSUFFICIENT_AMOUNT");
        await expect(
            router.quote(bigNumberify(1), bigNumberify(0), bigNumberify(200))
        ).to.be.revertedWith("SethLibrary: INSUFFICIENT_LIQUIDITY");
        await expect(
            router.quote(bigNumberify(1), bigNumberify(100), bigNumberify(0))
        ).to.be.revertedWith("SethLibrary: INSUFFICIENT_LIQUIDITY");
    });

    it("getAmountOut", async () => {
        expect(
            await router.getAmountOut(bigNumberify(2), bigNumberify(100), bigNumberify(100))
        ).to.eq(bigNumberify(1));
        await expect(
            router.getAmountOut(bigNumberify(0), bigNumberify(100), bigNumberify(100))
        ).to.be.revertedWith("SethLibrary: INSUFFICIENT_INPUT_AMOUNT");
        await expect(
            router.getAmountOut(bigNumberify(2), bigNumberify(0), bigNumberify(100))
        ).to.be.revertedWith("SethLibrary: INSUFFICIENT_LIQUIDITY");
        await expect(
            router.getAmountOut(bigNumberify(2), bigNumberify(100), bigNumberify(0))
        ).to.be.revertedWith("SethLibrary: INSUFFICIENT_LIQUIDITY");
    });

    it("getAmountIn", async () => {
        expect(
            await router.getAmountIn(bigNumberify(1), bigNumberify(100), bigNumberify(100))
        ).to.eq(bigNumberify(2));
        await expect(
            router.getAmountIn(bigNumberify(0), bigNumberify(100), bigNumberify(100))
        ).to.be.revertedWith("SethLibrary: INSUFFICIENT_OUTPUT_AMOUNT");
        await expect(
            router.getAmountIn(bigNumberify(1), bigNumberify(0), bigNumberify(100))
        ).to.be.revertedWith("SethLibrary: INSUFFICIENT_LIQUIDITY");
        await expect(
            router.getAmountIn(bigNumberify(1), bigNumberify(100), bigNumberify(0))
        ).to.be.revertedWith("SethLibrary: INSUFFICIENT_LIQUIDITY");
    });

    it("getAmountsOut", async () => {
        await token0.approve(router.address, MaxUint256);
        await token1.approve(router.address, MaxUint256);
        await router.addLiquidity(
            token0.address,
            token1.address,
            bigNumberify(10000),
            bigNumberify(10000),
            0,
            0,
            wallet.address,
            MaxUint256,
            overrides
        );

        await expect(router.getAmountsOut(bigNumberify(2), [token0.address])).to.be.revertedWith(
            "SethLibrary: INVALID_PATH"
        );
        const path = [token0.address, token1.address];
        expect(await router.getAmountsOut(bigNumberify(2), path)).to.deep.eq([
            bigNumberify(2),
            bigNumberify(1),
        ]);
    });

    it("getAmountsIn", async () => {
        await token0.approve(router.address, MaxUint256);
        await token1.approve(router.address, MaxUint256);
        await router.addLiquidity(
            token0.address,
            token1.address,
            bigNumberify(10000),
            bigNumberify(10000),
            0,
            0,
            wallet.address,
            MaxUint256,
            overrides
        );

        await expect(router.getAmountsIn(bigNumberify(1), [token0.address])).to.be.revertedWith(
            "SethLibrary: INVALID_PATH"
        );
        const path = [token0.address, token1.address];
        expect(await router.getAmountsIn(bigNumberify(1), path)).to.deep.eq([
            bigNumberify(2),
            bigNumberify(1),
        ]);
    });
});

describe("fee-on-transfer tokens", () => {
    let wallet: Wallet;

    let DTT: DeflatingERC20;
    let WETH: WETH9;
    let router: ISethRouter02;
    let pair: SethPair;

    const provider = new MockProvider({
        ganacheOptions: {
            hardfork: "istanbul",
            mnemonic: "horn horn horn horn horn horn horn horn horn horn horn horn",
            ...overrides,
        },
    });

    beforeEach(async function () {
        [wallet] = provider.getWallets();
        const fixture = await v2Fixture(wallet);

        WETH = fixture.WETH;
        router = fixture.router02;

        DTT = await new DeflatingERC20__factory(wallet).deploy(expandTo18Decimals(10000));

        // make a DTT<>WETH pair
        await fixture.factoryV2.createPair(DTT.address, WETH.address);
        const pairAddress = await fixture.factoryV2.getPair(DTT.address, WETH.address);
        pair = new SethPair__factory(wallet).attach(pairAddress);
    });

    afterEach(async function () {
        expect(await provider.getBalance(router.address)).to.eq(0);
    });

    async function addLiquidity(DTTAmount: BigNumber, WETHAmount: BigNumber) {
        await DTT.approve(router.address, MaxUint256);
        await router.addLiquidityETH(
            DTT.address,
            DTTAmount,
            DTTAmount,
            WETHAmount,
            wallet.address,
            MaxUint256,
            {
                ...overrides,
                value: WETHAmount,
            }
        );
    }

    it("removeLiquidityETHSupportingFeeOnTransferTokens", async () => {
        const DTTAmount = expandTo18Decimals(1);
        const ETHAmount = expandTo18Decimals(4);
        await addLiquidity(DTTAmount, ETHAmount);

        const DTTInPair = await DTT.balanceOf(pair.address);
        const WETHInPair = await WETH.balanceOf(pair.address);
        const liquidity = await pair.balanceOf(wallet.address);
        const totalSupply = await pair.totalSupply();
        const NaiveDTTExpected = DTTInPair.mul(liquidity).div(totalSupply);
        const WETHExpected = WETHInPair.mul(liquidity).div(totalSupply);

        await pair.approve(router.address, MaxUint256);
        await router.removeLiquidityETHSupportingFeeOnTransferTokens(
            DTT.address,
            liquidity,
            NaiveDTTExpected,
            WETHExpected,
            wallet.address,
            MaxUint256,
            overrides
        );
    });

    it("removeLiquidityETHWithPermitSupportingFeeOnTransferTokens", async () => {
        const DTTAmount = expandTo18Decimals(1).mul(100).div(99);
        const ETHAmount = expandTo18Decimals(4);
        await addLiquidity(DTTAmount, ETHAmount);

        const expectedLiquidity = expandTo18Decimals(2);

        const nonce = await pair.nonces(wallet.address);
        const pairName = await pair.name();
        const chainId = CHAIN_ID;
        const digest = await getApprovalDigest(
            pairName,
            pair.address,
            chainId,
            {
                owner: wallet.address,
                spender: router.address,
                value: expectedLiquidity.sub(MINIMUM_LIQUIDITY),
            },
            nonce,
            MaxUint256
        );
        const { v, r, s } = ecsign(
            Buffer.from(digest.slice(2), "hex"),
            Buffer.from(wallet.privateKey.slice(2), "hex")
        );

        const DTTInPair = await DTT.balanceOf(pair.address);
        const WETHInPair = await WETH.balanceOf(pair.address);
        const liquidity = await pair.balanceOf(wallet.address);
        const totalSupply = await pair.totalSupply();
        const NaiveDTTExpected = DTTInPair.mul(liquidity).div(totalSupply);
        const WETHExpected = WETHInPair.mul(liquidity).div(totalSupply);

        await pair.approve(router.address, MaxUint256);
        await router.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
            DTT.address,
            liquidity,
            NaiveDTTExpected,
            WETHExpected,
            wallet.address,
            MaxUint256,
            false,
            v,
            r,
            s,
            overrides
        );
    });

    describe("swapExactTokensForTokensSupportingFeeOnTransferTokens", () => {
        const DTTAmount = expandTo18Decimals(5).mul(100).div(99);
        const ETHAmount = expandTo18Decimals(10);
        const amountIn = expandTo18Decimals(1);

        beforeEach(async () => {
            await addLiquidity(DTTAmount, ETHAmount);
        });

        it("DTT -> WETH", async () => {
            await DTT.approve(router.address, MaxUint256);

            await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
                amountIn,
                0,
                [DTT.address, WETH.address],
                wallet.address,
                MaxUint256,
                overrides
            );
        });

        // WETH -> DTT
        it("WETH -> DTT", async () => {
            await WETH.deposit({ value: amountIn }); // mint WETH
            await WETH.approve(router.address, MaxUint256);

            await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
                amountIn,
                0,
                [WETH.address, DTT.address],
                wallet.address,
                MaxUint256,
                overrides
            );
        });
    });

    // ETH -> DTT
    it("swapExactETHForTokensSupportingFeeOnTransferTokens", async () => {
        const DTTAmount = expandTo18Decimals(10).mul(100).div(99);
        const ETHAmount = expandTo18Decimals(5);
        const swapAmount = expandTo18Decimals(1);
        await addLiquidity(DTTAmount, ETHAmount);

        await router.swapExactETHForTokensSupportingFeeOnTransferTokens(
            0,
            [WETH.address, DTT.address],
            wallet.address,
            MaxUint256,
            {
                ...overrides,
                value: swapAmount,
            }
        );
    });

    // DTT -> ETH
    it("swapExactTokensForETHSupportingFeeOnTransferTokens", async () => {
        const DTTAmount = expandTo18Decimals(5).mul(100).div(99);
        const ETHAmount = expandTo18Decimals(10);
        const swapAmount = expandTo18Decimals(1);

        await addLiquidity(DTTAmount, ETHAmount);
        await DTT.approve(router.address, MaxUint256);

        await router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            swapAmount,
            0,
            [DTT.address, WETH.address],
            wallet.address,
            MaxUint256,
            overrides
        );
    });
});

describe("fee-on-transfer tokens: reloaded", () => {
    let wallet: Wallet;

    let DTT: DeflatingERC20;
    let DTT2: DeflatingERC20;
    let router: ISethRouter02;

    const provider = new MockProvider({
        ganacheOptions: {
            hardfork: "istanbul",
            mnemonic: "horn horn horn horn horn horn horn horn horn horn horn horn",
            ...overrides,
        },
    });

    beforeEach(async function () {
        [wallet] = provider.getWallets();
        const fixture = await v2Fixture(wallet);

        router = fixture.router02;

        DTT = await new DeflatingERC20__factory(wallet).deploy(expandTo18Decimals(10000));
        DTT2 = await new DeflatingERC20__factory(wallet).deploy(expandTo18Decimals(10000));

        // make a DTT<>WETH pair
        await fixture.factoryV2.createPair(DTT.address, DTT2.address);
    });

    afterEach(async function () {
        expect(await provider.getBalance(router.address)).to.eq(0);
    });

    async function addLiquidity(DTTAmount: BigNumber, DTT2Amount: BigNumber) {
        await DTT.approve(router.address, MaxUint256);
        await DTT2.approve(router.address, MaxUint256);
        await router.addLiquidity(
            DTT.address,
            DTT2.address,
            DTTAmount,
            DTT2Amount,
            DTTAmount,
            DTT2Amount,
            wallet.address,
            MaxUint256,
            overrides
        );
    }

    describe("swapExactTokensForTokensSupportingFeeOnTransferTokens", () => {
        const DTTAmount = expandTo18Decimals(5).mul(100).div(99);
        const DTT2Amount = expandTo18Decimals(5);
        const amountIn = expandTo18Decimals(1);

        beforeEach(async () => {
            await addLiquidity(DTTAmount, DTT2Amount);
        });

        it("DTT -> DTT2", async () => {
            await DTT.approve(router.address, MaxUint256);

            await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
                amountIn,
                0,
                [DTT.address, DTT2.address],
                wallet.address,
                MaxUint256,
                overrides
            );
        });
    });
});
