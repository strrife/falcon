# List of components in @deity/falcon-ecommerce-uikit

### Existing Queries and Mutation classes:

> - ~~RequestPasswordResetMutation~~ - moved to @deity/falcon-shop-data
> - ~~ResetCustomerPasswordMutation~~ - renamed to ResetPasswordMutation and moved to @deity/falcon-shop-data

> - ~~ValidatePasswordTokenQuery~~ - moved to @deity/falcon-shop-data

---

> - ~~EditAddressMutation~~ - moved to @deity/falcon-shop-data
> - ~~AddAddressMutation~~ - moved to @deity/falcon-shop-data
> - ~~RemoveAddressMutation~~ - moved to @deity/falcon-shop-data
> - ~~AddressQuery~~ - moved to @deity/falcon-shop-data
> - ~~AddressListQuery~~ - moved to @deity/falcon-shop-data

---

- BlogPostQuery

---

> - ~~AddToCartMutation~~ - moved to @deity/falcon-shop-data
> - ~~RemoveCartItemMutation~~ - moved to @deity/falcon-shop-data
> - ~~UpdateCartItemMutation~~ - moved to @deity/falcon-shop-data
> - ~~ApplyCouponMutation~~ - moved to @deity/falcon-shop-data
> - ~~CancelCouponMutation~~ - moved to @deity/falcon-shop-data
> - ~~CartQuery~~ - moved to @deity/falcon-shop-data

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

> - ~~EditCustomerMutation~~ - moved to @deity/falcon-shop-data
> - ~~CustomerQuery~~ - moved to @deity/falcon-shop-data
> - ~~IsAuthenticatedQuery~~ - moved to @deity/falcon-shop-data

---

> - ~~UrlQuery~~ - moved to @deity/falcon-data

---

- MenuQuery

---

- MiniAccountQuery

---

> - ~~MiniCartQuery~~ - moved to @deity/falcon-ui-kit

---

- GetOrderQuery
- LastOrderQuery
- OrderListQuery

---

> - ~~ProductQuery~~ - moved to @deity/falcon-shop-data
> - ~~ProductListQuery~~ = moved to @deity/falcon-shop-data

---

> - ~~CloseSidebarMutation~~ - moved to @deity/falcon-ui-kit
> - ~~OpenSidebarMutation~~ - moved to @deity/falcon-ui-kit

---

- SignInMutation
- SignOutMutation
- SignUpMutation

---

> - ~~SortOrdersQuery~~ changed to `SortOrderListQuery` and moved to  @deity/falcon-data

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

> - ~~GET_BACKEND_CONFIG~~ - moved to @deity/falcon-data and @deity/falcon-shop-data
> - ~~SET_LOCALE~~ - moved to @deity/falcon-data


---

- GET_BLOG_POST
- GET_BLOG_POSTS

---

> - ~~ADD_TO_CART~~ - moved to @deity/falcon-shop-data
> - ~~REMOVE_CART_ITEM~~ - moved to @deity/falcon-shop-data
> - ~~UPDATE_CART_ITEM~~ - moved to @deity/falcon-shop-data
> - ~~APPLY_COUPON~~ - moved to @deity/falcon-shop-data
> - ~~CANCEL_COUPON~~ - moved to @deity/falcon-shop-data
> - ~~GET_CART~~ - moved to @deity/falcon-shop-data

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

> - ~~GET_URL~~ - moved to @deity/falcon-data

---

- GET_MENU

---

- GET_MINI_ACCOUNT

---

> - ~~GET_MINI_CART~~ - moved to @deity/falcon-ui-kit

---

- GET_ORDER
- GET_LAST_ORDER
- GET_ORDER_LIST

---

> - ~~GET_PRODUCT~~ - moved to @deity/falcon-shop-data
> - ~~GET_PRODUCT_LIST~~ - moved to @deity/falcon-shop-data

---

