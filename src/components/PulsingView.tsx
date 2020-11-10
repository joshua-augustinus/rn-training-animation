import React, { ReactNode, useEffect, useRef } from 'react';

import { Animated, ViewStyle } from 'react-native';

interface Props {
    style?: ViewStyle;
    children: ReactNode;
    scaleX: number;
    scaleY: number;
    startValue: number;
    duration?: number;
    score: number,
    enableAnimations: boolean
}

const DEFAULT_DURATION = 800;
const LOOP = 10;
const USE_NATIVE_DRIVER = true; //Bug in react native will not reset animations properly if native driver = true

const PulsingView = (props: Props) => {
    const scaleXValue = useRef(new Animated.Value(props.startValue)).current;
    const scaleYValue = useRef(new Animated.Value(props.startValue)).current;
    const opacityValue = useRef(new Animated.Value(1)).current;

    const duration = props.duration ? props.duration : DEFAULT_DURATION;

    let transformArray = [{ scaleX: scaleXValue }, { scaleY: scaleYValue }];

    useEffect(() => {
        startAnimation();
    }, [props.score])


    /**
     * Animated scale Y
     */
    const startAnimation = () => {
        if (!props.enableAnimations)
            return;

        const forwardAnimation = createAnimationArray(props.scaleX, props.scaleY, 0, duration);
        const resetAnimation = createAnimationArray(1, 1, 1, 0);

        const animated = Animated.sequence([
            forwardAnimation, resetAnimation
        ])


        Animated.loop(animated, {
            iterations: LOOP, resetBeforeIteration: true
        }).start();
    };

    const createAnimationArray = (scaleX: number, scaleY: number, opacity: number, duration) => {
        const animation1 = Animated.timing(scaleYValue, {
            toValue: scaleY,
            duration: duration,
            useNativeDriver: USE_NATIVE_DRIVER,
        });
        const animation3 = Animated.timing(scaleXValue, {
            toValue: scaleX,
            duration: duration,
            useNativeDriver: USE_NATIVE_DRIVER,
        });
        const animation2 = Animated.timing(opacityValue, {
            toValue: opacity,
            duration: duration,
            useNativeDriver: USE_NATIVE_DRIVER,
        });

        return Animated.parallel([
            animation1, animation2, animation3
        ]);
    }




    return (
        <Animated.View style={{ ...props.style, opacity: opacityValue, transform: transformArray }}>
            {props.children}
        </Animated.View>
    );
};

export { PulsingView };
