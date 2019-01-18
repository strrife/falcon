import React from 'react';
import PropTypes from 'prop-types';

// ready timeout is set based on the assumption how lighthouse measures
// time to interactive to improve perceived performance

// (TTI measures the time from Navigation Start until the page's resources are loaded
// and the main thread is idle (for at least 5 seconds))
// https://developers.google.com/web/updates/2018/05/first-input-delay

const READY_TIMEOUT_MS = 6000;

type IdleState = {
  isReady: boolean;
  setTimeoutHandlerId: any;
  requestIdleHandlerId: any;
};

export type IdleRenderProps = {
  isReady: boolean;
  forceIsReady: () => void;
};
export type IdleProps = {
  timeout?: number;
  children: (props: IdleRenderProps) => any;
};

export class Idle extends React.Component<IdleProps, IdleState> {
  static propTypes = {
    children: PropTypes.func.isRequired,
    timeout: PropTypes.number
  };

  static defaultProps = {
    timeout: READY_TIMEOUT_MS
  };

  constructor(props: IdleProps) {
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
        const requestIdleHandlerId = (window as any).requestIdleCallback(this.forceIsReady);

        return this.setState(x => ({ ...x, requestIdleHandlerId }));
      }

      return this.forceIsReady();
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
  forceIsReady = () => {
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
      forceIsReady: this.forceIsReady
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
