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

> - ~~CategoryProductsQuery~~ renamed to `CategoryWithProductsQuery` moved to @deity/falcon-shop-data

---

- CheckoutShippingMethod
- CheckoutPaymentMethod
- CheckoutLogicInjectedProps
- CheckoutLogicProps
- EstimateShippingMethodsMutation
- SetShippingMutation
- PlaceOrderMutation

---

> - ~~CountriesQuery~~ - renamed to `CountryListQuery` and moved to @deity/falcon-shop-data

---

- ChangePasswordMutation

---

> - ~~EditCustomerMutation~~ - moved to @deity/falcon-shop-data
> - ~~CustomerQuery~~ - moved to @deity/falcon-shop-data
> - ~~IsAuthenticatedQuery~~ - moved to @deity/falcon-shop-data

---

> - ~~UrlQuery~~ - moved to @deity/falcon-data

---

> - ~~MenuQuery~~ - moved to '@deity/falcon-shop-data'

---

> - ~~MiniAccountQuery~~ renamed to `MiniCustomerQuery` and moved to @deity/falcon-shop-data 

---

> - ~~MiniCartQuery~~ - moved to @deity/falcon-shop-data

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

> - ~~SignInMutation~~ - moved to @deity/falcon-shop-data
> - ~~SignOutMutation~~ - moved to @deity/falcon-shop-data
> - ~~SignUpMutation~~ - moved to @deity/falcon-shop-data

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

> - ~~GET_CATEGORY_PRODUCTS~~ - renamed to `GET_CATEGORY_WITH_PRODUCTS` and moved to @deity/falcon-shop-data

---

- ESTIMATE_SHIPPING_METHODS
- SET_SHIPPING
- PLACE_ORDER

---

> - ~~GET_CONFIG~~ - renamed to GET_CLIENT_CONFIG and moved to @deity/falcon-front-kit

---

> - ~~GET_COUNTRIES~~ - renamed to `GET_COUNTRY_LIST` and moved to @deity/falcon-shop-data

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

> - ~~GET_MINI_ACCOUNT~~ - renamed to `GET_MINI_CUSTOMER` and moved to @deity/falcon-shop-data

---

> - ~~GET_MINI_CART~~ - moved to @deity/falcon-shop-data

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

> - ~~SIGN_IN_MUTATION~~ - moved to @deity/falcon-shop-data
> - ~~SIGN_OUT_MUTATION~~ - moved to @deity/falcon-shop-data
> - ~~SIGN_UP_MUTATION~~ - moved to @deity/falcon-shop-data

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

> - ~~ConfigQuery~~ renamed to ClientConfigQuery and moved to @deity/falcon-front-kit

---

> - ~~Country~~ - moved to @deity/falcon-shop-extension
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

> - ~~MiniAccountData~~ renamed to `MiniCustomerResponse` and moved to @deity/falcon-shop-data

---

> - ~~MiniCartData~~ -renamed to `MiniCartResponse` and moved to @deity/falcon-shop-data

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

- SignInModel ? 
- SignInData ? 
- SignOutLogicRenderProps
> - ~~SignUpVariables~~ moved to @deity/falcon-shop-extension and renamed to SignUpInput

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

> - ~~AddressDetails~~ - moved to @deity/falcon-ui-kit/src/Address/AddressDetails.tsx (extracted AddressDetailsLayout)
> - ~~addressToString~~ - moved to @deity/falcon-front-kit
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

> - ~~CategoryLayout~~ moved to @deity/falcon-ui-kit
> - ~~ShowingOutOf~~ moved to examples/shop-with-blog
> - ~~ShowMore~~ moved to examples/shop-with-blog
> - ~~SortOrderDropdownLayout~~ changed to `SortOrderPickerLayout` and moved to @deity/falcon-ui-kit
> - ~~SortOrderDropdown~~ changed to `SortOrderPicker` and moved to @deity/falcon-ui-kit
- TotalRow

---

> - ~~CountrySelector~~ renamed to CountryPicker and moved to @deity/falcon-ui-kit

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

> - ~~BannerLayout~~ renamed to HeaderBannerLayout moved to @deity/falcon-ui-kit
- Banner
- Searchbar
- Header

---

- DateFormat
- Price

---

> - ~~MenuNavbar~~ - moved to @deity/falcon-ui-kit

---

> - ~~AccountIcon~~ - moved to @deity/falcon-ui-kit
> - ~~ForgotPassword~~ - moved to @deity/falcon-ui-kit
> - ~~ResetPasswordFormProvider~~ extracted from `ForgotPassword` and moved to @deity/falcon-front-kit
> - ~~MiniAccount~~ - removed - because it should be located in example project, but it is not used anymore
> - ~~MiniFormLayout~~ - renamed to SidebarLayout and moved to @deity/falcon-ui-kit
> - ~~NewAccount~~ - extracted and moved to @deity/falcon-ui-kit
- SignIn
- SignUp

