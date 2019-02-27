import React from 'react';
import { PluginComponentProps } from '../types';

export class PluginModel<P extends PluginComponentProps = PluginComponentProps, S = {}> extends React.Component<P, S> {
  static icon?: string;
}
