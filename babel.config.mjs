export default {
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
      modules: false // This is important for ES modules
    }]
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { 
          targets: { node: 'current' },
          modules: 'auto' // Let Babel handle modules in test environment
        }]
      ]
    }
  }
};