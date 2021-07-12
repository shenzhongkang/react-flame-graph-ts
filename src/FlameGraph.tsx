import React, { FC, memo, SyntheticEvent, useState } from 'react';
import { ItemRenderer } from './ItemRenderer';
import { ChartData, ChartNode, ItemData, RawData } from './types';
import memoize from 'memoize-one';
import { FixedSizeList as List } from 'react-window';
import { ROW_HEIGHT } from './enums';

export interface FlameGraphProps {
  data: ChartData;
  disableDefaultTooltips?: boolean;
  height: number;
  onChange?: (chartNode: ChartNode, uid: any) => void;
  onMouseMove?: (event: SyntheticEvent, node: RawData) => void;
  onMouseOut?: (event: SyntheticEvent, node: RawData) => void;
  onMouseOver?: (event: SyntheticEvent, node: RawData) => void;
  width: number;
}

const Comp: FC<FlameGraphProps> = ({
  data,
  disableDefaultTooltips,
  height,
  onChange,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  width,
}) => {
  const [focusedNode, setFocusedNode] = useState<ChartNode>(
    data.nodes[data.root]
  );

  const getItemData = memoize(
    (
      data: ChartData,
      disableDefaultTooltips: boolean,
      focusedNode: ChartNode,
      focusNode: (uid: any) => void,
      handleMouseEnter: (event: SyntheticEvent<any>, node: RawData) => void,
      handleMouseLeave: (event: SyntheticEvent<any>, node: RawData) => void,
      handleMouseMove: (event: SyntheticEvent<any>, node: RawData) => void,
      width: number
    ): ItemData => ({
      data,
      disableDefaultTooltips,
      focusedNode,
      focusNode,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseMove,
      scale: (value) => (value / focusedNode.width) * width,
    })
  );

  const focusNode = (uid: any) => {
    const { nodes } = data;
    const chartNode = nodes[uid];
    setFocusedNode(chartNode);
    if (typeof onChange === 'function') {
      onChange(chartNode, uid);
    }
  };

  const handleMouseEnter = (event: SyntheticEvent<any>, rawData: RawData) => {
    if (typeof onMouseOver === 'function') {
      onMouseOver(event, rawData);
    }
  };

  const handleMouseLeave = (event: SyntheticEvent<any>, rawData: RawData) => {
    if (typeof onMouseOut === 'function') {
      onMouseOut(event, rawData);
    }
  };

  const handleMouseMove = (event: SyntheticEvent<any>, rawData: RawData) => {
    if (typeof onMouseMove === 'function') {
      onMouseMove(event, rawData);
    }
  };

  const itemData = getItemData(
    data,
    !!disableDefaultTooltips,
    focusedNode,
    focusNode,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    width
  );

  return (
    <List
      height={height}
      innerTagName='svg'
      itemCount={data.height}
      itemData={itemData}
      itemSize={ROW_HEIGHT}
      width={width}
    >
      {ItemRenderer}
    </List>
  );
};

export const FlameGraph = memo(Comp);
