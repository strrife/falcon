import React from 'react';
import PropTypes from 'prop-types';
import { CloseSidebarMutation } from '@deity/falcon-ecommerce-uikit';
import { SidebarQuery } from './SidebarQuery';

// ready timeout is set based on the assumption how lighthouse measures
// time to interactive to improve perceived performance

// (TTI measures the time from Navigation Start until the page's resources are loaded
// and the main thread is idle (for at least 5 seconds))
// https://developers.google.com/web/updates/2018/05/first-input-delay

const READY_TIMEOUT_MS = 6000;

export class SidebarContainer extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      setTimeoutHandlerId: undefined,
      requestIdleHandlerId: undefined
    };
  }

  componentDidMount() {
    // set isReady flag after READY_TIMEOUT_MS timeout
    const setTimeoutHandlerId = window.setTimeout(() => {
      if (this.state.isReady) {
        return;
      }

      if ('requestIdleCallback' in window) {
        const requestIdleHandlerId = window.requestIdleCallback(this.forceIsReady);

        return this.setState(x => ({ ...x, requestIdleHandlerId }));
      }

      return this.forceIsReady();
    }, READY_TIMEOUT_MS);

    // eslint-disable-next-line
    this.setState(x => ({ ...x, setTimeoutHandlerId }));
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.setTimeoutHandlerId);

    if ('requestIdleCallback' in window && this.state.requestIdleHandlerId !== undefined) {
      window.cancelIdleCallback(this.state.requestIdleHandlerId);
    }
  }

  /** Sets isReady even before timeout */
  forceIsReady = () => {
    if (this.state.isReady === false) {
      this.setState(x => ({
        ...x,
        isReady: true
      }));
    }
  };

  render() {
    return (
      <SidebarQuery onCompleted={({ sidebar }) => sidebar.isOpen && this.forceIsReady()}>
        {({ sidebar }) => (
          <CloseSidebarMutation>
            {closeSidebar =>
              this.props.children({
                ready: this.state.isReady,
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
