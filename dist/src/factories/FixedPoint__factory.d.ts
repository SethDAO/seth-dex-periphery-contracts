import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { FixedPoint, FixedPointInterface } from "../FixedPoint";
export declare class FixedPoint__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<FixedPoint>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): FixedPoint;
    connect(signer: Signer): FixedPoint__factory;
    static readonly bytecode = "0x60c4610025600b82828239805160001a60731461001857fe5b30600052607381538281f3fe7300000000000000000000000000000000000000003014608060405260043610603d5760003560e01c80633bf7a83e146042578063552f888a14605a575b600080fd5b60486076565b60408051918252519081900360200190f35b60606089565b6040805160ff9092168252519081900360200190f35b6e01000000000000000000000000000081565b60708156fea264697066735822122090f117d25325f63ce970b53c47ca2c907579a3d2755647756acdaa3e38db9c9864736f6c63430006060033";
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): FixedPointInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): FixedPoint;
}
