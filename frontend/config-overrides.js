const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(
    addBabelPlugin([
        'babel-plutin-root-import',
        {
            rootPathSuffix: 'src',
        },
    ])
);
