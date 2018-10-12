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

    componentDidUpdate(prevProps: IAnalytics) {
      const currentPage: string = this.props.location.pathname;
      const prevPage: string = prevProps.location.pathname;
      if (currentPage !== prevPage) {
        trackPage(currentPage);
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  };
