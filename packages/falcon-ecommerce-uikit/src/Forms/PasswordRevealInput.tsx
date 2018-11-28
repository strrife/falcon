import React from 'react';
import { Input, Icon, Box, ThemedComponentProps } from '@deity/falcon-ui';

export class PasswordRevealInput extends React.Component<
  ThemedComponentProps & React.InputHTMLAttributes<HTMLInputElement>,
  { isPasswordRevealed: boolean }
> {
  state = {
    isPasswordRevealed: false
  };

  toggleInputType = () => {
    this.setState(state => ({
      isPasswordRevealed: !state.isPasswordRevealed
    }));
  };

  render() {
    const { isPasswordRevealed } = this.state;
    const inputType = isPasswordRevealed ? 'text' : 'password';

    return (
      <Box position="relative">
        <Input {...this.props} type={inputType} />
        <Box
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          title={isPasswordRevealed ? 'Hide password' : 'Reveal password'}
        >
          <Icon
            onClick={this.toggleInputType}
            stroke={isPasswordRevealed ? 'primary' : 'black'}
            cursor="pointer"
            size="md"
            src={isPasswordRevealed ? 'eyeOff' : 'eye'}
            bg="white"
            m="xs"
          />
        </Box>
      </Box>
    );
  }
}
