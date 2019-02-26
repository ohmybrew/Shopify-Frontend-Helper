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
 * Ensure we get back JSON object from an XHR request.
 * @param response - XHR response data.
 */
function transformResponse(response: IHashTable | string): IHashTable {
  // tslint:disable-next-line
  return response.constructor === String ? JSON.parse(response as string) : response;
}

/**
 * Shopify API.
 */
class Shopify {
  /**
   * The base URL.
   */
  private static readonly baseURI: string = `${window.location.protocol}//${window.location.hostname}`;

  /**
   * Sends a request to cart.
   * @param params - The params for the registry.
   * @param params.method - The HTTP method.
   * @param params.endpoint - The endpoint of the URL.
   * @param params.data - The data to send to the endpoint.
   * @param params.type - The type of request.
   */
  static request({ method = 'GET', endpoint, data, type = 'json' }: IShopifyRequest): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      // Generate the request object
      const xhr: XMLHttpRequest = new XMLHttpRequest();

      let adjustedEndpoint = endpoint;
      if (method === 'GET') {
        adjustedEndpoint += `?${Math.random().toString(36).substr(2, 10)}`;
      }

      // Build the request
      xhr.open(method, `${Shopify.baseURI}${adjustedEndpoint}`, true);
      xhr.responseType = type;
      if (type === 'json') {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      }

      // Resolve or rejust the promise, passing XHR to the promise
      xhr.onload = (): void => {
        if (xhr.status === 200) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };

      // Send the data
      xhr.send(data ? JSON.stringify(data) : null);
    });
  }
}

/**
 * Shopify Checkout API.
 */
export class Checkout extends Shopify {
  /**
   * Gets the checkout markup.
   */
  static async checkout(): Promise<string> {
    const response = await Checkout.request({ endpoint: '/checkout', type: 'text' });
    return response.responseText;
  }

  /**
   * Applies a discount via URL.
   * @param discount - The discount code to apply.
   */
  static async applyDiscount(discount: string): Promise<XMLHttpRequest> {
    /*
     * Use HEAD so we don't follow redirects.
     * Shopify seems to set some sort of server var to tell checkout
     * to apply the discount (not the discount_code cookie either).
     */
    return Checkout.request({ method: 'HEAD', endpoint: `/discount/${discount}` });
  }

  /**
   * Verifies the discount code.
   * @param discount - The discount code to verify.
   */
  static async verifyDiscount(discount?: string): Promise<boolean | IHashTable> {
    const response = await Checkout.checkout();
    const valid = response.indexOf('data-discount-success') > -1;

    if (valid) {
      // Parse the DOM, easy way
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(response, 'text/html');
      const htmlQs = (query: string) => (htmlDoc.querySelector(query) as HTMLElement);

      // Get specifics we need
      const discountCode = (
        htmlQs('[data-discount-success] .reduction-code__text') ||
        htmlQs('.applied-reduction-code__information')
      ).innerHTML.trim();
      const discountAmount = parseFloat(
        htmlQs('[data-checkout-discount-amount-target]').dataset.checkoutDiscountAmountTarget as string,
      );
      const discountType = htmlQs('[data-discount-type]').dataset.discountType;

      // Build the result object
      const result = {
        code: discountCode,
        type: discountType,
        discount: discountAmount,
      };

      // Check discount validity if discount code was passed into function
      if (discount !== undefined) {
        return result.code.toUpperCase() === discount.toUpperCase() ? result : false;
      }

      // Return result for no discount checking
      return result;
    }

    // Not a valid code
    return false;
  }
}

/**
 * Shopify Cart API.
 */
export class Cart extends Shopify {
  /**
   * Cached cart data.
   */
  private static data: IHashTable;

  /**
   * Get the cart object.
   * @param cachedVersion - Cached cart or not.
   */
  static async get(cachedVersion: boolean = false): Promise<IHashTable> {
    if (cachedVersion && Cart.data) {
      // Send the cached version
      return Cart.data;
    }

    try {
      // Do a new request
      const response = await Cart.request({ endpoint: '/cart.js' });
      Cart.data = transformResponse(response.response);

      return Cart.data;
    } catch (xhr) {
      return {
        response: xhr.response,
        status: xhr.status,
      };
    }
  }

