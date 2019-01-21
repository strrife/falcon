import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T } from '@deity/falcon-i18n';
import { H3, Box, FlexLayout, Link, Menu, MenuItem, Text, Icon } from '@deity/falcon-ui';
import { withRouter } from 'react-router-dom';

const menuItemTheme = {
  menuItem: {
    flexDirection: 'column',
    color: 'primary',
    fontSize: 'md',
    p: 'sm',
    pr: 0,
    css: ({ theme }) => ({
      fontWeight: 'normal',
      alignContent: 'stretch',
      borderBottom: theme.borders.regular,
      borderColor: theme.colors.secondaryDark,
      '> div, > a': {
        cursor: 'pointer'
      },
      ':hover': {
        backgroundColor: 'transparent',
        borderColor: theme.colors.secondaryDark,
        // highlight arrow icon when user hovers menu item
        svg: {
          stroke: theme.colors.primaryLight
        }
      },
      // main sub-menu elements
      ul: {
        padding: 0,
        paddingLeft: theme.spacing.xs,
        flex: 1
      },
      'li:last-of-type': {
        borderBottom: 'none',
        borderColor: theme.colors.secondaryDark
      }
    })
  }
};

class MultiLevelMenuItemDOM extends React.Component {
  state = {
    submenuOpen: false
  };

  componentDidMount() {
    const { children } = this.props.item;
    if (children && children.length) {
      this.unlisten = this.props.history.listen(this.hideMenu);
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  toggleMenu = () => {
    this.setState(state => ({
      submenuOpen: !state.submenuOpen
    }));
  };

  hideMenu = () => {
    this.setState(() => ({
      submenuOpen: false
    }));
  };

  render() {
    const { item } = this.props;
    const hasChildren = !!(item.children && item.children.length);
    const icon = this.state.submenuOpen ? 'dropdownArrowUp' : 'dropdownArrowDown';

    return (
      <React.Fragment>
        <MenuItem defaultTheme={menuItemTheme}>
          {hasChildren ? (
            <React.Fragment>
              <FlexLayout justifyContent="space-between" onClick={this.toggleMenu}>
                <Text>{item.name}</Text>
                <Icon src={icon} />
              </FlexLayout>
            </React.Fragment>
          ) : (
            <Link display="block" as={RouterLink} to={item.url}>
              {item.name}
            </Link>
          )}
        </MenuItem>
        {hasChildren && item.children.length > 0 && (
          <MenuItem defaultTheme={menuItemTheme} p="none" css={{ display: this.state.submenuOpen ? 'block' : 'none' }}>
            <MultiLevelMenu pl="sm" items={item.children} />
          </MenuItem>
        )}
      </React.Fragment>
    );
  }
}
const MultiLevelMenuItem = withRouter(MultiLevelMenuItemDOM);

const MultiLevelMenu = ({ items }) => (
  <Menu bg="transparent" p="xs" pr="none">
    {items.map(item => (
      <MultiLevelMenuItem key={item.name} item={item} />
    ))}
  </Menu>
);

export const MobileMenu = props => (
  <Box>
    <H3>
      <T id="menu" />
    </H3>
    <MultiLevelMenu open {...props} />
  </Box>
);
