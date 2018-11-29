import React from 'react';
import ShoppingCart from 'react-feather/dist/icons/shopping-cart';
import ChevronDown from 'react-feather/dist/icons/chevron-down';
import ChevronUp from 'react-feather/dist/icons/chevron-up';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import User from 'react-feather/dist/icons/user';
import Close from 'react-feather/dist/icons/x';
import LogOut from 'react-feather/dist/icons/log-out';
import Remove from 'react-feather/dist/icons/x-circle';
import ChevronsRight from 'react-feather/dist/icons/chevrons-right';
import ChevronsLeft from 'react-feather/dist/icons/chevrons-left';
import Lock from 'react-feather/dist/icons/lock';
import Check from 'react-feather/dist/icons/check-circle';
import Eye from 'react-feather/dist/icons/eye';
import EyeOff from 'react-feather/dist/icons/eye-off';

import { createTheme } from '@deity/falcon-ui';
import logo from './assets/logo.svg';

export const deityGreenTheme = createTheme({
  colors: {
    primary: '#607e07',
    primaryLight: '#A9CF38'
  },

  fontWeights: {
    bold: 500
  },

  icons: {
    logo: {
      icon: props => <img src={logo} alt="logo" {...props} />,
      height: 'xxxl',
      width: 'auto',
      display: 'block'
    },
    loader: {
      icon: props => (
        <svg viewBox="0 0 50 50" {...props}>
          <path
            d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
            transform="rotate(241.969 25 25)"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      ),
      size: 'xxl',
      stroke: 'transparent',
      fill: 'primary'
    },
    cart: { icon: ShoppingCart },
    user: { icon: User },
    dropdownArrowDown: {
      icon: ChevronDown,
      size: 'md',
      ml: 'xs'
    },
    dropdownArrowUp: {
      icon: ChevronUp,
      size: 'md',
      ml: 'xs'
    },
    buttonArrowRight: {
      icon: ChevronRight,
      size: 'md',
      ml: 'xs',
      stroke: 'white'
    },
    close: {
      icon: Close,
      css: {
        cursor: 'pointer'
      }
    },
    logOut: { icon: LogOut },
    remove: { icon: Remove },
    nextPage: {
      icon: ChevronsRight,
      stroke: 'black'
    },
    prevPage: {
      icon: ChevronsLeft,
      stroke: 'black'
    },
    lock: { icon: Lock },
    check: { icon: Check },
    eye: { icon: Eye },
    eyeOff: { icon: EyeOff }
  },
  keyframes: {
    loader: {
      '0%': {
        transform: 'rotateZ(0)'
      },
      '100%': {
        transform: 'rotateZ(360deg)'
      }
    }
  },
  components: {
    breadcrumb: {
      css: ({ theme }) => ({
        ':last-child': {
          pointerEvents: 'none',
          fontWeight: theme.fontWeights.bold,
          color: theme.colors.primary,
          '::after': {
            display: 'none'
          }
        }
      })
    },

    navbar: {
      css: { zIndex: 2 }
    },
    sidebar: {
      px: 'sm',
      pt: 'sm',
      boxShadow: 'subtle',
      css: {
        boxSizing: 'border-box',
        width: {
          xs: '80vw',
          sm: 510
        }
      }
    },

    button: {
      px: 'xl',
      height: 'xl',
      css: {
        transitionProperty: 'all',
        textTransform: 'capitalize'
      },

      variants: {
        loader: {
          size: 'xl',
          borderRadius: 'round',
          border: 'bold',
          borderColor: 'primary',
          p: 'none',
          css: props => ({
            animation: `${props.theme.keyframes.loader} .8s linear infinite`,
            borderRightColor: props.theme.colors.white,
            background: 'none',
            fontSize: 0,
            whiteSpace: 'nowrap',
            cursor: 'default',
            overflow: 'hidden',

            ':hover': {
              borderColor: props.theme.colors.primaryLight,
              borderRightColor: props.theme.colors.white
            }
          })
        }
      }
    }
  }
});
