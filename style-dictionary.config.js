const StyleDictionary = require('style-dictionary');

// Register custom transforms
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: function(prop) {
    return prop.attributes.category === 'size' && prop.value !== 0;
  },
  transformer: function(prop) {
    return `${prop.value}px`;
  }
});

StyleDictionary.registerTransform({
  name: 'size/rem',
  type: 'value',
  matcher: function(prop) {
    return prop.attributes.category === 'size' && prop.value !== 0;
  },
  transformer: function(prop) {
    return `${prop.value}rem`;
  }
});

StyleDictionary.registerTransform({
  name: 'color/hex',
  type: 'value',
  matcher: function(prop) {
    return prop.attributes.category === 'color';
  },
  transformer: function(prop) {
    return prop.value;
  }
});

StyleDictionary.registerTransform({
  name: 'typography/css',
  type: 'value',
  matcher: function(prop) {
    return prop.attributes.category === 'typography';
  },
  transformer: function(prop) {
    const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } = prop.value;
    return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
  }
});

// Register custom transform groups
StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: ['attribute/cti', 'name/cti/kebab', 'size/px', 'color/hex', 'typography/css']
});

StyleDictionary.registerTransformGroup({
  name: 'custom/js',
  transforms: ['attribute/cti', 'name/cti/camel', 'size/px', 'color/hex']
});

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: ['attribute/cti', 'name/cti/kebab', 'size/px', 'color/hex', 'typography/css']
});

// Register custom formats
StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: function(dictionary, config) {
    return `:root {\n${dictionary.allProperties
      .map(prop => `  --${prop.name}: ${prop.value};`)
      .join('\n')}\n}`;
  }
});

StyleDictionary.registerFormat({
  name: 'js/module',
  formatter: function(dictionary, config) {
    return `export const tokens = {\n${dictionary.allProperties
      .map(prop => `  ${prop.name}: '${prop.value}'`)
      .join(',\n')}\n};`;
  }
});

StyleDictionary.registerFormat({
  name: 'js/three',
  formatter: function(dictionary, config) {
    const threeTokens = dictionary.allProperties.filter(prop => 
      prop.path[0] === '3d'
    );
    
    return `export const threeTokens = {\n${threeTokens
      .map(prop => `  ${prop.name}: ${JSON.stringify(prop.value)}`)
      .join(',\n')}\n};`;
  }
});

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transforms: ['custom/css'],
      buildPath: 'dist/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }]
    },
    scss: {
      transforms: ['custom/scss'],
      buildPath: 'dist/scss/',
      files: [{
        destination: '_tokens.scss',
        format: 'scss/variables'
      }]
    },
    js: {
      transforms: ['custom/js'],
      buildPath: 'dist/js/',
      files: [{
        destination: 'tokens.js',
        format: 'js/module'
      }, {
        destination: 'three-tokens.js',
        format: 'js/three'
      }]
    }
  }
}; 