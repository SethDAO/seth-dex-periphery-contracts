import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISethRouter02, ISethRouter02Interface } from "../ISethRouter02";
export declare class ISethRouter02__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): ISethRouter02Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISethRouter02;
}
