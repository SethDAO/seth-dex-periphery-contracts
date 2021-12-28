import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISethRouter01, ISethRouter01Interface } from "../ISethRouter01";
export declare class ISethRouter01__factory {
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
    static createInterface(): ISethRouter01Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISethRouter01;
}
