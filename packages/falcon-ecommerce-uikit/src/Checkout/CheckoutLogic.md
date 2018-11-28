# CheckoutLogic

CheckoutLogic components realises business logic related to checkout flow.

It provides current state of the checkout process and methods for manipulating with checkout.

## Usage

`CheckoutLogic` provides all the data related to the checkout process via render props so it needs to be rendered as React component in the application:

```jsx
<CheckoutLogic>
  {checkoutLogicData => (
    <div>
      <Button onClick={checkoutLogicData.setEmail('foo@bar.com')}>Set email</Button>
    </div>
  )}
</CheckoutLogic>
```

## API

The following props are provided by `CheckoutLogic`:

- `loading` - flag that indicates that data loading/submitting is in progress
- `orderId` - order id that is set when order has been placed correctly
- `values` - map containing currently applied values:
  - `email` - user's email
  - `shippingAddress` - shipping address for the order
  - `billingAddres` - shipping address for the order
  - `billingSameAsShipping` - flag that indicates that billing address is the same as shipping. When it's set to true then setting of `shippingAddress` sets automatically `billingAddress` to the same value
  - `shippingMethod` - selected shipping method (shape of the data is the same as shipping method sent from backend)
  - `paymentMethod` - selected payment method (shape of the data is the same as payment method sent from backend)
- `availableShippingMethods` - avilable shipping methods retrieved from backend when `shippingMethod` is set correctly
- `availablePaymentMethods` - available payment methods retrieved from backend when `shippingAddress` is set correctly
- `setEmail(email)` - sets email value
- `setShippingAddress(address)` - sets shipping address and triggers computation of available shipping methods which will be placed in `availableShippingMethods`
- `setBillingAddress(address)` - sets billing address
- `setBillingSameAsShipping(value)` - sets `billingSameAsShipping` flag
- `setShippingMethod(shippingMethod)` - sets shipping method and triggers computation of available payment methods which will be placed in `availablePaymentMethods`
- `setPaymentMethod(paymentMethod)` - sets payment method
- `placeOrder()` - places order
