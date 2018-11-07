import React from 'react';
import PropTypes from 'prop-types';
import { Price, ApplyCouponMutation, CancelCouponMutation, toGridTemplate } from '@deity/falcon-ecommerce-uikit';
import { Box, Divider, Input, Button, Text, Icon } from '@deity/falcon-ui';
import { Formik, Form } from 'formik';
import { adopt } from 'react-adopt';

const TOTALS = {
  SHIPPING: 'shipping',
  SUBTOTAL: 'subtotal',
  GRAND_TOTAL: 'grand_total',
  DISCOUNT: 'discount'
};

export const CartSummaryArea = {
  coupon: 'coupon',
  totals: 'totals',
  divider: 'divider'
};

const cartSummaryLayout = {
  cartSummaryLayout: {
    display: 'grid',
    gridGap: {
      xs: 'sm',
      md: 'md'
    },
    my: 'lg',
    // prettier-ignore
    gridTemplate: {
      xs: toGridTemplate([
        ['1fr'                    ],
        [CartSummaryArea.coupon   ], 
        [CartSummaryArea.divider  ], 
        [CartSummaryArea.totals   ]
      ]),
      md: toGridTemplate([
        ['1fr',                   '1px',                    '3fr'                 ],
        [CartSummaryArea.coupon,  CartSummaryArea.divider,  CartSummaryArea.totals]
      ])
    }
  }
};

const ApplyCouponForm = adopt({
  applyCouponMutation: ({ render }) => (
    <ApplyCouponMutation>{(applyCoupon, result) => render({ applyCoupon, result })}</ApplyCouponMutation>
  ),

  cancelCouponMutation: ({ render }) => (
    <CancelCouponMutation>{(cancelCoupon, result) => render({ cancelCoupon, result })}</CancelCouponMutation>
  ),

  formik: ({ couponCode, applyCouponMutation, cancelCouponMutation, validate, render }) => (
    <Formik
      initialValues={{ couponCode }}
      validate={validate}
      onSubmit={values => {
        if (!couponCode) {
          applyCouponMutation.applyCoupon({
            variables: {
              input: {
                ...values
              }
            }
          });
        } else {
          cancelCouponMutation.cancelCoupon();
        }
      }}
    >
      {(...props) => <Form>{render(...props)}</Form>}
    </Formik>
  )
});

// helper that returns particular total by its code
const getTotalByCode = (totals, code) => totals.find(total => total.code === code);

const TotalRow = ({ total, fontWeight = 'normal' }) =>
  total ? (
    <Box display="flex">
      <Text fontWeight={fontWeight} flex="1">
        {total.title}
      </Text>
      <Price fontWeight={fontWeight} value={total.value} />
    </Box>
  ) : null;

const CartSummary = ({ totals, couponCode, translations }) => (
  <Box mt="md" defaultTheme={cartSummaryLayout}>
    <Box gridArea={CartSummaryArea.coupon}>
      <ApplyCouponForm
        couponCode={couponCode}
        validate={values => {
          if (!values.couponCode) {
            return {
              couponCode: translations.invalidCouponCode
            };
          }
        }}
      >
        {({
          applyCouponMutation: { result: applyCouponResult },
          cancelCouponMutation: { result: cancelCouponResult },
          formik: { errors, handleChange, handleBlur, values }
        }) => (
          <Box display="flex" flexDirection="column" alignItems="stretch">
            <Text>{translations.couponCode}</Text>
            <Input
              my="xs"
              type="text"
              disabled={!!couponCode}
              name="couponCode"
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={couponCode}
            />
            <Button
              type="submit"
              disabled={
                applyCouponResult.loading || cancelCouponResult.loading || !values.couponCode || errors.couponCode
              }
              my="xs"
            >
              {(applyCouponResult.loading || cancelCouponResult.loading) && (
                <Icon src="loader" size="md" mr="sm" fill="secondaryLight" />
              )}
              {couponCode ? translations.cancelCouponCode : translations.applyCouponCode}
            </Button>
            {!errors.couponCode &&
              !!applyCouponResult.error && (
                <Text fontSize="xs" color="error">
                  {applyCouponResult.error.message}
                </Text>
              )}
          </Box>
        )}
      </ApplyCouponForm>
    </Box>
    <Box
      gridArea={CartSummaryArea.divider}
      css={({ theme }) => ({
        ':after': {
          content: '" "',
          display: 'block',
          width: '100%',
          height: '100%',
          minWidth: '1px',
          minHeight: '1px',
          backgroundColor: theme.colors.secondaryDark
        }
      })}
    />
    <Box gridArea={CartSummaryArea.totals}>
      <TotalRow total={getTotalByCode(totals, TOTALS.SUBTOTAL)} />
      <TotalRow total={getTotalByCode(totals, TOTALS.SHIPPING)} />
      <TotalRow total={getTotalByCode(totals, TOTALS.DISCOUNT)} />
      <Divider my="xs" />
      <TotalRow total={getTotalByCode(totals, TOTALS.GRAND_TOTAL)} fontWeight="bold" />
    </Box>
  </Box>
);

CartSummary.propTypes = {
  totals: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.number
    })
  ),
  couponCode: PropTypes.string,
  translations: PropTypes.shape({
    couponCode: PropTypes.string,
    applyCouponCode: PropTypes.string,
    cancelCouponCode: PropTypes.string,
    invalidCouponCode: PropTypes.string
  })
};

export default CartSummary;
