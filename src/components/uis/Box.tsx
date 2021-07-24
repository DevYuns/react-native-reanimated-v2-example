import React from 'react';
import styled from '@emotion/native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {withBouncing, clamp} from 'react-native-redash';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const BOX_WIDTH = 150;
const BOX_HEIGHT = 150;

const Container = styled.View`
  flex: 1;
  align-self: stretch;
`;

const DragableBox = styled.View<{width: number; height: number}>`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  background-color: red;
`;

interface Props {
  width: number;
  height: number;
}

function Box({
  width: widthLimit,
  height: heightLimit,
}: Props): React.ReactElement {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {translateX: number; translateY: number}
  >({
    onStart: (_, ctx) => {
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
    },
    onActive: (e, ctx) => {
      translateX.value = clamp(
        ctx.translateX + e.translationX,
        0,
        widthLimit - BOX_WIDTH,
      );

      translateY.value = clamp(
        ctx.translateY + e.translationY,
        0,
        heightLimit - BOX_HEIGHT,
      );
    },
    onEnd: (e, _) => {
      translateX.value = withBouncing(
        withDecay({velocity: e.velocityX}),
        0,
        widthLimit - BOX_WIDTH,
      );

      translateY.value = withBouncing(
        withDecay({velocity: e.velocityY}),
        0,
        heightLimit - BOX_HEIGHT,
      );
    },
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <Container>
      <PanGestureHandler onGestureEvent={onGestureEventHandler}>
        <Animated.View style={animStyle}>
          <DragableBox width={BOX_WIDTH} height={BOX_HEIGHT} />
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

export default Box;
