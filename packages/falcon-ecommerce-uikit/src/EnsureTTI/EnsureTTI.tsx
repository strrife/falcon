import React from 'react';
import PropTypes from 'prop-types';

type EnsureTTIState = {
  isReady: boolean;
  setTimeoutHandlerId: any;
  requestIdleHandlerId: any;
};

export type EnsureTTIRenderProps = {
  isReady: boolean;
  forceReady: () => void;
};
export type EnsureTTIProps = {
  timeout?: number;
  children: (props: EnsureTTIRenderProps) => any;
};

/**
 * TTI measures the time from Navigation Start until the page's resources are loaded
 * and the main thread is idle (for at least 5 seconds), ref: https://developers.google.com/web/updates/2018/05/first-input-delay
 *
 * timeout is set based on the assumption how lighthouse measures time to interactive to improve perceived performance
 */
export class EnsureTTI extends React.Component<EnsureTTIProps, EnsureTTIState> {
  static propTypes = {
    timeout: PropTypes.number,
    children: PropTypes.func.isRequired
  };

  static defaultProps = {
    timeout: 6000
  };

  constructor(props: EnsureTTIProps) {
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
        const requestIdleHandlerId = (window as any).requestIdleCallback(this.forceReady);

        return this.setState(x => ({ ...x, requestIdleHandlerId }));
      }

      return this.forceReady();
    }, this.props.timeout);

    // eslint-disable-next-line
    this.setState(x => ({ ...x, setTimeoutHandlerId }));
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.setTimeoutHandlerId);

    if ('requestIdleCallback' in window && this.state.requestIdleHandlerId !== undefined) {
      (window as any).cancelIdleCallback(this.state.requestIdleHandlerId);
    }
  }

  /** Sets isReady even before timeout */
  forceReady = () => {
    if (this.state.isReady === false) {
      this.setState(x => ({
        ...x,
        isReady: true
      }));
    }
  };

  render() {
    return this.props.children({
      isReady: this.state.isReady,
      forceReady: this.forceReady
    });

    // return (
    //   <SidebarQuery onCompleted={({ sidebar }) => sidebar.isOpen && this.forceIsReady()}>
    //     {({ sidebar }) => (
    //       <CloseSidebarMutation>
    //         {closeSidebar =>
    //           this.props.children({
    //             ready: this.state.isReady,
    //             close: closeSidebar,
    //             isOpen: sidebar.isOpen,
    //             side: sidebar.side,
    //             contentType: sidebar.contentType
    //           })
    //         }
    //       </CloseSidebarMutation>
    //     )}
    //   </SidebarQuery>
    // );
  }
}