- OPEN_SIDEBAR_MUTATION
- CLOSE_SIDEBAR_MUTATION

---

- SIGN_IN_MUTATION
- SIGN_OUT_MUTATION
- SIGN_UP_MUTATION

---

> - ~~SORT_ORDERS_QUERY~~ changed to `GET_SORT_ORDER_LIST` and moved to @deity/falcon-data

### Existing TypeScript types and interfaces (without component props definitions):

> - ~~RequestPasswordResetVariables~~ - renamed to RequestPasswordResetVariables and moved to @deity/falcon-shop-data
> - ~~ResetCustomerPasswordVariables~~ - moved to @deity/falcon-shop-data

---

> - ~~AddressType~~ - changed to `Address` and moved to @deity/falcon-shop-extension
> - ~~AddressListData~~ - changed to `AddressListResponse` and moved to @deity/falcon-shop-data

---

> - ~~BackendConfig~~ - moved to @deity/falcon-data and @deity/falcon-shop-data
> - ~~SetLocaleData~~ - moved to @deity/falcon-data

---

- BlogPostType
- BlogPostQueryVariables
- BlogPostExcerptType
- BlogPagination
- BlogPosts (-> BlogPostList)
- BlogPostsQueryVariables (-> BlogPostListQueryVariables)

---

> - ~~CartData~~ - renamed to `CartResponse` and moved to @deity/falcon-shop-data

---

> - ~~Aggregation~~ - moved to @deity/falcon-data
> - ~~SelectionType~~ - moved to @deity/falcon-data
> - ~~AggregationBucket~~ - moved to @deity/falcon-data

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
> - ~~CustomerQueryData~~ - changed to `CustomerResponse` and moved to @deity/falcon-shop-data
> - ~~IsAuthenticatedQueryData~~ - changed to `IsAuthenticatedResponse` and moved to @deity/falcon-shop-data

---

> - ~~DynamicUrl~~ moved to @deity/falcon-data
> - ~~UrlQueryVariables~~ moved to @deity/falcon-data
> - ~~UrlQueryData~~ changed to `UrlResponse` and moved to @deity/falcon-data/dist/Url/UrlQuery

---

> - ~~EnsureTTIRenderProps~~ moved to @deity/falcon-front-kit

---

> - ~~FilterInput~~ moved to @deity/falcon-shop-extension
> - ~~FilterOperator~~ moved to @deity/falcon-shop-extension
> - ~~FilterData~~ moved to @deity/falcon-front-kit
> - ~~FilterOption~~ moved to @deity/falcon-front-kit
> - ~~FilterDataProviderRenderProps~~ changed to `FiltersDataProviderRenderProps` and moved to @deity/falcon-front-kit 
> - ~~MultipleFilterProps~~ moved to @deity/falcon-ui-kit
> - ~~SingleFilterProps~~ moved to @deity/falcon-ui-kit

---

> - ~~LocaleItem~~ moved to @deity/falcon-front-kit

---

> - ~~FieldRenderProps~~ - moved to @deity/falcon-ui-kit
> - ~~FieldProps~~ - moved to @deity/falcon-ui-kit
> - ~~FormContextValue~~ - moved to @deity/falcon-ui-kit
> - ~~FormContext~~ - moved to @deity/falcon-ui-kit
> - ~~formLayout~~ - moved to @deity/falcon-ui-kit and renamed to `form`
> - ~~FormProps~~ - moved to @deity/falcon-ui-kit
> - ~~FormFieldRenderProps~~ - moved to @deity/falcon-ui-kit
> - ~~FormFieldProps~~ - moved to @deity/falcon-ui-kit

---

> - ~~LocaleContextType~~ moved to @deity/falcon-front-kit
> - ~~LocaleContext~~ moved to @deity/falcon-front-kit

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

> - ~~Products~~ - moved to  moved to @deity/falcon-shop-data and renamed to `ProductList`

---

