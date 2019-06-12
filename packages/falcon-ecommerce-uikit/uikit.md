# List of components in @deity/falcon-ecommerce-uikit

### Existing Queries and Mutation classes:

- RequestPasswordResetMutation
- ResetCustomerPasswordMutation
- ValidatePasswordTokenQuery

---

> - ~~EditAddressMutation~~ - moved to @deity/falcon-shop
> - ~~AddAddressMutation~~ - moved to @deity/falcon-shop
> - ~~RemoveAddressMutation~~ - moved to @deity/falcon-shop
> - ~~AddressQuery~~ - moved to @deity/falcon-shop
> - ~~AddressListQuery~~ - moved to @deity/falcon-shop

---

- BlogPostQuery

---

- AddToCartMutation
- RemoveCartItemMutation
- UpdateCartItemMutation
- ApplyCouponMutation
- CancelCouponMutation
- CartQuery

---

- CategoryProductsQuery

---

- CheckoutShippingMethod
- CheckoutPaymentMethod
- CheckoutLogicInjectedProps
- CheckoutLogicProps
- EstimateShippingMethodsMutation
- SetShippingMutation
- PlaceOrderMutation

---

- CountriesQuery

---

- ChangePasswordMutation

---

> - ~~EditCustomerMutation~~ - moved to @deity/falcon-shop
> - ~~CustomerQuery~~ - moved to @deity/falcon-shop
> - ~~IsAuthenticatedQuery~~ - moved to @deity/falcon-shop

---

- UrlQuery

---

- MenuQuery

---

- MiniAccountQuery

---

- MiniCartQuery

---

- GetOrderQuery
- LastOrderQuery
- OrderListQuery

---

- ProductQuery
- ProductListQuery

---

- CloseSidebarMutation
- OpenSidebarMutation

---

- SignInMutation
- SignOutMutation
- SignUpMutation

---

- SortOrdersQuery

### Existing constants:

- REQUEST_CUSTOMER_PASSWORD_RESET_TOKEN_MUTATION
- RESET_CUSTOMER_PASSWORD_MUTATION
- VALIDATE_PASSWORD_TOKEN_QUERY

---

> - ~~EDIT_ADDRESS~~ - moved to @deity/falcon-shop
> - ~~ADD_ADDRESS~~ - moved to @deity/falcon-shop
> - ~~REMOVE_ADDRESS~~ - moved to @deity/falcon-shop
> - ~~GET_ADDRESS~~ - moved to @deity/falcon-shop
> - ~~GET_ADDRESSES_LIST~~ - moved to @deity/falcon-shop

---

- GET_BACKEND_CONFIG
- SET_LOCALE

---

- GET_BLOG_POST
- GET_BLOG_POSTS

---

- ADD_TO_CART
- REMOVE_CART_ITEM
- UPDATE_CART_ITEM
- APPLY_COUPON
- CANCEL_COUPON
- GET_CART

---

- GET_CATEGORY_PRODUCTS

---

- ESTIMATE_SHIPPING_METHODS
- SET_SHIPPING
- PLACE_ORDER

---

- GET_CONFIG (-> GET_CLIENT_CONFIG)

---

- GET_COUNTRIES

---

> - ~~CHANGE_PASSWORD~~ - moved to @deity/falcon-shop
> - ~~EDIT_CUSTOMER~~ - moved to @deity/falcon-shop
> - ~~GET_CUSTOMER~~ - moved to @deity/falcon-shop
> - ~~GET_CUSTOMER_WITH_ADDRESSES~~ - moved to @deity/falcon-shop
> - ~~GET_IS_AUTHENTICATED~~ - moved to @deity/falcon-shop

---

- GET_URL

---

- GET_MENU

---

- GET_MINI_ACCOUNT

---

- GET_MINI_CART

---

- GET_ORDER
- GET_LAST_ORDER
- GET_ORDER_LIST

---

- GET_PRODUCT
- GET_PRODUCT_LIST

---

- OPEN_SIDEBAR_MUTATION
- CLOSE_SIDEBAR_MUTATION

---

- SIGN_IN_MUTATION
- SIGN_OUT_MUTATION
- SIGN_UP_MUTATION

---

- SORT_ORDERS_QUERY

### Existing TypeScript types and interfaces (without component props definitions):

- RequestPasswordResetVariables
- RequestPasswordResetMutationVariables
- ResetCustomerPasswordVariables

---

> - ~~AddressType~~ - changed to `Address` and moved to @deity/falcon-shop-extension
> - ~~AddressListData~~ - changed to `AddressListResponse` and moved to @deity/falcon-shop-data

---

- BackendConfig
- SetLocaleData

---

- BlogPostType
- BlogPostQueryVariables
- BlogPostExcerptType
- BlogPagination
- BlogPosts (-> BlogPostList)
- BlogPostsQueryVariables (-> BlogPostListQueryVariables)

---

- CartData

---

- Aggregation
- SelectionType
- AggregationBucket

---

