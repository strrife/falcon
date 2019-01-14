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
      ready: false
    };
  }

  componentDidMount() {
    const setReady = () => {
      if (this.state.ready) {
        return;
      }

      if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(this.setReadyState);
      }

      this.setReadyState();
    };

    // set ready flag even in sidebar has not been opened after READY_TIMEOUT_MS
    // so sidebar contents are downloaded and ready to be displayed
    window.setTimeout(setReady, READY_TIMEOUT_MS);
  }

  setReadyState = () => {
    this.setState({ ready: true });
  };

  setReadyOnFirstOpen = ({ sidebar }) => {
    // sets ready flag when sidebar get's opened for the first time
    // that causes SidebarContents to dynamically import it's JS
    const openedForTheFirstTime = sidebar.isOpen && !this.state.ready;

    if (openedForTheFirstTime) {
      this.setReadyState();
    }
  };

  render() {
    return (
      <SidebarQuery onCompleted={this.setReadyOnFirstOpen}>
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
