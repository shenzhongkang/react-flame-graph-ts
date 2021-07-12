import React, { FC, memo } from 'react';
import { LabeldRect } from './LabeledRect';
import { MIN_WIDTH_TO_DISPLAY, ROW_HEIGHT } from './enums';
import { ItemData } from './types';

export interface ItemRendererProps {
  data: ItemData;
  index: number;
  style: any;
}

const Comp: FC<ItemRendererProps> = ({ data: itemData, index, style }) => {
  const {
    data,
    disableDefaultTooltips,
    focusedNode,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    scale,
  } = itemData;

  const uids = data.levels[index];
  const focusedNodeLeft = scale(focusedNode.left);
  const focusedNodeWidth = scale(focusedNode.width);

  const top = parseInt(style.top, 10);

  return (
    <>
      {uids.map((uid) => {
        const node = data.nodes[uid];
        const nodeLeft = scale(node.left);
        const nodeWidth = scale(node.width);

        // Filter out nodes that are too small to see or click. This also helps render large trees faster.
        if (nodeWidth < MIN_WIDTH_TO_DISPLAY) {
          return null;
        }

        // Filter out nodes that are outside of the horizontal window.
        if (
          nodeLeft + nodeWidth < focusedNodeLeft ||
          nodeLeft > focusedNodeLeft + focusedNodeWidth
        ) {
          return null;
        }
        return (
          <LabeldRect
            backgroundColor={node.backgroundColor}
            color={node.color}
            disabledDefaultTooltips={disableDefaultTooltips}
            height={ROW_HEIGHT}
            isDimmed={index < focusedNode.depth}
            key={uid}
            label={node.name}
            onClick={() => itemData.focusNode(uid)}
            onMouseEnter={(event) => handleMouseEnter(event, node.source)}
            onMouseLeave={(event) => handleMouseLeave(event, node.source)}
            onMouseMove={(event) => handleMouseMove(event, node.source)}
            tooltip={node.tooltip}
            width={nodeWidth}
            x={nodeLeft - focusedNodeLeft}
            y={top}
          />
        );
      })}
    </>
  );
};

export const ItemRenderer = memo(Comp);
