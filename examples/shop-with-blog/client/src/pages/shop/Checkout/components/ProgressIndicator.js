import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@deity/falcon-ui';

const progressIndicatorLayout = {
  progressIndicatorLayout: {
    display: 'flex'
  }
};

const STEP_POINT_SIZE = 20;

const Divider = () => (
  <Box
    flex="1"
    css={({ theme }) => ({
      borderTop: `1px solid ${theme.colors.secondaryText}`,
      transform: 'translateY(50%)'
    })}
  />
);

const StepItem = ({ item, isDone, isCurrent, isLast, isFirst }) => {
  const createItemCss = ({ theme }) => {
    let backgroundColor;
    let alignItems = 'flex-start';

    if (isCurrent) {
      backgroundColor = theme.colors.primary;
    } else if (isDone) {
      backgroundColor = theme.colors.black;
    } else {
      backgroundColor = 'transparent';
    }

    // text align changes for all except first on as it's correctly (left) aligned
    if (!isFirst) {
      alignItems = isLast ? 'flex-end' : 'center';
    }

    return {
      position: 'relative',
      zIndex: 1,
      borderRadius: STEP_POINT_SIZE,
      width: STEP_POINT_SIZE,
      height: STEP_POINT_SIZE,
      border: `1px solid ${theme.colors.black}`,
      background: backgroundColor,
      fontWeight: isCurrent ? theme.fontWeights.bold : theme.fontWeights.regular,
      overflow: 'visible', // so text is visible
      textTransform: 'capitalize',

      // align text items properly with flex
      display: 'flex',
      flexDirection: 'column',
      alignItems
    };
  };

  return (
    <React.Fragment>
      {!isFirst && <Divider />}
      <Box css={createItemCss}>
        <Text pt="md" fontSize="xs">
          {item}
        </Text>
      </Box>
    </React.Fragment>
  );
};

const CheckoutProgressIndicator = ({ steps, currentStep, ...props }) => {
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <Box defaultTheme={progressIndicatorLayout} {...props}>
      {steps.map((item, index) => (
        <StepItem
          key={item}
          item={item}
          isDone={index <= currentStepIndex}
          isCurrent={index === currentStepIndex}
          isFirst={index === 0}
          isLast={index === steps.length - 1}
        />
      ))}
    </Box>
  );
};

CheckoutProgressIndicator.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string),
  currentStep: PropTypes.string
};

export default CheckoutProgressIndicator;
