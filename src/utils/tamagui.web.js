// Web-specific variant: avoids importing 'react-native-config' directly since its
// native codegen spec (NativeConfigModule.js) cannot be parsed by tamagui's esbuild-based
// static config extractor. Webpack/esbuild both prefer this .web.js file over tamagui.js
// when resolving './src/utils/tamagui' from tamagui.config.ts.
function readEnvValue(key) {
    if (typeof process !== 'undefined' && process.env && process.env[key] !== undefined) {
        return process.env[key];
    }
    if (typeof CONFIG !== 'undefined' && CONFIG && CONFIG[key] !== undefined) {
        return CONFIG[key];
    }
    return undefined;
}

export function parseConfigObjectString(objectString) {
    if (!objectString || typeof objectString !== 'string' || objectString.trim() === '') {
        return {};
    }

    return objectString.split(',').reduce((acc, pair) => {
        let [key, value] = pair.split(':');
        if (key && value !== undefined) {
            // Ensure key exists and value is not undefined
            acc[key.trim()] = value.trim();
        }
        return acc;
    }, {});
}

export function config(key, defaultValue) {
    const value = readEnvValue(key);
    return value === undefined ? defaultValue : value;
}

export function flattenTailwindCssColorsObject(colors = {}) {
    const flattened = {};

    for (const [color, shades] of Object.entries(colors)) {
        if (typeof shades === 'object') {
            for (const [shade, value] of Object.entries(shades)) {
                flattened[`${color}-${shade}`] = value;
            }
        } else {
            // Handle cases where `colors` might not be nested
            flattened[color] = shades;
        }
    }

    return flattened;
}
