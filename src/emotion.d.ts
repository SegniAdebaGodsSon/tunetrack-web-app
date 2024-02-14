import '@emotion/react'

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            primary: string;
            secondary: string;
            success: string;
            danger: string;
            warning: string;
            info: string;
            light: string;
            dark: string;
            text: string;
            background: string;
        };
        space: number[];
        fonts: {
            body: string;
            heading: string;
        };
        fontSizes: number[];
        fontWeights: {
            regular: number;
            medium: number;
            bold: number;
        };
        breakpoints: {
            sm: number;
            md: number;
            lg: number;
        };
        borders: string[];
        shadows: string[];
        transitions: {
            duration: string;
            easing: string;
        };
        variants: {
            button: {
                primary: Record<string, any>;
                secondary: Record<string, any>;
                disabled: Record<string, any>;
            };
        };
    }
}