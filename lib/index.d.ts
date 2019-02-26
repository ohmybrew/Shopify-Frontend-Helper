/**
 * Reprecents a Shopify request.
 */
export interface IShopifyRequest {
    endpoint: string;
    method?: string;
    data?: any;
    type?: XMLHttpRequestResponseType;
}
/**
 * Reprecents a standard hashtable.
 */
export interface IHashTable {
    [name: string]: any;
}
/**
 * Shopify API.
 */
declare class Shopify {
    /**
     * The base URL.
     */
    private static readonly baseURI;
    /**
     * Sends a request to cart.
     * @param params - The params for the registry.
     * @param params.method - The HTTP method.
     * @param params.endpoint - The endpoint of the URL.
     * @param params.data - The data to send to the endpoint.
     * @param params.type - The type of request.
     */
    static request({ method, endpoint, data, type }: IShopifyRequest): Promise<XMLHttpRequest>;
}
/**
 * Shopify Checkout API.
 */
export declare class Checkout extends Shopify {
    /**
     * Gets the checkout markup.
     */
    static checkout(): Promise<string>;
    /**
     * Applies a discount via URL.
     * @param discount - The discount code to apply.
     */
    static applyDiscount(discount: string): Promise<XMLHttpRequest>;
    /**
     * Verifies the discount code.
     * @param discount - The discount code to verify.
     */
    static verifyDiscount(discount?: string): Promise<boolean | IHashTable>;
}
/**
 * Shopify Cart API.
 */
export declare class Cart extends Shopify {
    /**
     * Cached cart data.
     */
    private static data;
    /**
     * Get the cart object.
     * @param cachedVersion - Cached cart or not.
     */
    static get(cachedVersion?: boolean): Promise<IHashTable>;
    /**
     * Adds an item to the cart.
     * @param data - The data to add.
     */
    static add(data: IHashTable | IHashTable[]): Promise<IHashTable>;
    /**
     * Updates the cart.
     * @param updates - The data to update (id => qty | [qty, qty, ...]).
     * @param note - The note to pass along.
     */
    static update(updates: IHashTable | number[], note?: string): Promise<IHashTable>;
    /**
     * Updates the cart attibutes.
     * @param attributes - The attribute to push.
     * @param notes - The note to pass along.
     */
    static attributes(attributes: IHashTable, note?: string): Promise<IHashTable>;
    /**
     * Updates the cart note.
     * @param note - The cart note.
     */
    static note(note: string): Promise<IHashTable>;
    /**
     * Changes a cart item.
     * @param data - The data to change.
     */
    static change(data: IHashTable): Promise<IHashTable>;
    /**
     * Removes an item from the cart.
     * @params id - The ID to remove.
     */
    static remove(id: number): Promise<IHashTable>;
    /**
     * Removes an item from the cart by line index.
     * @params line - The line index to remove.
     */
    static removeByLine(line: number): Promise<IHashTable>;
    /**
     * Clears the cart.
     */
    static clear(): Promise<XMLHttpRequest>;
}
/**
 * Shopify Product API.
 */
export declare class Product extends Shopify {
    /**
     * Get the product by handle.
     * @param handle - The product handle.
     */
    static get(handle: string): Promise<IHashTable | undefined>;
}
/**
 * Shopify Collection API.
 */
export declare class Collection extends Shopify {
    /**
     * Get the collection by handle.
     * @param  handle - The collection handle.
     */
    static get(handle: string): Promise<IHashTable | undefined>;
    /**
     * Get the products in a collection.
     * @param handle - The collection handle.
     */
    static getProducts(handle: string): Promise<IHashTable | undefined>;
}
export {};