> - ~~SearchState~~ moved to @deity/falcon-ui-kit
> - ~~SearchContextType~~ changed to `SearchContextValue` and moved to @deity/falcon-ui-kit
> - ~~SearchContext~~ moved to @deity/falcon-ui-kit
> - ~~SearchConsumer~~ moved to @deity/falcon-ui-kit
> - ~~SearchProviderProps~~ moved to @deity/falcon-ui-kit

---

- SignInModel
- SignInData
- SignOutLogicRenderProps
- SignUpVariables (Variables?)

---

> - ~~SortOrderDirection~~ - moved to @deity/falcon-data
> - ~~SortOrderInput~~ - moved to @deity/falcon-data
- SortOrders ?
> - ~~SortOrdersData~~ changed to `SortOrderListResponse` and moved to @deity/falcon-dat

> - ~~Pagination~~ - moved to @deity/falcon-data
> - ~~PaginationQuery~~ - moved to @deity/falcon-data
> - ~~PaginationInput~~ - moved to @deity/falcon-data

### Existing UI components:

- ForgotPasswordForm
- ResetPassword
- InvalidToken
- ResetPasswordForm
- ResetPasswordSuccess

---

> - ~~AddressDetails~~ - moved to @deity/falcon-ui-kit/src/Address/AddressDetails.tsx
> - ~~AddressCardLayout~~ - moved to @deity/falcon-ui-kit/src/Address/AddressCard.tsx
> - ~~AddressCard~~ - moved to @deity/falcon-ui-kit/src/Address/AddressCard.tsx
> - ~~AddressListLayout~~ - moved to @deity/falcon-ui-kit/src/AddressListLayout.tsx

---

> - ~~BackendConfigQuery~~ moved to @deity/falcon-data
> - ~~SetLocaleMutation~~ moved to @deity/falcon-data

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
> - ~~SortOrderDropdownLayout~~ changed to `SortOrderPickerLayout` and moved to @deity/falcon-ui-kit
> - ~~SortOrderDropdown~~ changed to `SortOrderPicker` and moved to @deity/falcon-ui-kit
- TotalRow

---

- CountrySelector

---

- CreditCard

---

- NotFound

---

> - ~~ColorTile~~ moved to @deity/falcon-ui-kit
> - ~~ColorFilter~~ moved to @deity/falcon-ui-kit
> - ~~FilterSummary~~ moved to @deity/falcon-ui-kit and renamed to `FilterDetailsSummaryLayout`
> - ~~FilterDetails~~ moved to @deity/falcon-ui-kit
> - ~~FilterItemLayout~~ moved to @deity/falcon-ui-kit
> - ~~FilterItem~~ moved to @deity/falcon-ui-kit
> - ~~FilterItemList~~ moved to @deity/falcon-ui-kit and renamed to `FilterItemListLayout`
> - ~~FiltersLayout~~ moved to @deity/falcon-ui-kit and renamed to `FiltersPanelLayout`
> - ~~FiltersSummaryLayout~~ moved to @deity/falcon-ui-kit and renamed to `SelectedFilterList`
> - ~~FiltersSummary~~ moved to @deity/falcon-ui-kit
> - ~~FilterTile~~ moved to @deity/falcon-ui-kit
> - ~~MultipleFilter~~ moved to @deity/falcon-ui-kit
> - ~~SingleFilter~~ moved to @deity/falcon-ui-kit

---

- CopyrightLayout
- Copyright
- FooterLayout
- FooterSectionsLayout
- FooterSectionLayout
- FooterLink
- LanguageSection

> - ~~LocaleSwitcherDropdown~~ - moved to @deity/falcon-ui-kit and renamed to `LocalePicker`
> - ~~LocaleSwitcherRenderProps~~ moved to @deity/falcon-ui-kit and renamed to `LocalePickerProps`

- NewsletterLayout
- Newsletter

---

