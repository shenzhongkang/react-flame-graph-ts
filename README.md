# react-flame-graph (TypeScript Version)

A React component for visualizing profiling data.

![demo](https://github.com/shenzhongkang/react-flame-graph-ts/blob/main/demo.jpg?raw=true)

## Installation

```js
// Yarn
yarn add react-flame-graph
// NPM
npm install react-flame-graph
```

## Usage

Creating a flame graph can be simple!

First, define the data. Flame graphs are just a tree of 'nodes'. Each node must have a `name`(string) and a `value`(number). Descendents should be nested within a `children` array.

Optionally, nodes may define a custom `tooltip`(string), `color`(string), and `backgroundColor`(string).

```js
const data = {
  name: 'root',
  value: 5,
  children: [
    {
      name: 'custom tooltip',
      value: 1,
      tooltip: 'Custom tooltip shown on hover',
    },
    {
      name: 'custom colors',
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
};
```

Next, pass the data to the `FlameGraph` component, along with a width and height. You can also provide an `onChange` callback to be notified when a new node is selected.

```js
import { FlameGraph } from 'react-flame-graph';

<FlameGraph
  data={data}
  height={200}
  width={400}
  onChange={(node) => {
    console.log(`"${node.name}" focused`);
  }}
/>;
```
