import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import nodeResolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import scss from 'rollup-plugin-scss';
import reactSvg from 'rollup-plugin-react-svg';
import image from '@timdp/rollup-plugin-image';

export default {
    input: './src/App.js',
    output: {
        format: 'umd',
        dir: 'dist',
        name: 'myBundle',
    },
    external: ['react', 'react-dom'],
    globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: [
        progress(),
        nodeResolve({
            browser: true,
            extensions: ['.js', '.jsx'],
            preferBuiltins: true,
        }),
        json(),
        commonjs({
            include: [
                'node_modules/**',
            ],
            namedExports: {
                'react': ['Children', 'Component', 'PureComponent', 'PropTypes', 'createElement', 'Fragment'],
                'react-dom': ['render', 'createPortal'],
                'redux-saga-thunk': ['middleware'],
                'react-is': ['isValidElementType', 'isContextConsumer'],
                'prop-types': ['array', 'object', 'number', 'string'],
                'react-router-dom': ['Route', 'Switch'],
            },
        }),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**',
        }),
        visualizer(),
        filesize(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        scss({
            output: './dist/bundle.css',
        }),
        reactSvg(),
        image(),
    ],
};
