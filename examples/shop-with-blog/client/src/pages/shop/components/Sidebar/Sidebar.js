import React from 'react';
import { Loader } from '@deity/falcon-ecommerce-uikit';
import { Sidebar as SidebarLayout, Portal, Backdrop } from '@deity/falcon-ui';
import AsyncComponent from 'src/components/Async';
import { SidebarQuery } from './index';

const SidebarContents = AsyncComponent(() =>
  import(/* webpackChunkName: "shop/SidebarContents" */ './SidebarContents')
);

export class Sidebar extends React.Component {
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
        {({ sidebar }) =>
          console.log(sidebar) || (
            <React.Fragment>
              <SidebarLayout as={Portal} visible={sidebar.open} side={sidebar.side || undefined}>
                {this.state.ready ? <SidebarContents contentType={sidebar.contentType} /> : <Loader />}
              </SidebarLayout>
              <Backdrop as={Portal} visible={sidebar.open} />
            </React.Fragment>
          )
        }
      </SidebarQuery>
    );
  }
}
