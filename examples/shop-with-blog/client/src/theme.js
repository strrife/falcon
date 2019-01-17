import React from 'react';
import ShoppingCart from 'react-feather/dist/icons/shopping-cart';
import ChevronDown from 'react-feather/dist/icons/chevron-down';
import ChevronUp from 'react-feather/dist/icons/chevron-up';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import User from 'react-feather/dist/icons/user';
import Close from 'react-feather/dist/icons/x';
import LogOut from 'react-feather/dist/icons/log-out';
import Menu from 'react-feather/dist/icons/menu';
import Remove from 'react-feather/dist/icons/x-circle';
import ChevronsRight from 'react-feather/dist/icons/chevrons-right';
import ChevronsLeft from 'react-feather/dist/icons/chevrons-left';
import Lock from 'react-feather/dist/icons/lock';
import Trash from 'react-feather/dist/icons/trash-2';
import Check from 'react-feather/dist/icons/check';
import CheckCircle from 'react-feather/dist/icons/check-circle';
import Eye from 'react-feather/dist/icons/eye';
import EyeOff from 'react-feather/dist/icons/eye-off';
import Search from 'react-feather/dist/icons/search';
import { createTheme } from '@deity/falcon-ui';

export const deityGreenTheme = createTheme({
  colors: {
    primary: '#222222',
    primaryLight: '#95c110',
    bannerPrimary: '#464646',
    black: '#000000'
  },

  fonts: {
    sans: 'Source Sans Pro, sans-serif'
  },

  fontSizes: {
    xxs: 11,
    xs: 13,
    sm: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxxl: 52,

    // responsive fontsizes
    xxl: {
      xs: 32,
      md: 46,
      lg: 52
    }
  },

  fontWeights: {
    bold: 700
  },

  icons: {
    logo: {
      icon: props => (
        <svg
          {...props}
          width="40px"
          height="40px"
          viewBox="0 0 14 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <polyline
              id="path-1"
              points="7.153 0.004 0.413 3.896 0.413 11.681 7.155 15.574 13.898 11.681 13.898 3.896 7.157 0.004"
            />
            <polyline
              id="path-3"
              points="7.153 0.004 0.413 3.896 0.413 11.681 7.155 15.574 13.898 11.681 13.898 3.896 7.157 0.004"
            />
          </defs>
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Group-9" transform="translate(0.000000, -1.000000)">
              <polygon
                id="Fill-1"
                fill="#A9CF38"
                points="7.1534 1.0003 0.4134 4.8933 0.4134 12.6783 7.1554 16.5703 13.8974 12.6783 13.8974 4.8933 7.1564 1.0003"
              />
              <g id="Group-8" transform="translate(0.000000, 0.996600)">
                <g id="Group-4">
                  <mask id="mask-2" fill="white">
                    <use xlinkHref="#path-1" />
                  </mask>
                  <g id="Clip-3" />
                  <path
                    d="M11.7011,9.3142 C9.9491,8.2502 8.3071,8.8672 6.6651,9.4782 C7.5221,9.4002 8.3791,9.3222 9.2791,9.2412 C8.0521,12.7992 9.2151,15.8512 10.8601,18.8232 C10.8021,18.8822 10.7431,18.9412 10.6841,19.0002 C9.8201,18.2222 8.9281,17.4722 8.0971,16.6592 C6.3621,14.9642 5.2401,12.9352 4.9001,10.5062 C4.8851,10.3972 4.8591,10.2882 4.8471,10.1772 C4.6631,8.3452 4.8801,8.0432 6.6841,7.6132 C6.8731,7.5682 7.0601,7.5182 7.2491,7.4712 C8.4461,7.1702 8.5341,6.9682 7.9551,5.8672 C6.8271,3.7222 4.9161,2.8372 2.4431,3.3712 C1.5821,3.5572 0.7461,3.8572 0.0001,4.0762 C1.9631,2.5202 5.2981,2.1232 7.6641,3.5292 C8.0851,3.7782 8.4171,4.1732 8.7981,4.4922 C9.0901,4.7362 9.3631,5.0312 9.6981,5.1912 C11.5551,6.0782 12.0941,7.1222 11.7011,9.3142"
                    id="Fill-2"
                    fill="#FFFFFF"
                    mask="url(#mask-2)"
                  />
                </g>
                <g id="Group-7">
                  <mask id="mask-4" fill="white">
                    <use xlinkHref="#path-3" />
                  </mask>
                  <g id="Clip-6" />
                  <path
                    d="M2.4931,4.4182 L5.8271,4.4182 C5.4891,4.9602 5.2671,5.3152 4.9641,5.8012 C4.4671,4.5442 3.4891,4.5482 2.4931,4.4182"
                    id="Fill-5"
                    fill="#FFFFFF"
                    mask="url(#mask-4)"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      ),
      stroke: 'none',
      css: {
        width: 'auto',
        height: '100%'
      }
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
      fill: 'primaryLight'
    },
    cart: { icon: ShoppingCart },
    user: { icon: User },
    search: { icon: Search },
    arrowRight: { icon: ChevronRight },
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
    menu: {
      icon: Menu,
      strokeWidth: 'sm'
    },
    prevPage: {
      icon: ChevronsLeft,
      stroke: 'black'
    },
    lock: { icon: Lock },
    trash: { icon: Trash },
    check: { icon: Check },
    checkCircle: { icon: CheckCircle },
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
    h1: {
      fontWeight: 'regular',
      fontSize: 'xxl'
    },

    h4: {
      fontWeight: 'demibold'
    },

    appLayout: {
      px: 0,
      css: {
        maxWidth: 'none'
      }
    },

    productListLayout: {
      gridGap: 'xl',
      py: 'xl',
      fontSize: 'sm'
    },

    productLayout: {
      p: 'xl',
      css: {
        margin: 'auto',
        maxWidth: 1280
      }
    },

    radio: {
      size: 'sm',
      css: ({ theme }) => ({
        '.-inner-radio-frame': {
          height: '100%',
          width: '100%',
          position: 'relative',
          display: 'flex',
          cursor: 'pointer',
          borderRadius: '0',
          border: theme.borders.bold,
          borderColor: theme.colors.secondaryDark,
          transitionProperty: 'border, fill',
          transitionTimingFunction: theme.easingFunctions.easeIn,
          transitionDuration: theme.transitionDurations.short,
          justifyContent: 'center',
          alignItems: 'center'
        }
      })
    },

    icon: {
      stroke: 'black',
      size: 'md',
      transitionTimingFunction: 'easeInOut',
      transitionDuration: 'standard',
      css: {
        strokeWidth: '1px',
        ':hover': {
          opacity: '0.7'
        }
      }
    },

    searchbarLayout: {
      gridTemplate: '"leftMenu logo rightMenu" / auto 1fr auto',
      alignItems: 'center',
      my: 'none',
      gridGap: 'sm',
      py: 'sm',
      px: 'xl',
      css: {
        maxWidth: 1280,
        margin: '0 auto',
        justifyItems: 'center'
      }
    },

    bannerLayout: {
      bgFullWidth: 'bannerPrimary',
      color: 'white',
      fontSize: 'xs',
      fontWeight: 'light',
      py: 'xs',
      ml: 'sm',
      justifyContent: 'center'
    },

    cartLayout: {
      p: 'xl',
      css: {
        maxWidth: 1280,
        margin: 'auto'
      }
    },

    checkoutLayout: {
      p: 'xl',
      css: ({ theme }) => ({
        maxWidth: 1280,
        margin: `${theme.spacing.lg}px auto`
      })
    },

    productsCategory: {
      p: 'xl',
      css: {
        margin: 'auto',
        maxWidth: 1280
      }
    },

    listItem: {
      fontWeight: 'regular',
      transitionTimingFunction: 'easeIn',
      transitionDuration: 'short',
      px: 'none',

      css: ({ theme }) => ({
        ':hover': {
          color: theme.colors.primaryLight
        }
      })
    },

    breadcrumb: {
      css: ({ theme }) => ({
        ':last-child': {
          pointerEvents: 'none',
          fontWeight: theme.fontWeights.bold,
          color: theme.colors.primaryLight,
          '::after': {
            display: 'none'
          }
        }
      })
    },

    navbar: {
      bgFullWidth: 'transparent',
      color: 'black',
      display: {
        xs: 'none',
        md: 'flex'
      },
      css: {
        fontWeight: '500',
        zIndex: 2,
        borderTop: '1px solid #d0d0d0',
        borderBottom: '1px solid #d0d0d0',
        justifyContent: 'center'
      }
    },

    navbarItem: {
      color: 'black',
      transitionTimingFunction: 'easeIn',
      transitionDuration: 'short',

      css: ({ theme }) => ({
        ':hover': {
          color: theme.colors.primaryLight
        }
      })
    },

    navbarItemMenu: {
      px: 'xl',
      css: {
        maxWidth: 1280,
        margin: '0 auto',
        borderTop: '1px solid #d0d0d0'
      }
    },

    sidebar: {
      p: 'md',
      boxShadow: 'subtle',
      transitionTimingFunction: 'easeOut',
      css: {
        boxSizing: 'border-box',
        width: {
          xs: '80vw',
          sm: 480
        }
      }
    },

    subheroGrid: {
      gridTemplate: {
        xs: 'none',
        sm: '"0 1" / 1fr 1fr'
      }
    },

    badge: {
      bg: 'primaryLight',
      color: 'black'
    },

    button: {
      px: 'xl',
      height: 'lg',
      bg: 'black',
      fontSize: 'sm',
      fontWeight: 'demiBold',
      borderRadius: 'none',
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

            ':hover:enabled': {
              borderColor: 'none',
              borderRightColor: 'none',
              backgroundColor: 'none'
            }
          })
        },
        secondary: {
          color: 'black'
        },
        cta: {
          height: 'xl',
          css: props => ({
            color: props.theme.colors.white,
            backgroundColor: props.theme.colors.primary
          })
        }
      }
    }
  }
});

export const globalCss = {
  body: {
    margin: 0
  },
  html: {
    overflowY: 'scroll'
  }
};
