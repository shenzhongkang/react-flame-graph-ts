import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FlameGraphProcessor } from './DataConverter';

export default {
  title: 'Components/FlameGraph',
  component: FlameGraphProcessor,
} as ComponentMeta<typeof FlameGraphProcessor>;

const Template: ComponentStory<typeof FlameGraphProcessor> = (args) => (
  <FlameGraphProcessor {...args} />
);

export const Overview = Template.bind({});

Overview.args = {
  data: {
    name: 'root',
    value: 5,
    children: [
      {
        name: 'custom tooltip',
        value: 1,

        // Each node can specify a "tooltip" to be shown on hover.
        // By default, the node's "name" will be used for this.
        tooltip: 'Custom tooltip shown on hover',
      },
      {
        name: 'custom colors',

        // Each node can also provide a custom "backgroundColor" or text "color".
        backgroundColor: '#35f',
        color: '#fff',

        value: 3,
        children: [
          {
            name: 'leaf',
            value: 2,
          },
        ],
      },
    ],
  },
  height: 200,
  width: 400,
};
