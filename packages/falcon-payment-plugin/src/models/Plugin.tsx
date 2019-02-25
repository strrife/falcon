import React from 'react';
import { PluginModelProps } from '../types';

export class PluginModel<P extends PluginModelProps = PluginModelProps, S = {}> extends React.Component<P, S> {
  static icon: string | null = null;
}