- EstimateShippingMethodsData
- SetShippingData
- PlaceOrderSuccessfulResult
- PlaceOrder3dSecureResult
- PlaceOrder3dSecureField
- PlaceOrderResult

---

- ConfigQuery (-> ClientConfigQuery)

---

- Country
- CountriesData

---

- CreditCardState

---

> - ~~Customer~~ - moved to @deity/falcon-shop-extension
> - ~~CustomerQueryData~~ - changed to `CustomerQueryResponse` and moved to @deity/falcon-shop-data
> - ~~IsAuthenticatedQueryData~~ - changed to `IsAuthenticatedQueryResponse` and moved to @deity/falcon-shop-data

---

- DynamicUrl
- UrlQueryVariables
- UrlQueryData

---

- EnsureTTIRenderProps

---

- FilterData
- FilterOption
- FilterDataProviderRenderProps
- MultipleFilterProps
- SingleFilterProps

---

- LocaleItem

---

- FieldRenderProps
- FieldProps
- FormContextValue
- FormContext
- FormProps
- FormFieldRenderProps
- FormFieldProps

---

- LocaleContextType
- LocaleContext

---

- Menu
- MenuItem

---

- MiniAccountData

---

- MiniCartData

---

- Order
- OrderItem

---

- OrdersData

---

- Products

---

- SearchState
- SearchContextType
- SearchContext
- SearchConsumer
- SearchProviderProps

---

- SignInModel
- SignInData
- SignOutLogicRenderProps
- SignUpVariables (Variables?)

---

- SortOrderDirection
- SortOrderInput
- SortOrders
- SortOrdersData

### Existing UI components:

- ForgotPasswordForm
- ResetPassword
- InvalidToken
- ResetPasswordForm
- ResetPasswordSuccess

---

> - ~~AddressDetails~~ - moved to @deity/falcon-widgets/src/Address/AddressDetails.tsx
> - ~~AddressCardLayout~~ - moved to @deity/falcon-widgets/src/Address/AddressCard.tsx
> - ~~AddressCard~~ - moved to @deity/falcon-widgets/src/Address/AddressCard.tsx
> - ~~AddressListLayout~~ - moved to @deity/falcon-widgets/src/AddressListLayout.tsx

---

- BackendConfigQuery
- SetLocaleMutation

---

- BlogPost
- BlogPostExcerpt
- BlogPostsLayout
- BlogPostsPaginator
- CMSContent

---

- CategoryLayout
- ShowingOutOf
- ShowMore
- SortOrderDropdownLayout
- SortOrderDropdown
- TotalRow

---

- CountrySelector

---

- CreditCard

---

- NotFound

---

- ColorTile
- ColorFilter
- FilterSummary
- FilterDetails
- FilterItemLayout
- FilterItem
- FilterItemList
- FiltersLayout
- FiltersSummaryLayout
- FiltersSummary
- FilterTile
- MultipleFilter
- SingleFilter

---

- CopyrightLayout
- Copyright
- FooterLayout
- FooterSectionsLayout
- FooterSectionLayout
- FooterLink
- LanguageSection
- LocaleSwitcherDropdown
- LocaleSwitcherRenderProps
- NewsletterLayout
- Newsletter

---

- FormErrorSummary
- FormFieldLayout
- FormFieldLabel
- FormFieldError
- FormField
- CheckboxFormFieldLayout
- CheckboxFormField
- RadioFormFieldLayout
- RadioFormField
- FormSubmit
- PasswordRevealInput

---

- BannerLayout
- Banner
- Searchbar
- Header

---

- DateFormat
- Price

---

- MenuNavbar

---

- AccountIcon
- ForgotPassword
- MiniAccount
- MiniFormLayout
- SignIn
- SignUp

---

- MiniCart
- MiniCartIcon

---

- OnlineStatus

---

- OrderItemSummary

---

- NoOrders
- OrderList
- OrderListLayout
- OrderListItem
- OrderListHeader

---

- Option
- ProductConfigurableOptions
- ProductLayout
- ProductDetailsLayout
- Product
- ProductGallery
- NoProductImage
- ProductMeta
- EmptyProductListLayout
- EmptyProductList
- ProductCardLayout
- ProductCard
- ProductList
- Loader

---

> - ~~Responsive~~ - moved to `@deity/falcon-uikit/src/AddressListLayout.tsx`
---

- Sidebar

---

- ForgotPasswordTrigger
- SignInForm
- SignInIcon
- SignUpForm

---

 -  ~~AppLayout~~ -moved to `@deity/falcon-uikit/src/Layouts/AppLayout.tsx`
- Breadcrumbs
- FixCenteredLayout
- TwoColumnsLayout
- TwoStepWizard

### Existing "business level" components:

- CheckoutLogic
- DynamicRoute
- EnsureTTI
- FiltersDataProvider
- LocaleSwitcher
- Field
- Form
- LocaleProvider
- ProductForm (it's not exported outside)
- ProductConfigurator
- Query
- OnlyUnauthenticatedRoute
- ProtectedRoute
- Router
- SearchProvider
- SignOutLogic
- SortOrdersProvider
