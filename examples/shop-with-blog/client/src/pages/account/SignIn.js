import React from 'react';
import { SignInForm, SignInFormContent } from '@deity/falcon-ecommerce-uikit';

const SignIn = () => <SignInForm>{props => <SignInFormContent {...props} />}</SignInForm>;

export default SignIn;
