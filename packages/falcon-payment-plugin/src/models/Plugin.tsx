import React from 'react';
import { PluginModelProps } from '../types';

export class PluginModel<P extends PluginModelProps = PluginModelProps> extends React.Component<P> {
  static icon: string | null = null;
}
