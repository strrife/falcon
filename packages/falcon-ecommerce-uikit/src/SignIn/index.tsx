export * from './SignInMutation';

// import React from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import { adopt } from 'react-adopt';
// import {
//   Sidebar,
//   H2,
//   Backdrop,
//   Portal,
//   Icon,
//   List,
//   ListItem,
//   Box,
//   H3,
//   DefaultThemeProps,
//   Image,
//   Link,
//   Divider,
//   Button,
//   Input,
//   Label,
//   Text
// } from '@deity/falcon-ui';
// import { MiniSignInData } from './MiniSignInQuery';
// import { ToggleMiniSignInMutation, SignInMutation } from './MiniSignInMutations';
// import { SidebarLayout } from '../SidebarLayout';
// import { CustomerQuery } from './../Customer';

// const SignInForm = adopt({
//   mutation: ({ render }) => <SignInMutation>{(signIn, result) => render({ signIn, result })}</SignInMutation>,
// formik: ({ mutation, render }) => (
//   <Formik
//       initialValues= {{ }}
// onSubmit = {(values: any) => {
//   const s = 1;

//   mutation.signIn({
//     variables: {
//       input: {
//         email: values.email,
//         password: values.password
//       }
//     }
//   });
// }}
//     >
//   {(...props) => <Form>{ render(...props) } < /Form>}
//     < /Formik>
//   )
// });
