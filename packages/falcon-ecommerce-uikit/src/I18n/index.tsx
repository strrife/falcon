import React from 'react';
import PropTypes from 'prop-types';
import { NamespacesConsumer } from 'react-i18next-with-context';

type TranslationOptions<TCustomOptions extends object = object> = TranslationOptionsBase &
  TCustomOptions & { [key: string]: any };

interface TranslationOptionsBase {
  defaultValue?: any;
  count?: number;
  context?: any;
  replace?: any;
  lng?: string;
  lngs?: string[];
  ns?: string | string[];
  keySeparator?: string;
  nsSeparator?: string;
  returnObjects?: boolean;
  joinArrays?: string;
  postProcess?: string | string[];
  // interpolation?: InterpolationOptions;
}

export class T extends React.Component<{ id?: string } & TranslationOptions> {
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  };

  render() {
    const { id, children, ...options } = this.props;
    const Ns: any = NamespacesConsumer;

    if (children && id) {
      console.error('T: Only id or children can be set at the same time.');
    }

    if (children) {
      if (typeof children === 'function') {
        return <Ns>{t => children(t, options)}</Ns>;
      }

      if (typeof children === 'string') {
        return <Ns>{t => t(children, options)}</Ns>;
      }
    }

    if (id) {
      return <Ns>{t => t(id, options)}</Ns>;
    }

    return null;
  }
}
