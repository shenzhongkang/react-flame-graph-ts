import { SyntheticEvent } from 'react';

export interface RawData {
  backgroundColor?: string;
  color?: string;
  children?: Array<RawData>;
  id?: string;
  name: string;
  tooltip?: string;
  uid?: any;
  value: number;
}

export interface ChartNode {
  backgroundColor: string;
  color: string;
  depth: number;
  left: number;
  name: string;
  source: RawData;
  tooltip?: string;
  width: number;
}

export interface ChartData {
  height: number;
  levels: Array<Array<any>>;
  nodes: { [uid: string]: ChartNode };
  root: any;
}

export interface ItemData {
  data: ChartData;
  disableDefaultTooltips: boolean;
  focusedNode: ChartNode;
  focusNode: (uid: string) => void;
  handleMouseEnter: (event: SyntheticEvent<any>, node: RawData) => void;
  handleMouseLeave: (event: SyntheticEvent<any>, node: RawData) => void;
  handleMouseMove: (event: SyntheticEvent<any>, node: RawData) => void;
  scale: (value: number) => number;
}