> - ~~FormErrorSummary~~ - moved to @deity/falcon-ui-kit
> - ~~FormFieldLayout~~ - moved to @deity/falcon-ui-kit
> - ~~FormFieldLabel~~ - moved to @deity/falcon-ui-kit
> - ~~FormFieldError~~ - moved to @deity/falcon-ui-kit
> - ~~FormField~~ - moved to @deity/falcon-front-kit
> - ~~getDefaultInputTypeValidator~~ - moved to @deity/falcon-front-kit and renamed to `inputTypeToDefaultValidatorsMapper`
> - ~~passwordValidator~~ - moved to @deity/falcon-front-kit
> - ~~emailValidator~~ - moved to @deity/falcon-front-kit


> - ~~CheckboxFormFieldLayout~~ - moved to @deity/falcon-ui-kit
> - ~~CheckboxFormField~~ - moved to @deity/falcon-ui-kit
> - ~~RadioFormFieldLayout~~ - moved to @deity/falcon-ui-kit
> - ~~RadioFormField~~ - moved to @deity/falcon-ui-kit
> - ~~FormSubmit~~ - moved to @deity/falcon-ui-kit
> - ~~PasswordRevealInput~~ - moved to @deity/falcon-ui-kit

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
  > - ~~MiniFormLayout~~ - renamed to SidebarLayout and moved to @deity/falcon-ui-kit
- SignIn
- SignUp

---

- MiniCart
- MiniCartIcon

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
> - ~~ProductLayout~~ - renamed to `PageLayout` and moved to @deity/falcon-ui-kit
> - ~~ProductDescriptionLayout~~ - renamed to `ProductLayout` moved to @deity/falcon-ui-kit
> - ~~Area~~ (product) - renamed to `ProductLayoutAreas` moved to @deity/falcon-ui-kit
> - ~~ProductDetailsLayout~~ - moved to @deity/falcon-ui-kit
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

> - ~~Responsive~~ - moved to @deity/falcon-ui-kit/src/Responsive/Responsive.tsx

---

- Sidebar

---

- ForgotPasswordTrigger
- SignInForm
- SignInIcon
- SignUpForm

---

> - ~~AppLayout~~ -moved to `@deity/falcon-ui-kit/src/Layouts/AppLayout.tsx`
> - ~~Breadcrumbs~~ - moved to @deity/falcon-ui-kit
- ~~FixCenteredLayout~~ moved to `@deity/falcon-ui-kit/src/Layouts/FixCenteredLayout.tsx`
- TwoColumnsLayout
- TwoStepWizard

### Existing "business level" components:

- CheckoutLogic

> - ~~DynamicRoute~~ moved to @deity/falcon-front-kit
> - ~~EnsureTTI~~ moved to @deity/falcon-front-kit
> - ~~ScrollToTop~~ moved to @deity/falcon-front-kit

> - ~~FiltersDataProvider~~ moved to @deity/falcon-front-kit
> - ~~LocaleSwitcher~~ moved to @deity/falcon-front-kit
> - ~~Field~~ moved to to @deity/falcon-front-kit
- Form
  > - ~~LocaleProvider~~ moved to @deity/falcon-front-kit
- ProductForm (it's not exported outside)
- ProductConfigurator

> - ~~Query~~ moved to @deity/falcon-data
> - ~~OnlyUnauthenticatedRoute~~ moved to @deity/falcon-front-kit
> - ~~ProtectedRoute~~ moved to @deity/falcon-front-kit
> - ~~Router~~ moved to @deity/falcon-front-kit

> - ~~SearchProvider~~ moved to @deity/falcon-front-kit
- SignOutLogic
> - ~~SortOrdersProvider~~ change to `SortOrderPickerProvider` and moved to @deity/falcon-front-kit
> - ~~AreSortOrderInputsEqual~~ changed to `areSortOrderInputsEqual` and moved to @deity/falcon-front-kit
> - ~~OnlineStatus~~ changed to `NetworkStatus` and moved to @deity/falcon-front-kit

