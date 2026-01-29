import React from 'react';

import Skeleton, { SkeletonProps } from './Skeleton';

type SkeletonLisProps = SkeletonProps & {
  quantity: number;
};

const SkeletonList = ({
  Layout,
  isLoading,
  padding_h,
  padding_v,
  containerHeight,
  containerWidth,
  requiredValuesToRender,
  quantity,
  children,
  renderWithoutView,
  forceStaticSize,
}: SkeletonLisProps) => {
  const renderList = () => {
    const skeletonList: React.JSX.Element[] = [];
    for (let i = 0; i < quantity; i += 1) {
      skeletonList.push(
        i === 0 ? (
          <Skeleton
            Layout={Layout}
            isLoading={isLoading}
            padding_h={padding_h}
            padding_v={padding_v}
            containerHeight={containerHeight}
            containerWidth={containerWidth}
            requiredValuesToRender={requiredValuesToRender}
            key={i}
            renderWithoutView={renderWithoutView}
            forceStaticSize={forceStaticSize}>
            {children}
          </Skeleton>
        ) : (
          <Skeleton
            Layout={Layout}
            isLoading={isLoading}
            padding_h={padding_h}
            padding_v={padding_v}
            containerHeight={containerHeight}
            containerWidth={containerWidth}
            requiredValuesToRender={requiredValuesToRender}
            key={i}
            renderWithoutView={renderWithoutView}
            forceStaticSize={forceStaticSize}
          />
        )
      );
    }
    return skeletonList;
  };

  return <>{renderList()}</>;
};

export default SkeletonList;
