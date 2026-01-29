import React from 'react';

import { Rect } from 'react-content-loader/native';

import { SkeletonLayoutProps } from './Skeleton';

const SingleLineLayout = ({ height, width, padding_v = 0, padding_h = 0 }: SkeletonLayoutProps) => {
  const rh = height - 2 * padding_v;
  const rx = padding_h;
  const ry = padding_v;
  const rw = width - 2 * padding_h;

  return <Rect x={rx} y={ry} rx={rh / 2} ry={rh / 2} width={rw} height={rh} />;
};

export default SingleLineLayout;
