import React, { ReactNode, useEffect, useRef } from 'react';

import { Alert, Animated, ViewStyle } from 'react-native';

interface Props {
    style?: ViewStyle;
    children: ReactNode;
    toValue: number;
    delay?: number;
    startValue: number;

    duration?: number;
}

const DEFAULT_DURATION = 800;

const PulsingView: React.FunctionComponent<Props> = (props) => {
    const dynamicValue = useRef(new Animated.Value(props.startValue)).current;

    let transformArray = [{ scale: dynamicValue }];

    useEffect(() => {
        const duration = props.duration ? props.duration : DEFAULT_DURATION;
        const animation = Animated.timing(dynamicValue, {
            delay: props.delay,
            toValue: props.toValue,
            duration: duration,
            useNativeDriver: true,
        });

        const animationReversed = Animated.timing(dynamicValue, {
            delay: props.delay,
            toValue: props.startValue,
            duration: duration,
            useNativeDriver: true,
        });

        const pulse = Animated.sequence([animation, animationReversed]);

        Animated.loop(pulse, {
            iterations: 5
        }).start();
    }, [props.toValue]);

    return (
        <Animated.View style={{ ...props.style, transform: transformArray }}>
            {props.children}
        </Animated.View>
    );
};

export { PulsingView };
