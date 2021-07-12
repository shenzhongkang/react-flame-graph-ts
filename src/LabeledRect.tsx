import React, { FC, MouseEvent } from 'react';
import { RawData } from './types';
import { MIN_WIDTH_TO_DISPLAY_TEXT, TEXT_HEIGHT } from './enums';
import styles from './LabeledRect.module.css';

export interface LabeldRectProps {
  backgroundColor: string;
  color: string;
  disabledDefaultTooltips: boolean;
  height: number;
  isDimmed?: boolean;
  label: string;
  onClick: (event: MouseEvent<SVGRectElement>) => void;
  onMouseEnter: (event: MouseEvent<SVGGElement>, node?: RawData) => void;
  onMouseLeave: (event: MouseEvent<SVGGElement>, node?: RawData) => void;
  onMouseMove: (event: MouseEvent<SVGGElement>, node?: RawData) => void;
  tooltip?: string;
  width: number;
  x: number;
  y: number;
}

export const LabeldRect: FC<LabeldRectProps> = ({
  backgroundColor,
  color,
  disabledDefaultTooltips,
  height,
  isDimmed = false,
  label,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  tooltip,
  width,
  x,
  y,
}) => {
  return (
    <g
      className={styles.g}
      transform={`translate(${x}, ${y})`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      {disabledDefaultTooltips ? null : (
        <title>{tooltip != null ? tooltip : label}</title>
      )}
      <rect
        width={width}
        height={height}
        fill='white'
        className={styles.rect}
      />
      <rect
        width={width}
        height={height}
        fill={backgroundColor}
        onClick={onClick}
        className={styles.rect}
        style={{ opacity: isDimmed ? 0.5 : 1 }}
      />
      {width >= MIN_WIDTH_TO_DISPLAY_TEXT && (
        <foreignObject
          width={width}
          height={height}
          className={styles.foreignObject}
          style={{ opacity: isDimmed ? 0.75 : 1, paddingLeft: x < 0 ? -x : 0 }}
          y={height < TEXT_HEIGHT ? -TEXT_HEIGHT : 0}
        >
          <div className={styles.div} style={{ color }}>
            {label}
          </div>
        </foreignObject>
      )}
    </g>
  );
};
