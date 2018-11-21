import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box, Text, Link, Input, Button, Details, DetailsContent } from '@deity/falcon-ui';
import {
  SignInForm,
  SignInFormContent,
  SignOutMutation,
  GET_CUSTOMER,
  toGridTemplate
} from '@deity/falcon-ecommerce-uikit';
import SectionHeader from './CheckoutSectionHeader';

const WIDGETS = {
  signInForm: 'signInForm',
  emailForm: 'emailForm'
};

const customerEmailFormLayout = {
  customerEmailFormLayout: {
    display: 'grid',
    my: 'xs',
    gridGap: 'sm',
    // prettier-ignore
    gridTemplate: {
      xs: toGridTemplate([
        ['1fr'   ],
        ['input' ],
        ['button']
      ]),
      md: toGridTemplate([
        ['2fr',   '1fr'  ],
        ['input', 'button']
      ])
    }
  }
};

class EmailForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.email
    };
  }

  render() {
    return (
      <Box>
        <Text>Type your email and continue as guest:</Text>
        <Box defaultTheme={customerEmailFormLayout}>
          <Input
            gridArea="input"
            type="text"
            name="email"
            value={this.state.email}
            onChange={ev => this.setState({ email: ev.target.value })}
          />
          <Button gridArea="button" onClick={() => this.props.setEmail(this.state.email)}>
            continue as guest
          </Button>
        </Box>
      </Box>
    );
  }
}

EmailForm.propTypes = {
  setEmail: PropTypes.func.isRequired,
  email: PropTypes.string
};

class EmailSection extends React.Component {
  constructor(props) {
    super(props);

    let email = props.email || '';

    if (props.data && props.data.customer) {
      ({ email } = props.data.customer);
      props.setEmail(email);
    }

    this.state = {
      email: props.email,
      widget: WIDGETS.emailForm,
      getPrevProps: () => this.props
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      data: { customer: prevCustomer }
    } = prevState.getPrevProps();
    const {
      data: { customer: nextCustomer }
    } = nextProps;

    const { email: prevCustomerEmail } = prevCustomer || {};
    const { email: nextCustomerEmail } = nextCustomer || {};

    if (prevCustomerEmail !== nextCustomerEmail) {
      // user has signed in or out so we have to trigger setEmail() with the new value
      nextProps.setEmail(nextCustomerEmail);

      // if there's no email in nextProps then customer just signed out - in that case we trigger
      // edit process so wizard switches to correct section
      if (!nextCustomerEmail) {
        nextProps.onEditRequested();
      }

      return {
        ...prevState,
        email: nextCustomerEmail || ''
      };
    } else if (nextProps.email && !prevState.email) {
      return {
        ...prevState,
        email: nextProps.email || ''
      };
    }

    return null;
  }

  showEmailForm = () => this.setState({ widget: WIDGETS.emailForm });
  showLoginForm = () => this.setState({ widget: WIDGETS.signInForm });

  render() {
    let header;
    let content;
    const { open, data, onEditRequested } = this.props;
    const isSignedIn = !!data.customer;

    if (!open) {
      header = (
        <SignOutMutation>
          {signOut => (
            <SectionHeader
              title="Customer"
              editLabel={isSignedIn ? 'Sign out' : 'Edit'}
              onActionClick={
                isSignedIn
                  ? signOut
                  : () => {
                      this.showEmailForm();
                      onEditRequested();
                    }
              }
              complete
              summary={<Text>{this.state.email}</Text>}
            />
          )}
        </SignOutMutation>
      );
    } else {
      header = <SectionHeader title="Customer" />;
    }

    if (this.state.widget === WIDGETS.emailForm) {
      content = (
        <Box>
          <EmailForm email={this.state.email} setEmail={this.props.setEmail} />
          <Text>
            or
            <Link mx="xs" color="primary" onClick={this.showLoginForm}>
              sign in with your account
            </Link>
            if you are already registered
          </Text>
        </Box>
      );
    } else if (this.state.widget === WIDGETS.signInForm) {
      content = (
        <Box>
          <SignInForm>{props => <SignInFormContent hideHeader {...props} />}</SignInForm>
          <Text>
            or
            <Link mx="xs" color="primary" onClick={this.showEmailForm}>
              click here
            </Link>
            to continue as guest
          </Text>
        </Box>
      );
    }

    return (
      <Details open={open}>
        {header}
        {content ? <DetailsContent>{content}</DetailsContent> : null}
      </Details>
    );
  }
}

EmailSection.propTypes = {
  data: PropTypes.shape({}),
  email: PropTypes.string,
  setEmail: PropTypes.func.isRequired,
  onEditRequested: PropTypes.func,
  open: PropTypes.bool
};

EmailSection.defaultProps = {
  email: ''
};

export default graphql(GET_CUSTOMER)(EmailSection);
