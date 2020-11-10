import React, { ReactNode, useEffect, useRef } from 'react';

import { Alert, Animated, ViewStyle } from 'react-native';

interface Props {
    style?: ViewStyle;
    children: ReactNode;
    scaleX: number;
    scaleY: number;
    startValue: number;
    duration?: number;
}

const DEFAULT_DURATION = 800;
const LOOP = 10;

const PulsingView: React.FunctionComponent<Props> = (props) => {
    const scaleXValue = useRef(new Animated.Value(props.startValue)).current;
    const scaleYValue = useRef(new Animated.Value(props.startValue)).current;
    const opacityValue = useRef(new Animated.Value(0.5)).current;

    const duration = props.duration ? props.duration : DEFAULT_DURATION;

    let transformArray = [{ scaleX: scaleXValue }, { scaleY: scaleYValue }];


    /**
     * Animated scale Y
     */
    useEffect(() => {
        const animation1 = Animated.timing(scaleYValue, {
            toValue: props.scaleY,
            duration: duration,
            useNativeDriver: true,
        });

        const animation2 = Animated.timing(opacityValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
        });

        const animation3 = Animated.timing(scaleXValue, {
            toValue: props.scaleX,
            duration: duration,
            useNativeDriver: true,
        });

        const animated = Animated.parallel([
            animation1, animation2, animation3
        ])

        const reverse1 = Animated.timing(scaleYValue, {
            toValue: props.startValue,
            duration: 0,
            useNativeDriver: true,
        });

        const reverse2 = Animated.timing(opacityValue, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
        });

        const reverse3 = Animated.timing(scaleXValue, {
            toValue: props.startValue,
            duration: 0,
            useNativeDriver: true,
        });

        const animationReversed = Animated.parallel([
            reverse1, reverse2, reverse3
        ])

        const pulse = Animated.sequence([animated, animationReversed]);

        Animated.loop(pulse, {
            iterations: LOOP
        }).start();
    }, [props.scaleY]);




    return (
        <Animated.View style={{ ...props.style, opacity: opacityValue, transform: transformArray }}>
            {props.children}
        </Animated.View>
    );
};

export { PulsingView };
