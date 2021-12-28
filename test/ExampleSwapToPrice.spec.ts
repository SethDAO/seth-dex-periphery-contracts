import chai, { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { smock } from "@defi-wonderland/smock";

import { SethPair } from "@sethdao/dex-core-contracts";

import { expandTo18Decimals } from "./shared/utilities";
import { v2Fixture } from "./shared/fixtures";
import { ExampleSwapToPrice, ExampleSwapToPrice__factory, IERC20, ISethRouter02 } from "../types";

const { MaxUint256 } = ethers.constants;

chai.use(smock.matchers);

const overrides = {
    gasLimit: 9999999,
};

describe("ExampleSwapToPrice", () => {
    let wallet: Signer;
    let walletAddress: string;

    let token0: IERC20;
    let token1: IERC20;
    let pair: SethPair;
    let router: ISethRouter02;
    let swapToPriceExample: ExampleSwapToPrice;

    beforeEach(async function () {
        [wallet] = await ethers.getSigners();
        walletAddress = await wallet.getAddress();
        const fixture = await v2Fixture(wallet);

        token0 = fixture.token0;
        token1 = fixture.token1;
        pair = fixture.pair;
        router = fixture.router;
        swapToPriceExample = await new ExampleSwapToPrice__factory(wallet).deploy(
            fixture.factoryV2.address,
            fixture.router.address,
            overrides
        );
    });

    beforeEach("set up price differential of 1:100", async () => {
        await token0.transfer(pair.address, expandTo18Decimals(10));
        await token1.transfer(pair.address, expandTo18Decimals(1000));
        await pair.sync(overrides);
    });

    beforeEach("approve the swap contract to spend any amount of both tokens", async () => {
        await token0.approve(swapToPriceExample.address, MaxUint256);
        await token1.approve(swapToPriceExample.address, MaxUint256);
    });

    it("correct router address", async () => {
        expect(await swapToPriceExample.router()).to.eq(router.address);
    });

    describe("#swapToPrice", () => {
        it("requires non-zero true price inputs", async () => {
            await expect(
                swapToPriceExample.swapToPrice(
                    token0.address,
                    token1.address,
                    0,
                    0,
                    MaxUint256,
                    MaxUint256,
                    walletAddress,
                    MaxUint256
                )
            ).to.be.revertedWith("ExampleSwapToPrice: ZERO_PRICE");
            await expect(
                swapToPriceExample.swapToPrice(
                    token0.address,
                    token1.address,
                    10,
                    0,
                    MaxUint256,
                    MaxUint256,
                    walletAddress,
                    MaxUint256
                )
            ).to.be.revertedWith("ExampleSwapToPrice: ZERO_PRICE");
            await expect(
                swapToPriceExample.swapToPrice(
                    token0.address,
                    token1.address,
                    0,
                    10,
                    MaxUint256,
                    MaxUint256,
                    walletAddress,
                    MaxUint256
                )
            ).to.be.revertedWith("ExampleSwapToPrice: ZERO_PRICE");
        });

        it("requires non-zero max spend", async () => {
            await expect(
                swapToPriceExample.swapToPrice(
                    token0.address,
                    token1.address,
                    1,
                    100,
                    0,
                    0,
                    walletAddress,
                    MaxUint256
                )
            ).to.be.revertedWith("ExampleSwapToPrice: ZERO_SPEND");
        });

        it("moves the price to 1:90", async () => {
            await expect(
                swapToPriceExample.swapToPrice(
                    token0.address,
                    token1.address,
                    1,
                    90,
                    MaxUint256,
                    MaxUint256,
                    walletAddress,
                    MaxUint256,
                    overrides
                )
            )
                // (1e19 + 526682316179835569) : (1e21 - 49890467170695440744) ~= 1:90
                .to.emit(token0, "Transfer")
                .withArgs(walletAddress, swapToPriceExample.address, "526682316179835569")
                .to.emit(token0, "Approval")
                .withArgs(swapToPriceExample.address, router.address, "526682316179835569")
                .to.emit(token0, "Transfer")
                .withArgs(swapToPriceExample.address, pair.address, "526682316179835569")
                .to.emit(token1, "Transfer")
                .withArgs(pair.address, walletAddress, "49890467170695440744");
        });

        it("moves the price to 1:110", async () => {
            await expect(
                swapToPriceExample.swapToPrice(
                    token0.address,
                    token1.address,
                    1,
                    110,
                    MaxUint256,
                    MaxUint256,
                    walletAddress,
                    MaxUint256,
                    overrides
                )
            )
                // (1e21 + 47376582963642643588) : (1e19 - 451039908682851138) ~= 1:110
                .to.emit(token1, "Transfer")
                .withArgs(walletAddress, swapToPriceExample.address, "47376582963642643588")
                .to.emit(token1, "Approval")
                .withArgs(swapToPriceExample.address, router.address, "47376582963642643588")
                .to.emit(token1, "Transfer")
                .withArgs(swapToPriceExample.address, pair.address, "47376582963642643588")
                .to.emit(token0, "Transfer")
                .withArgs(pair.address, walletAddress, "451039908682851138");
        });

        it("reverse token order", async () => {
            await expect(
                swapToPriceExample.swapToPrice(
                    token1.address,
                    token0.address,
                    110,
                    1,
                    MaxUint256,
                    MaxUint256,
                    walletAddress,
                    MaxUint256,
                    overrides
                )
            )
                // (1e21 + 47376582963642643588) : (1e19 - 451039908682851138) ~= 1:110
                .to.emit(token1, "Transfer")
                .withArgs(walletAddress, swapToPriceExample.address, "47376582963642643588")
                .to.emit(token1, "Approval")
                .withArgs(swapToPriceExample.address, router.address, "47376582963642643588")
                .to.emit(token1, "Transfer")
                .withArgs(swapToPriceExample.address, pair.address, "47376582963642643588")
                .to.emit(token0, "Transfer")
                .withArgs(pair.address, walletAddress, "451039908682851138");
        });

        it("swap gas cost", async () => {
            const tx = await swapToPriceExample.swapToPrice(
                token0.address,
                token1.address,
                1,
                110,
                MaxUint256,
                MaxUint256,
                walletAddress,
                MaxUint256,
                overrides
            );
            const receipt = await tx.wait();
            expect(receipt.gasUsed).to.eq("158710");
        }).retries(2); // gas test is inconsistent
    });
});
