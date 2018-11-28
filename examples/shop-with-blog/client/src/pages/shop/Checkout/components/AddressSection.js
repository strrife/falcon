import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Box, FlexLayout, Checkbox, Label, Details, DetailsContent, Text, Button } from '@deity/falcon-ui';
import AddressForm from '../../components/AddressForm';
import ErrorList from '../../components/ErrorList';
import SectionHeader from './CheckoutSectionHeader';

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
      useDefault: !!props.useDefault
    };
  }

  submitAddress = values => {
    this.props.setAddress(values);
  };

  render() {
    const {
      open,
      title,
      labelUseDefault,
      setUseDefault,
      selectedAddress,
      onEditRequested,
      submitLabel,
      errors
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
      // todo: add CountriesQuery and display select field for countryId
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

    if (setUseDefault) {
      content = (
        <React.Fragment>
          <FlexLayout mb="md">
            <Checkbox
              id="use-default"
              size="sm"
              checked={this.state.useDefault}
              onChange={ev => this.setState({ useDefault: ev.target.checked })}
            />
            <Label ml="xs" htmlFor="use-default">
              {labelUseDefault}
            </Label>
          </FlexLayout>

          {this.state.useDefault ? (
            <Button onClick={() => this.props.setUseDefault(true)}>Continue</Button>
          ) : (
            <Formik initialValues={initialAddressValue} onSubmit={this.submitAddress}>
              {() => <AddressForm />}
            </Formik>
          )}
        </React.Fragment>
      );
    } else {
      content = (
        <Formik initialValues={initialAddressValue} onSubmit={this.submitAddress}>
          {() => <AddressForm submitLabel={submitLabel} />}
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
  useDefault: PropTypes.bool,
  setUseDefault: PropTypes.func,
  labelUseDefault: PropTypes.string,
  submitLabel: PropTypes.string,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string
    })
  )
};

export default AddressSection;
