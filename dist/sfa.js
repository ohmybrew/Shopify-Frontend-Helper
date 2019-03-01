(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SFA = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ensure we get back JSON object from an XHR request.
 * @param response - XHR response data.
 */
function transformResponse(response) {
    // tslint:disable-next-line
    return response.constructor === String ? JSON.parse(response) : response;
}
/**
 * Shopify API.
 */
var Shopify = /** @class */ (function () {
    function Shopify() {
    }
    /**
     * Sends a request to cart.
     * @param params - The params for the registry.
     * @param params.method - The HTTP method.
     * @param params.endpoint - The endpoint of the URL.
     * @param params.data - The data to send to the endpoint.
     * @param params.type - The type of request.
     */
    Shopify.request = function (_a) {
        var _b = _a.method, method = _b === void 0 ? 'GET' : _b, endpoint = _a.endpoint, data = _a.data, _c = _a.type, type = _c === void 0 ? 'json' : _c;
        return new Promise(function (resolve, reject) {
            // Generate the request object
            var xhr = new XMLHttpRequest();
            var adjustedEndpoint = endpoint;
            if (method === 'GET') {
                adjustedEndpoint += "?" + Math.random().toString(36).substr(2, 10);
            }
            // Build the request
            xhr.open(method, "" + Shopify.baseURI + adjustedEndpoint, true);
            xhr.responseType = type;
            if (type === 'json') {
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            }
            // Resolve or rejust the promise, passing XHR to the promise
            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve(xhr);
                }
                else {
                    reject(xhr);
                }
            };
            // Send the data
            xhr.send(data ? JSON.stringify(data) : null);
        });
    };
    /**
     * The base URL.
     */
    Shopify.baseURI = window.location.protocol + "//" + window.location.hostname;
    return Shopify;
}());
/**
 * Shopify Checkout API.
 */