---

- MiniCart
> - ~~MiniCartIcon~~ - renamed to CartIcon moved to @deity/falcon-ui-kit

- OrderItemSummary

---

- NoOrders
- OrderList
- OrderListLayout
- OrderListItem
- OrderListHeader

---

> - ~~Option~~ - renamed to `ProductOption` and moved to @deity/falcon-ui-kit
> - ~~ProductConfigurableOptions~~ - renamed to `ProductOptionList` and moved to @deity/falcon-ui-kit
> - ~~ProductLayout~~ - renamed to `PageLayout` and moved to @deity/falcon-ui-kit
> - ~~ProductDescriptionLayout~~ - renamed to `ProductLayout` moved to @deity/falcon-ui-kit
> - ~~Area~~ (product) - renamed to `ProductLayoutAreas` moved to @deity/falcon-ui-kit
> - ~~ProductDetailsLayout~~ - moved to @deity/falcon-ui-kit
- Product
> - ~~ProductGallery~~ - moved to @deity/falcon-ui-kit
> - ~~NoProductImage~~ - renamed to `NoProductImagePlaceholder` and moved to @deity/falcon-ui-kit
> - ~~ProductMeta~~ - moved to @deity/falcon-ui-kit
> - ~~EmptyProductList~~ - moved to @deity/falcon-ui-kit
> - ~~EmptyProductListLayout~~ moved to @deity/falcon-ui-kit
> - ~~ProductCardLayout~~ moved to @deity/falcon-ui-kit
> - ~~ProductCard~~ moved to @deity/falcon-ui-kit
> - ~~ProductList~~ moved to @deity/falcon-ui-kit
> - ~~ProductListLayout~~ - moved to @deity/falcon-ui-kit
- Loader

---

> - ~~Responsive~~ - moved to @deity/falcon-ui-kit/src/Responsive/Responsive.tsx

---

- Sidebar

---

> - ~~ForgotPasswordTrigger~~ - moved to @deity/falcon-ui-kit
> - ~~SignInForm~~ - moved to @deity/falcon-ui-kit and extracted SignInFormProvider to @deity/falcon-front-kit
> - ~~SignInIcon~~ - moved to @deity/falcon-ui-kit
> - ~~SignUpForm~~ - moved to @deity/falcon-ui-kit and extracted SignUpFormProvider to @deity/falcon-front-kit

---

> - ~~AppLayout~~ -moved to `@deity/falcon-ui-kit/src/Layouts/AppLayout.tsx`
> - ~~Breadcrumbs~~ - moved to @deity/falcon-ui-kit
> - ~~FixCenteredLayout~~ - moved to `@deity/falcon-ui-kit/src/Layouts/FixCenteredLayout.tsx`
> - ~~TwoColumnsLayout~~ - moved to `@deity/falcon-ui-kit`
- TwoStepWizard

> - added `DeityLogo` into `@deity/falcon-ui-kit`

### Existing "business level" components:

- CheckoutLogic

> - ~~DynamicRoute~~ moved to @deity/falcon-front-kit
> - ~~EnsureTTI~~ moved to @deity/falcon-front-kit
> - ~~ScrollToTop~~ moved to @deity/falcon-front-kit

> - ~~FiltersDataProvider~~ moved to @deity/falcon-front-kit
> - ~~LocaleSwitcher~~ moved to @deity/falcon-front-kit
> - ~~Field~~ moved to to @deity/falcon-front-kit
> - ~~Form~~ moved to to @deity/falcon-front-kit
> - ~~LocaleProvider~~ moved to @deity/falcon-front-kit
> - ~~ProductForm ~~ extracted AddToCartFormProvider and moved to @deity/falcon-front-kit
> - ~~ProductConfigurator~~ moved to @deity/falcon-front-kit but, not used and extracted two functions and moved them into @deity/falcon-front-kit/productConfigurableOptionMappers

> - ~~Query~~ moved to @deity/falcon-data
> - ~~OnlyUnauthenticatedRoute~~ moved to @deity/falcon-front-kit
> - ~~ProtectedRoute~~ moved to @deity/falcon-front-kit
> - ~~Router~~ moved to @deity/falcon-front-kit

> - ~~SearchProvider~~ moved to @deity/falcon-front-kit
- SignOutLogic
> - ~~SortOrdersProvider~~ change to `SortOrderPickerProvider` and moved to @deity/falcon-front-kit
> - ~~AreSortOrderInputsEqual~~ changed to `areSortOrderInputsEqual` and moved to @deity/falcon-front-kit
> - ~~OnlineStatus~~ changed to `NetworkStatus` and moved to @deity/falcon-front-kit
