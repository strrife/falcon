import React from 'react';
import PropTypes from 'prop-types';
import { CloseSidebarMutation } from '@deity/falcon-ecommerce-uikit';
import { SidebarQuery } from './SidebarQuery';

export class SidebarContainer extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      ready: false
    };
  }

  componentDidMount() {
    // wait with loading sidebar contents until browser is idle
    // as it's not high prority task and would delay time to interactive
    const setReady = () => {
      this.setState({ ready: true });
    };
    const READY_TIMEOUT_MS = 1000;
    //  use requestIdleCallback when possible as browser idle signal
    // and fallback to setTimeout
    if (!('requestIdleCallback' in window)) {
      window.setTimeout(setReady, READY_TIMEOUT_MS);
    } else {
      window.requestIdleCallback(setReady, { timeout: READY_TIMEOUT_MS });
    }
  }

  render() {
    return (
      <SidebarQuery>
        {({ sidebar }) => (
          <CloseSidebarMutation>
            {closeSidebar =>
              this.props.children({
                ready: this.state.ready,
                close: closeSidebar,
                isOpen: sidebar.isOpen,
                side: sidebar.side,
                contentType: sidebar.contentType
              })
            }
          </CloseSidebarMutation>
        )}
      </SidebarQuery>
    );
  }
}
