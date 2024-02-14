import { Theme } from "@emotion/react";

const theme: Theme = {
    colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
        light: '#f8f9fa',
        dark: '#343a40',
        text: '#212529',
        background: '#ffffff',
    },
    space: [0, 4, 8, 16, 32],
    fonts: {
        body: 'Poppins, sans-serif',
        heading: 'Raleway, sans-serif',
    },
    fontSizes: [12, 14, 16, 20, 24, 28],
    fontWeights: {
        regular: 400,
        medium: 500,
        bold: 700,
    },
    breakpoints: {
        sm: 576,
        md: 768,
        lg: 992,
    },
    borders: ['none', '1px solid'],
    shadows: ['none', '2px 2px 4px rgba(0, 0, 0, 1)'],
    transitions: {
        duration: '0.2s',
        easing: 'ease-in-out',
    },
    variants: {
        button: {
            primary: {
                color: 'white',
                backgroundColor: 'primary',
                '&:hover': {
                    backgroundColor: 'darken(primary, 0.1)',
                },
            },
            secondary: {
                color: 'text',
                backgroundColor: 'secondary',
                '&:hover': {
                    backgroundColor: 'darken(secondary, 0.1)',
                },
            },
            disabled: {
                color: 'text',
                backgroundColor: 'light',
                cursor: 'not-allowed',
            },
        },
    },
};

export default theme;

