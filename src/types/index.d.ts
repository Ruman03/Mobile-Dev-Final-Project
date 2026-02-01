// Type declarations for the project

declare module 'react-native-linear-gradient' {
    import { Component } from 'react';
    import { ViewProps, ViewStyle } from 'react-native';

    interface LinearGradientProps extends ViewProps {
        colors: string[];
        start?: { x: number; y: number };
        end?: { x: number; y: number };
        locations?: number[];
        useAngle?: boolean;
        angle?: number;
        angleCenter?: { x: number; y: number };
        style?: ViewStyle;
    }

    export default class LinearGradient extends Component<LinearGradientProps> { }
}

declare module '*.js' {
    const content: any;
    export default content;
}
