import React from 'react';
import PropTypes from 'prop-types';
import { Label, FlexLayout, Details, DetailsContent, Text, Radio, Box, Button } from '@deity/falcon-ui';
import { Price } from '@deity/falcon-ecommerce-uikit';
import SectionHeader from './CheckoutSectionHeader';

const ShippingSelector = ({ availableShippingOptions = [], onShippingSelected }) => (
  <Box mt="md">
    {availableShippingOptions.map(option => (
      <FlexLayout key={option.carrierCode}>
        <Radio
          size="sm"
          id={`opt-${option.carrierCode}`}
          value={option.carrierCode}
          name="shipping"
          onChange={() => onShippingSelected(option)}
        />
        <Label mx="sm" flex="1" htmlFor={`opt-${option.carrierCode}`}>
          {`${option.carrierTitle} (${option.methodTitle}):`}
        </Label>
        <Price value={option.amount} />
      </FlexLayout>
    ))}
  </Box>
);

ShippingSelector.propTypes = {
  availableShippingOptions: PropTypes.arrayOf(PropTypes.shape({})),
  onShippingSelected: PropTypes.func
};

class ShippingSection extends React.Component {
  state = {
    selectedShipping: null
  };

  onShippingSelected = selectedShipping => this.setState({ selectedShipping });

  submitShipping = () => {
    this.props.setShipping(this.state.selectedShipping);
  };

  render() {
    const { open, onEditRequested, availableShippingMethods, selectedShipping } = this.props;
    let header;

    if (!open && selectedShipping) {
      header = (
        <SectionHeader
          title="Shipping"
          onActionClick={onEditRequested}
          editLabel="Edit"
          complete
          summary={<Text>{selectedShipping.carrierTitle}</Text>}
        />
      );
    } else {
      header = <SectionHeader title="Shipping" />;
    }

    return (
      <Details open={open}>
        {header}
        <DetailsContent>
          <ShippingSelector
            availableShippingOptions={availableShippingMethods}
            onShippingSelected={this.onShippingSelected}
          />
          <Button disabled={!this.state.selectedShipping} onClick={this.submitShipping}>
            Continue
          </Button>
        </DetailsContent>
      </Details>
    );
  }
}

ShippingSection.propTypes = {
  open: PropTypes.bool,
  availableShippingMethods: PropTypes.arrayOf(PropTypes.shape({})),
  onEditRequested: PropTypes.func,
  selectedShipping: PropTypes.shape({}),
  setShipping: PropTypes.func
};

export default ShippingSection;