var Checkout = /** @class */ (function (_super) {
    __extends(Checkout, _super);
    function Checkout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the checkout markup.
     */
    Checkout.checkout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Checkout.request({ endpoint: '/checkout', type: 'text' })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.responseText];
                }
            });
        });
    };
    /**
     * Applies a discount via URL.
     * @param discount - The discount code to apply.
     */
    Checkout.applyDiscount = function (discount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /*
                 * Use HEAD so we don't follow redirects.
                 * Shopify seems to set some sort of server var to tell checkout
                 * to apply the discount (not the discount_code cookie either).
                 */
                return [2 /*return*/, Checkout.request({ method: 'HEAD', endpoint: "/discount/" + discount })];
            });
        });
    };
    /**
     * Verifies the discount code.
     * @param discount - The discount code to verify.
     */
    Checkout.verifyDiscount = function (discount) {
        return __awaiter(this, void 0, void 0, function () {
            var response, valid, parser, htmlDoc_1, htmlQs, discountCode, discountAmount, discountType, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Checkout.checkout()];
                    case 1:
                        response = _a.sent();
                        valid = response.indexOf('data-discount-success') > -1;
                        if (valid) {
                            parser = new DOMParser();
                            htmlDoc_1 = parser.parseFromString(response, 'text/html');
                            htmlQs = function (query) { return htmlDoc_1.querySelector(query); };
                            discountCode = (htmlQs('[data-discount-success] .reduction-code__text') ||
                                htmlQs('.applied-reduction-code__information')).innerHTML.trim();
                            discountAmount = parseFloat(htmlQs('[data-checkout-discount-amount-target]').dataset.checkoutDiscountAmountTarget);
                            discountType = htmlQs('[data-discount-type]').dataset.discountType;
                            result = {
                                code: discountCode,
                                type: discountType,
                                discount: discountAmount,
                            };
                            // Check discount validity if discount code was passed into function
                            if (discount !== undefined) {
                                return [2 /*return*/, result.code.toUpperCase() === discount.toUpperCase() ? result : false];
                            }
                            // Return result for no discount checking
                            return [2 /*return*/, result];
                        }
                        // Not a valid code
                        return [2 /*return*/, false];
                }
            });
        });
    };
    return Checkout;
}(Shopify));
exports.Checkout = Checkout;
/**
 * Shopify Cart API.
 */
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the cart object.
     * @param cachedVersion - Cached cart or not.
     */
    Cart.get = function (cachedVersion) {
        if (cachedVersion === void 0) { cachedVersion = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response, xhr_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (cachedVersion && Cart.data) {
                            // Send the cached version
                            return [2 /*return*/, Cart.data];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Cart.request({ endpoint: '/cart.js' })];
                    case 2:
                        response = _a.sent();
                        Cart.data = transformResponse(response.response);
                        return [2 /*return*/, Cart.data];
                    case 3:
                        xhr_1 = _a.sent();
                        return [2 /*return*/, {
                                response: xhr_1.response,
                                status: xhr_1.status,
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Adds an item to the cart.
     * @param data - The data to add.
     */
    Cart.add = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var tasks_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (data.constructor === Array) {
                            tasks_1 = [];
                            data.forEach(function (cartData) {
                                tasks_1.push(function () { return Cart.request({ method: 'POST', endpoint: '/cart/add.js', data: cartData }); });
                            });
                            tasks_1.push(function () { return Cart.get(); });
                            return [2 /*return*/, tasks_1.reduce(function (p, task) { return p.then(task); }, Promise.resolve())];
                        }
                        return [4 /*yield*/, Cart.request({ data: data, method: 'POST', endpoint: '/cart/add.js' })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Cart.get()];
                }
            });
        });
    };
    /**
     * Updates the cart.
     * @param updates - The data to update (id => qty | [qty, qty, ...]).
     * @param note - The note to pass along.
     */
    Cart.update = function (updates, note) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Cart.request({
                            method: 'POST',
                            endpoint: '/cart/update.js',
                            data: { updates: updates, note: note },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, transformResponse(response.response)];
                }
            });
        });
    };
    /**
     * Updates the cart attibutes.
     * @param attributes - The attribute to push.
     * @param notes - The note to pass along.
     */
    Cart.attributes = function (attributes, note) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Cart.request({
                            method: 'POST',
                            endpoint: '/cart/update.js',
                            data: { attributes: attributes, note: note },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, transformResponse(response.response)];
                }
            });
        });
    };
    /**
     * Updates the cart note.
     * @param note - The cart note.
     */
    Cart.note = function (note) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Cart.request({
                            method: 'POST',
                            endpoint: '/cart/update.js',
                            data: { note: note },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, transformResponse(response.response)];
                }
            });
        });
    };
    /**
     * Changes a cart item.
     * @param data - The data to change.
     */
    Cart.change = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Cart.request({
                            data: data,
                            method: 'POST',
                            endpoint: '/cart/change.js',
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, transformResponse(response.response)];
                }
            });
        });
    };
    /**
     * Removes an item from the cart.
     * @params id - The ID to remove.
     */
    Cart.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = {};
                data[id] = 0;
                return [2 /*return*/, Cart.update(data)];
            });
        });
    };
    /**
     * Removes an item from the cart by line index.
     * @params line - The line index to remove.
     */
    Cart.removeByLine = function (line) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Cart.change({ line: line, quantity: 0 })];
            });
        });
    };
    /**
     * Clears the cart.
     */
    Cart.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Cart.request({
                        method: 'POST',
                        endpoint: '/cart/clear.js',
                    })];
            });
        });
    };
    return Cart;
}(Shopify));
exports.Cart = Cart;
/**
 * Shopify Product API.
 */
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the product by handle.
     * @param handle - The product handle.
     */
    Product.get = function (handle) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.request({ endpoint: "/products/" + handle + ".json" })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, transformResponse(response.response).product];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Product;
}(Shopify));
exports.Product = Product;
/**
 * Shopify Collection API.
 */
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the collection by handle.
     * @param  handle - The collection handle.
     */
    Collection.get = function (handle) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.request({ endpoint: "/collections/" + handle + ".json" })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, transformResponse(response.response).collection];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the products in a collection.
     * @param handle - The collection handle.
     */
    Collection.getProducts = function (handle) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.request({ endpoint: "/collections/" + handle + "/products.json" })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, transformResponse(response.response).products];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Collection;
}(Shopify));
exports.Collection = Collection;

},{}]},{},[1])(1)
});
