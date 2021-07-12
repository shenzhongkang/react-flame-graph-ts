import React, { FC, memo, useState } from 'react';
import { FlameGraph } from './FlameGraph';
import { ChartNode, RawData } from './types';
import memoize from 'memoize-one';
import { transformChartData } from './utils';

export interface FlameGraphProcessorProps {
  data: RawData;
  height: number;
  width: number;
  onChange?: (chartNode: ChartNode, uid: any) => void;
}

export const FlameGraphProcessor: FC<FlameGraphProcessorProps> = memo(
  ({ data, ...rest }) => {
    const getChartdata = memoize((rawData: RawData) =>
      transformChartData(rawData)
    );

    const chartData = getChartdata(data);

    return <FlameGraph data={chartData} {...rest} />;
  }
);
