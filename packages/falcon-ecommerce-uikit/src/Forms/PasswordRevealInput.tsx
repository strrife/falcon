import React from 'react';
import { Input, Icon, Box, ThemedComponentProps } from '@deity/falcon-ui';

export class PasswordRevealInput extends React.Component<
  ThemedComponentProps & React.InputHTMLAttributes<HTMLInputElement>,
  { isRevealed: boolean }
> {
  state = {
    isRevealed: false
  };

  toggleInputType = () => {
    this.setState(state => ({
      isRevealed: !state.isRevealed
    }));
  };

  render() {
    const { isRevealed } = this.state;
    const inputType = isRevealed ? 'text' : 'password';

    return (
      <Box position="relative">
        <Input {...this.props} type={inputType} />
        <Box position="absolute" top={0} bottom={0} right={0} title={isRevealed ? 'Hide password' : 'Show password'}>
          <Icon
            onClick={this.toggleInputType}
            stroke={isRevealed ? 'primary' : 'black'}
            cursor="pointer"
            size="md"
            src={isRevealed ? 'eye' : 'eyeOff'}
            bg="white"
            m="xs"
          />
        </Box>
      </Box>
    );
  }
}