  /**
   * Adds an item to the cart.
   * @param data - The data to add.
   */
  static async add(data: IHashTable | IHashTable[]): Promise<IHashTable> {
    if (data.constructor === Array) {
      // Sequental adding of products to prevent racing
      const tasks = [];
      data.forEach((cartData: IHashTable) => {
        tasks.push(() => Cart.request({ method: 'POST', endpoint: '/cart/add.js', data: cartData }));
      });
      return tasks.reduce((p, task) => p.then(task), Promise.resolve());
    }

    await Cart.request({ data, method: 'POST', endpoint: '/cart/add.js' });

    return Cart.get();
  }

  /**
   * Updates the cart.
   * @param updates - The data to update (id => qty | [qty, qty, ...]).
   * @param note - The note to pass along.
   */
  static async update(updates: IHashTable | number[], note?: string): Promise<IHashTable> {
    const response = await Cart.request({
      method: 'POST',
      endpoint: '/cart/update.js',
      data: { updates, note },
    });

    return transformResponse(response.response);
  }

  /**
   * Updates the cart attibutes.
   * @param attributes - The attribute to push.
   * @param notes - The note to pass along.
   */
  static async attributes(attributes: IHashTable, note?: string): Promise<IHashTable> {
    const response = await Cart.request({
      method: 'POST',
      endpoint: '/cart/update.js',
      data: { attributes, note },
    });

    return transformResponse(response.response);
  }

  /**
   * Updates the cart note.
   * @param note - The cart note.
   */
  static async note(note: string): Promise<IHashTable> {
    const response = await Cart.request({
      method: 'POST',
      endpoint: '/cart/update.js',
      data: { note },
    });

    return transformResponse(response.response);
  }

  /**
   * Changes a cart item.
   * @param data - The data to change.
   */
  static async change(data: IHashTable): Promise<IHashTable> {
    const response = await Cart.request({
      data,
      method: 'POST',
      endpoint: '/cart/change.js',
    });

    return transformResponse(response.response);
  }

  /**
   * Removes an item from the cart.
   * @params id - The ID to remove.
   */
  static async remove(id: number): Promise<IHashTable> {
    const data = {};
    data[id] = 0;

    return Cart.update(data);
  }

  /**
   * Removes an item from the cart by line index.
   * @params line - The line index to remove.
   */
  static async removeByLine(line: number): Promise<IHashTable> {
    return Cart.change({ line, quantity: 0 });
  }

  /**
   * Clears the cart.
   */
  static async clear(): Promise<XMLHttpRequest> {
    return Cart.request({
      method: 'POST',
      endpoint: '/cart/clear.js',
    });
  }
}

/**
 * Shopify Product API.
 */
export class Product extends Shopify {
  /**
   * Get the product by handle.
   * @param handle - The product handle.
   */
  static async get(handle: string): Promise<IHashTable | undefined> {
    try {
      const response = await this.request({ endpoint: `/products/${handle}.json` });
      return transformResponse(response.response).product;
    } catch (err) {
      return undefined;
    }
  }
}

/**
 * Shopify Collection API.
 */
export class Collection extends Shopify {
  /**
   * Get the collection by handle.
   * @param  handle - The collection handle.
   */
  static async get(handle: string): Promise<IHashTable | undefined> {
    try {
      const response = await this.request({ endpoint: `/collections/${handle}.json` });
      return transformResponse(response.response).collection;
    } catch (err) {
      return undefined;
    }
  }

  /**
   * Get the products in a collection.
   * @param handle - The collection handle.
   */
  static async getProducts(handle: string): Promise<IHashTable | undefined> {
    try {
      const response = await this.request({ endpoint: `/collections/${handle}/products.json` });
      return transformResponse(response.response).products;
    } catch (err) {
      return undefined;
    }
  }
}
