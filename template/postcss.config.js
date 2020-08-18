// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-url')({ url: 'inline' }),
    ],
};
