import { ChartData, ChartNode, RawData } from './types';
import { BACKGROUND_COLOR_GRADIENT, COLOR_GRADIENT } from './enums';

const backgroundColorGradientLength = BACKGROUND_COLOR_GRADIENT.length;
const colorGradientLength = COLOR_GRADIENT.length;

const getNodeBackgroundColor = (value: number, maxValue: number): string => {
  return BACKGROUND_COLOR_GRADIENT[
    Math.round(value / maxValue) * (backgroundColorGradientLength - 1)
  ];
};

const getNodeColor = (value: number, maxValue: number): string => {
  return COLOR_GRADIENT[
    Math.round(value / maxValue) * (colorGradientLength - 1)
  ];
};

export const transformChartData = (rowData: RawData): ChartData => {
  let uidCounter = 0;
  const maxValue = rowData.value;
  const nodes: any = {};
  const levels: any[] = [];

  const convertNode = (
    sourceNode: RawData,
    depth: number,
    leftOffset: number
  ): ChartNode => {
    const {
      backgroundColor,
      children,
      color,
      id,
      name,
      tooltip,
      value,
    } = sourceNode;

    const uidOrCounter = id || `_${uidCounter}`;

    // Add this node to the node-map and assign it a UID.
    const targetNode = (nodes[uidOrCounter] = {
      backgroundColor:
        backgroundColor || getNodeBackgroundColor(value, maxValue),
      color: color || getNodeColor(value, maxValue),
      depth,
      left: leftOffset,
      name,
      source: sourceNode,
      tooltip,
      width: value / maxValue,
    });

    // Register the node's depth within the graph.
    if (levels.length <= depth) {
      levels.push([]);
    }

    levels[depth].push(uidOrCounter);

    // Now that the current UID has been used, increment it.
    uidCounter++;

    // Process node children.
    if (Array.isArray(children)) {
      children.forEach((sourceChildNode) => {
        const targetChildNode = convertNode(
          sourceChildNode,
          depth + 1,
          leftOffset
        );
        leftOffset += targetChildNode.width;
      });
    }

    return targetNode;
  };

  convertNode(rowData, 0, 0);

  const rootUid = rowData.id || '_0';

  return {
    height: levels.length,
    levels,
    nodes,
    root: rootUid,
  };
};
