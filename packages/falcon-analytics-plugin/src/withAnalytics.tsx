import React from 'react';

declare interface ILocation {
  pathname: string;
}

export interface IAnalytics {
  location: ILocation;
}

export default (Component: React.ReactType, trackPage: (page: string) => void) =>
  class WithAnalytics extends React.PureComponent<IAnalytics> {
    componentDidMount() {
      const page: string = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps: IAnalytics) {
      const currentPage: string = this.props.location.pathname;
      const nextPage: string = nextProps.location.pathname;
      if (currentPage !== nextPage) trackPage(nextPage);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
