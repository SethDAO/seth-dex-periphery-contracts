"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleComputeLiquidityValue__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "factory_",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "factory",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenA",
                type: "address",
            },
            {
                internalType: "address",
                name: "tokenB",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "truePriceTokenA",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "truePriceTokenB",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "liquidityAmount",
                type: "uint256",
            },
        ],
        name: "getGasCostOfGetLiquidityValueAfterArbitrageToPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenA",
                type: "address",
            },
            {
                internalType: "address",
                name: "tokenB",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "liquidityAmount",
                type: "uint256",
            },
        ],
        name: "getLiquidityValue",
        outputs: [
            {
                internalType: "uint256",
                name: "tokenAAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenBAmount",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenA",
                type: "address",
            },
            {
                internalType: "address",
                name: "tokenB",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "truePriceTokenA",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "truePriceTokenB",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "liquidityAmount",
                type: "uint256",
            },
        ],
        name: "getLiquidityValueAfterArbitrageToPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "tokenAAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenBAmount",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenA",
                type: "address",
            },
            {
                internalType: "address",
                name: "tokenB",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "truePriceTokenA",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "truePriceTokenB",
                type: "uint256",
            },
        ],
        name: "getReservesAfterArbitrage",
        outputs: [
            {
                internalType: "uint256",
                name: "reserveA",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "reserveB",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
var _bytecode = "0x60a060405234801561001057600080fd5b506040516111933803806111938339818101604052602081101561003357600080fd5b5051606081901b6001600160601b0319166080526001600160a01b031661111861007b600039806101b952806101f7528061023a528061027852806102a252506111186000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806380caa3531161005057806380caa35314610103578063c45a015514610157578063d9b7a6e71461017b57610067565b80633558e94c1461006c57806369a2fcbd146100c1575b600080fd5b6100a86004803603608081101561008257600080fd5b506001600160a01b038135811691602081013590911690604081013590606001356101b1565b6040805192835260208301919091528051918290030190f35b6100a8600480360360a08110156100d757600080fd5b506001600160a01b038135811691602081013590911690604081013590606081013590608001356101ef565b610145600480360360a081101561011957600080fd5b506001600160a01b0381358116916020810135909116906040810135906060810135906080013561022f565b60408051918252519081900360200190f35b61015f610276565b604080516001600160a01b039092168252519081900360200190f35b6100a86004803603606081101561019157600080fd5b506001600160a01b0381358116916020810135909116906040013561029a565b6000806101e17f0000000000000000000000000000000000000000000000000000000000000000878787876102d5565b915091505b94509492505050565b6000806102207f0000000000000000000000000000000000000000000000000000000000000000888888888861039a565b915091505b9550959350505050565b6000805a90506102637f0000000000000000000000000000000000000000000000000000000000000000888888888861039a565b505060005a909103979650505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000806102c97f000000000000000000000000000000000000000000000000000000000000000086868661058b565b91509150935093915050565b6000806102e387878761072d565b909250905081158015906102f75750600081115b6103325760405162461bcd60e51b81526004018080602001828103825260288152602001806110716028913960400191505060405180910390fd5b600080610341868686866107fb565b91509150806000141561035657506102259050565b81156103775760006103698286866108e6565b94820194909303925061038e565b60006103848285876108e6565b9094039350918201915b50509550959350505050565b6000806000806001600160a01b0316896001600160a01b031663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b1580156103e257600080fd5b505afa1580156103f6573d6000803e3d6000fd5b505050506040513d602081101561040c57600080fd5b50516001600160a01b03161415905060006104288a8a8a6109d6565b905060008261043857600061049e565b816001600160a01b0316637464fc3d6040518163ffffffff1660e01b815260040160206040518083038186803b15801561047157600080fd5b505afa158015610485573d6000803e3d6000fd5b505050506040513d602081101561049b57600080fd5b50515b90506000826001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156104db57600080fd5b505afa1580156104ef573d6000803e3d6000fd5b505050506040513d602081101561050557600080fd5b505190508681108015906105195750600087115b6105545760405162461bcd60e51b81526004018080602001828103825260278152602001806110bc6027913960400191505060405180910390fd5b6000806105648e8e8e8e8e6102d5565b915091506105768282858c8a89610aae565b97509750505050505050965096945050505050565b60008060008061059c88888861072d565b9150915060006105ad8989896109d6565b90506000806001600160a01b03168a6001600160a01b031663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b1580156105f457600080fd5b505afa158015610608573d6000803e3d6000fd5b505050506040513d602081101561061e57600080fd5b50516001600160a01b03161415905060008161063b5760006106a1565b826001600160a01b0316637464fc3d6040518163ffffffff1660e01b815260040160206040518083038186803b15801561067457600080fd5b505afa158015610688573d6000803e3d6000fd5b505050506040513d602081101561069e57600080fd5b50515b90506000836001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156106de57600080fd5b505afa1580156106f2573d6000803e3d6000fd5b505050506040513d602081101561070857600080fd5b5051905061071a8686838c8787610aae565b9750975050505050505094509492505050565b600080600061073c8585610b87565b50905060008061074d8888886109d6565b6001600160a01b0316630902f1ac6040518163ffffffff1660e01b815260040160606040518083038186803b15801561078557600080fd5b505afa158015610799573d6000803e3d6000fd5b505050506040513d60608110156107af57600080fd5b5080516020909101516dffffffffffffffffffffffffffff91821693501690506001600160a01b03878116908416146107e95780826107ec565b81815b90999098509650505050505050565b6000808561080a858786610c7b565b109150600061081f858563ffffffff610d3616565b9050600061087161086c61083b846103e863ffffffff610d3616565b866108465789610848565b8a5b6108676103e589610859578d61085b565b8c5b9063ffffffff610d3616565b610c7b565b610da8565b905060006103e5856108945761088f876103e863ffffffff610d3616565b6108a6565b6108a6886103e863ffffffff610d3616565b816108ad57fe5b049050808210156108c85750600093508392506101e6915050565b6108d8828263ffffffff610efd16565b935050505094509492505050565b60008084116109265760405162461bcd60e51b815260040180806020018281038252602681526020018061104b6026913960400191505060405180910390fd5b6000831180156109365750600082115b6109715760405162461bcd60e51b81526004018080602001828103825260238152602001806110996023913960400191505060405180910390fd5b6000610985856103e563ffffffff610d3616565b90506000610999828563ffffffff610d3616565b905060006109bf836109b3886103e863ffffffff610d3616565b9063ffffffff610f5516565b90508082816109ca57fe5b04979650505050505050565b60008060006109e58585610b87565b604080516bffffffffffffffffffffffff19606094851b811660208084019190915293851b81166034830152825160288184030181526048830184528051908501207fff0000000000000000000000000000000000000000000000000000000000000060688401529a90941b9093166069840152607d8301989098527fee0a07491a10045cc1ebcc3bfe7234d24f00c7cbccf98de481e8f14bbe351c5b609d808401919091528851808403909101815260bd909201909752805196019590952095945050505050565b600080838015610abe5750600083115b15610b46576000610ad861086c8a8a63ffffffff610d3616565b90506000610ae585610da8565b905080821115610b4357876000610b02848463ffffffff610efd16565b90506000610b1b846109b387600563ffffffff610d3616565b90506000610b2a848484610c7b565b9050610b3c8c8263ffffffff610f5516565b9b50505050505b50505b85610b57898763ffffffff610d3616565b81610b5e57fe5b0486610b70898863ffffffff610d3616565b81610b7757fe5b0491509150965096945050505050565b600080826001600160a01b0316846001600160a01b03161415610bf1576040805162461bcd60e51b815260206004820181905260248201527f536574684c6962726172793a204944454e544943414c5f414444524553534553604482015290519081900360640190fd5b826001600160a01b0316846001600160a01b031610610c11578284610c14565b83835b90925090506001600160a01b038216610c74576040805162461bcd60e51b815260206004820152601960248201527f536574684c6962726172793a205a45524f5f4144445245535300000000000000604482015290519081900360640190fd5b9250929050565b6000806000610c8a8686610fad565b9150915060008480610c9857fe5b868809905082811115610cac576001820391505b918290039181610cca57848381610cbf57fe5b049350505050610d2f565b848210610d1e576040805162461bcd60e51b815260206004820152601a60248201527f46756c6c4d6174683a2046554c4c4449565f4f564552464c4f57000000000000604482015290519081900360640190fd5b610d29838387610fda565b93505050505b9392505050565b6000811580610d5157505080820282828281610d4e57fe5b04145b610da2576040805162461bcd60e51b815260206004820152601460248201527f64732d6d6174682d6d756c2d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b92915050565b600081610db757506000610ef8565b8160017001000000000000000000000000000000008210610ddd5760809190911c9060401b5b680100000000000000008210610df85760409190911c9060201b5b6401000000008210610e0f5760209190911c9060101b5b620100008210610e245760109190911c9060081b5b6101008210610e385760089190911c9060041b5b60108210610e4b5760049190911c9060021b5b60088210610e575760011b5b6001818581610e6257fe5b048201901c90506001818581610e7457fe5b048201901c90506001818581610e8657fe5b048201901c90506001818581610e9857fe5b048201901c90506001818581610eaa57fe5b048201901c90506001818581610ebc57fe5b048201901c90506001818581610ece57fe5b048201901c90506000818581610ee057fe5b049050808210610ef05780610ef2565b815b93505050505b919050565b80820382811115610da2576040805162461bcd60e51b815260206004820152601560248201527f64732d6d6174682d7375622d756e646572666c6f770000000000000000000000604482015290519081900360640190fd5b80820182811015610da2576040805162461bcd60e51b815260206004820152601460248201527f64732d6d6174682d6164642d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b6000808060001984860990508385029250828103915082811015610fd2576001820391505b509250929050565b60008181038216808381610fea57fe5b049250808581610ff657fe5b04945080816000038161100557fe5b6002858103808702820302808702820302808702820302808702820302808702820302808702820302958602900390940293046001019390930293909301029291505056fe536574684c6962726172793a20494e53554646494349454e545f494e5055545f414d4f554e54536574684172626974726167654c6962726172793a205a45524f5f504149525f5245534552564553536574684c6962726172793a20494e53554646494349454e545f4c4951554944495459436f6d707574654c697175696469747956616c75653a204c49515549444954595f414d4f554e54a26469706673582212208aa41cd0f5fb76b7d408a60e9f4b82886627346a84aebc48e6a55fef32044e8264736f6c63430006060033";
var ExampleComputeLiquidityValue__factory = /** @class */ (function (_super) {
    __extends(ExampleComputeLiquidityValue__factory, _super);
    function ExampleComputeLiquidityValue__factory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        if (args.length === 1) {
            _this = _super.call(this, _abi, _bytecode, args[0]) || this;
        }
        else {
            _this = _super.apply(this, args) || this;
        }
        return _this;
    }
    ExampleComputeLiquidityValue__factory.prototype.deploy = function (factory_, overrides) {
        return _super.prototype.deploy.call(this, factory_, overrides || {});
    };
    ExampleComputeLiquidityValue__factory.prototype.getDeployTransaction = function (factory_, overrides) {
        return _super.prototype.getDeployTransaction.call(this, factory_, overrides || {});
    };
    ExampleComputeLiquidityValue__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    ExampleComputeLiquidityValue__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    ExampleComputeLiquidityValue__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    ExampleComputeLiquidityValue__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    ExampleComputeLiquidityValue__factory.bytecode = _bytecode;
    ExampleComputeLiquidityValue__factory.abi = _abi;
    return ExampleComputeLiquidityValue__factory;
}(ethers_1.ContractFactory));
exports.ExampleComputeLiquidityValue__factory = ExampleComputeLiquidityValue__factory;
