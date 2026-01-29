import React, { useMemo, useState } from 'react';
import { LayoutRectangle, StyleProp, View } from 'react-native';

import useStyles from '@/hooks/useStyles';
import ContentLoader from 'react-content-loader/native';

const DEFAULT_PADDING = 10;
const DEFAULT_CONTAINER_HEIGHT = 60;
const DEFAULT_CONTAINER_WIDHT = '100%';

type Deps = React.DependencyList | undefined;

export type SkeletonProps = {
  Layout: React.ComponentType<SkeletonLayoutProps>;
  children?: React.ReactNode;
  isLoading: boolean;
  padding_v?: number;
  padding_h?: number;
  containerHeight?: number | string;
  containerWidth?: number | string;
  requiredValuesToRender?: Deps;
  renderWithoutView?: boolean;
  forceStaticSize?: boolean;
  style?: StyleProp<any>;
  bgColor?: string;
  fgColor?: string;
};

export type SkeletonLayoutProps = {
  height: number;
  width: number;
  padding_v?: number;
  padding_h?: number;
};

const Skeleton = ({
  Layout,
  children,
  isLoading,
  padding_h = DEFAULT_PADDING,
  padding_v = DEFAULT_PADDING,
  containerHeight = DEFAULT_CONTAINER_HEIGHT,
  containerWidth = DEFAULT_CONTAINER_WIDHT,
  requiredValuesToRender,
  renderWithoutView,
  forceStaticSize,
  style,
  bgColor,
  fgColor,
}: SkeletonProps) => {
  const [dimensions, setDimensions] = useState<LayoutRectangle>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const { colors } = useStyles();

  const requiredValuedWithErrors: any[] | undefined = useMemo(
    () =>
      requiredValuesToRender?.reduce((acc: any[], el) => {
        if (el) acc.push(el);
        return acc;
      }, []),
    [requiredValuesToRender]
  );

  const infiniteSkeletonByError = requiredValuedWithErrors && requiredValuedWithErrors.length === 0;

  if (!(isLoading || infiniteSkeletonByError) && renderWithoutView) return <>{children}</>;

  const layoutHeight = forceStaticSize ? containerHeight : dimensions.height;
  const layoutWidth = forceStaticSize ? containerWidth : dimensions.width;

  return (
    <View
      onLayout={(ev) => setDimensions(ev.nativeEvent.layout)}
      style={
        isLoading
          ? [
            {
              height: containerHeight,
              width: containerWidth,
            },
            style,
          ]
          : style
      }>
      {
        (isLoading || infiniteSkeletonByError) ? (
          <ContentLoader
            height={layoutHeight}
            width={layoutWidth}
            backgroundColor={bgColor || colors.background.secondary}
            foregroundColor={fgColor || colors.background.primary}>
            <Layout
              height={layoutHeight as number}
              width={layoutWidth as number}
              padding_h={padding_h}
              padding_v={padding_v}
            />
          </ContentLoader>
        ) : (
          children
        )
      }
    </View>
  );
};

export default React.memo(Skeleton);
