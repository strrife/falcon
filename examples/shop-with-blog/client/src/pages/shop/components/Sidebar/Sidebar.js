import React from 'react';
import { Loader, CloseSidebarMutation } from '@deity/falcon-ecommerce-uikit';
import { Sidebar as SidebarLayout, Portal, Backdrop, Icon, Box } from '@deity/falcon-ui';
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
        {({ sidebar }) => (
          <CloseSidebarMutation>
            {closeSidebar => (
              <React.Fragment>
                <SidebarLayout as={Portal} visible={sidebar.open} side={sidebar.side || undefined}>
                  <Box position="relative" flex={1}>
                    <Icon
                      src="close"
                      stroke="black"
                      position="absolute"
                      right={0}
                      top={0}
                      onClick={() => closeSidebar()}
                    />
                    {this.state.ready ? <SidebarContents contentType={sidebar.contentType} /> : <Loader />}
                  </Box>
                </SidebarLayout>
                <Backdrop as={Portal} visible={sidebar.open} onClick={() => closeSidebar()} />
              </React.Fragment>
            )}
          </CloseSidebarMutation>
        )}
      </SidebarQuery>
    );
  }
}
