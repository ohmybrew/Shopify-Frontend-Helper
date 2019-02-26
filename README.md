# Shopify Frontend API

A basic JS/TS library for frontend Shopify API for common tasks.

Written in TypeScript with exports to plain Javascript and Browser (through Browserify).

## Installation

### Node

`npm i --save git://bitbucket.org:littlerocket/shopify-frontend-api`

### Browser

See `dist/sfa(.min).js`

## Usage Examples

Note: Promise is required, be sure to polyfill. Below examples are async/await but you can use standard Promise API as well.

### Javascript

```javascript
const { Collection, Product, Checkout, Cart } = require('scsm');

// Get the cart
const cart = await Cart.get();

// Add a single item
const cart = await Cart.add({ id: 20909233, quantity: 1, properties: { } });

// Add multiple items one-by-one
const cart = await Cart.add([
  { id: 20909233, quantity: 1, properties: { } },
  { id: 43243244, quantity: 1, properties: { special: true } },
]);

// Remove item
const cart = await Cart.remove(id);

// Remove item by line
const cart = await Cart.removeByLine(2);

// Update an item
const cart = await Cart.update({ 3839983: 3, 3893983: 1 });

// Update items quantities by line
const cart = await Cart.update([1, 3, 4]);

// Clear cart
await Cart.clear();

// Add a cart note
const cart = await Cart.note('Hey!');

// Add attributes
const cart = await Cart.attributes({ 'Test': true });

// Get product
const product = await Product.get('some-handle');

// Get collection
const collection = await Collection.get('some-handle');

// Get collection products
const products = await Collection.getProducts('some-handle');

// Get checkout
const checkout = await Checkout.get();

// Apply and verify a discount
const code = 'LD287';
await Checkout.applyDiscount(code);
const result = await Checkout.verifyDiscount(code);

if (!result) {
    console.log('Discount failed, not a good code');
}

console.log(result.discount); // Returns how much discount, and it worked!
```

### Javascript (Browser)

```html
<!-- layouts/theme.liquid -->
<!-- save sfa.min.js to assets/ -->
{{ 'sfa.min.js' | asset_url | script_url }}

<script>
 // All examples above, execept prefix with SFA
 // Example:
 SFA.Cart.get().then(function (cart) {
   console.log(cart);
 }
</script>
```

## Development

Code is written in TypeScript based in `src` directory.

`npm run build` will convert the TypeScript code to Javascript and place output into `lib` directory.

## Packaging

`npm prepare` will compile the TypeScript, run Babelify and Browserify.

This will output TypeScript compile to `lib` directory.
This will output minfied browser compatible Javascript to `dist` directory.

## Testing

Not yet tested.

## LICENSE

Released under the MIT License.
