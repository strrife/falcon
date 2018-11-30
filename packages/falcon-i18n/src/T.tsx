import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { I18nContext, I18nContextOptions } from './context';

export class I18n extends React.Component<{}> {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func]).isRequired
  };

  render() {
    const { children } = this.props as any;

    return <I18nContext.Consumer>{({ i18n, t }) => children({ i18n, t })}</I18nContext.Consumer>;
  }
}

export class T extends React.Component<{ id?: string }> {
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    // tReady: PropTypes.bool.isRequired
    // initialI18nStore: PropTypes.shape({}),
    // initialLanguage: PropTypes.string,
    // i18nOptions: PropTypes.shape({}),
    // i18n: PropTypes.shape({}),
    // t: PropTypes.func,
    // defaultNS: PropTypes.string,
    // reportNS: PropTypes.func,
    // lng: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.onI18nChanged = this.onI18nChanged.bind(this);
  }

  componentDidMount() {
    this.options!.rerenderOn.forEach(x => this.i18n!.on(x, this.onI18nChanged));
  }

  componentWillUnmount() {
    this.options!.rerenderOn.forEach(x => this.i18n!.off(x, this.onI18nChanged));
  }

  onI18nChanged() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ i18nChangedAt: new Date() });
  }

  i18n?: i18next.i18n = undefined;
  options?: I18nContextOptions = undefined;

  render() {
    const { id, children, ...options } = this.props as any;

    return (
      <I18nContext.Consumer>
        {({ t, i18n, options: contextOptions }) => {
          this.i18n = i18n;
          this.options = contextOptions;

          if (children && id) {
            const message = `Only id or children can be set at the same time.`;
            if (process.env.NODE_ENV !== 'production') {
              throw new Error(message);
            }
            console.error(message);
          }

          if (children && typeof children === 'function') {
            return children(t, options);
          }

          if (children) {
            if (typeof children === 'string') {
              return t(children, options);
            }
          }

          const keyFromChildren = children && typeof children === 'string' && children;
          const key = id || keyFromChildren || undefined;

          return key ? t(key, options) : null;
        }}
      </I18nContext.Consumer>
    );
  }
}
