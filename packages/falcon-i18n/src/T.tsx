import React from 'react';
import PropTypes from 'prop-types';
import i18next, { TranslationFunction } from 'i18next';
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

export type TProps = {
  id?: string;
  children?: (t: TranslationFunction) => any;
} & i18next.TranslationOptions;

export class T extends React.Component<TProps> {
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
    defaultValue: PropTypes.oneOf([PropTypes.string]),
    count: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    context: PropTypes.any, // used for contexts (eg. male\female)
    replace: PropTypes.shape({}), // object with vars for interpolation - or put them directly in options
    lng: PropTypes.string,
    lngs: PropTypes.arrayOf(PropTypes.string),
    fallbackLng: PropTypes.oneOf([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    ns: PropTypes.oneOf([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    keySeparator: PropTypes.string,
    nsSeparator: PropTypes.string,
    returnObjects: PropTypes.bool, // accessing an object not a translation string
    joinArrays: PropTypes.string, // char, eg. '\n' that arrays will be joined by (can be set globally too)
    postProcess: PropTypes.oneOf([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), // postProcessors to apply see interval plurals as a sample
    interpolation: PropTypes.shape({})
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
    const { id, children, ...options } = this.props;

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
            return children(t);
          }
          // children (if exists) needs to be string here
          const key = id || (children as string) || undefined;

          return key ? t(key, options) : null;
        }}
      </I18nContext.Consumer>
    );
  }
}
