import XIcon from 'react-feather/dist/icons/x';
import Circle from 'react-feather/dist/icons/heart';
import CustomIcon from 'react-feather/dist/icons/airplay';
import ArrowUp from 'react-feather/dist/icons/arrow-up';
import ArrowDown from 'react-feather/dist/icons/arrow-down';
import { Theme } from '../src';

export const themeWithCustomBreadcrumbSeparator = (theme: Theme) => ({
  ...theme,
  ...{
    components: {
      breadcrumb: {
        css: {
          ':after': {
            content: '"/"'
          }
        }
      }
    }
  }
});

export const themeWithCustomCheckmark = (theme: Theme) => ({
  ...theme,
  ...{
    icons: {
      checkboxCheckmarkIcon: {
        icon: XIcon,
        fill: 'white'
      }
    }
  }
});

export const themeWithCustomRadioCheck = (theme: Theme) => ({
  ...theme,
  ...{
    icons: {
      radioCheckedIcon: {
        icon: Circle
      }
    }
  }
});

export const themeWithCustomIcon = (theme: Theme) => ({
  ...theme,
  ...{
    icons: {
      customIcon: {
        icon: CustomIcon
      }
    }
  }
});

export const themeWithCustomNumberIcons = (theme: Theme) => ({
  ...theme,
  ...{
    icons: {
      numberInputDown: {
        icon: ArrowDown
      },
      numberInputUp: {
        icon: ArrowUp
      }
    }
  }
});
