import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Box, FlexLayout, Checkbox, Label, Details, DetailsContent, Text, Button } from '@deity/falcon-ui';
import AddressForm from '../components/AddressForm';
import ErrorList from '../components/ErrorList';
import SectionHeader from './CheckoutSectionHeader';
import AddressPicker from './AddressPicker';

const AddressSummary = ({ address = {} }) => (
  <Box>
    <Text>{`${address.firstname} ${address.lastname}`}</Text>
    <Text>{address.street}</Text>
    <Text>{`${address.postcode} ${address.city}`}</Text>
  </Box>
);

class AddressSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useTheSame: !!props.useTheSame,
      selectedAddressId: null
    };
  }

  submitAddress = values => {
    this.props.setAddress(values);
  };

  submitSelectedAddress = () => {
    const selectedAddressId = this.state.selectedAddressId || this.props.defaultSelected.id;
    const selectedAddress = this.props.availableAddresses.find(item => item.id === selectedAddressId);
    this.props.setAddress(selectedAddress);
  };

  render() {
    const {
      open,
      title,
      labelUseTheSame,
      setUseTheSame,
      selectedAddress,
      onEditRequested,
      submitLabel,
      errors,
      countries,
      availableAddresses,
      defaultSelected
    } = this.props;
    let header;
    let content;

    const initialAddressValue = {
      email: '',
      firstname: '',
      lastname: '',
      street: '',
      postcode: '',
      city: '',
      telephone: '',
      countryId: 'NL',
      ...selectedAddress
    };

    if (!open && selectedAddress) {
      header = (
        <SectionHeader
          title={title}
          onActionClick={onEditRequested}
          editLabel="Edit"
          complete
          summary={<AddressSummary address={selectedAddress} />}
        />
      );
    } else {
      header = <SectionHeader title={title} />;
    }

    let selectedAvailableAddress;
    // if available addresses are passed then we should display dropdown so the user can pick his saved address
    if (availableAddresses) {
      // compute address that should be selected in the dropdown
      if (this.state.selectedAddressId) {
        // if we have locally selected address id then use it
        selectedAvailableAddress = availableAddresses.find(item => item.id === this.state.selectedAddressId);
      } else if (selectedAddress && selectedAddress.id) {
        // if there's passed selected address then use it
        selectedAvailableAddress = availableAddresses.find(item => item.id === selectedAddress.id);
      } else if (defaultSelected) {
        // if default that should be selected is passed then use it
        selectedAvailableAddress = availableAddresses.find(item => item.id === defaultSelected.id);
      }
    }

    const addressEditor = (
      <React.Fragment>
        {availableAddresses && (
          <AddressPicker
            addresses={availableAddresses}
            selectedAddressId={selectedAvailableAddress ? selectedAvailableAddress.id : 0}
            onChange={id => this.setState({ selectedAddressId: id })}
          />
        )}
        {!selectedAvailableAddress && (
          <Formik initialValues={initialAddressValue} onSubmit={this.submitAddress}>
            {() => <AddressForm countries={countries} submitLabel={submitLabel} />}
          </Formik>
        )}
        {!!selectedAvailableAddress && (
          <Button my="sm" onClick={this.submitSelectedAddress}>
            Continue
          </Button>
        )}
      </React.Fragment>
    );

    if (setUseTheSame) {
      content = (
        <React.Fragment>
          <FlexLayout mb="md">
            <Checkbox
              id="use-default"
              size="sm"
              checked={this.state.useTheSame}
              onChange={ev => this.setState({ useTheSame: ev.target.checked })}
            />
            <Label ml="xs" htmlFor="use-default">
              {labelUseTheSame}
            </Label>
          </FlexLayout>

          {this.state.useTheSame ? (
            <Button onClick={() => this.props.setUseTheSame(true)}>Continue</Button>
          ) : (
            addressEditor
          )}
        </React.Fragment>
      );
    } else if (availableAddresses) {
      content = addressEditor;
    } else {
      content = (
        <Formik initialValues={initialAddressValue} onSubmit={this.submitAddress}>
          {() => <AddressForm countries={countries} submitLabel={submitLabel} />}
        </Formik>
      );
    }

    return (
      <Details open={open}>
        {header}
        <DetailsContent>
          {content}
          <ErrorList errors={errors} />
        </DetailsContent>
      </Details>
    );
  }
}

AddressSection.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  selectedAddress: PropTypes.shape({}),
  setAddress: PropTypes.func,
  onEditRequested: PropTypes.func,
  useTheSame: PropTypes.bool,
  setUseTheSame: PropTypes.func,
  labelUseTheSame: PropTypes.string,
  submitLabel: PropTypes.string,
  availableAddresses: PropTypes.arrayOf(PropTypes.shape({})),
  defaultSelected: PropTypes.shape({}),
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      localName: PropTypes.string
    })
  ),
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string
    })
  )
};

export default AddressSection;
