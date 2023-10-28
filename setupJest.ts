import 'jest-preset-angular/setup-jest';

module.exports = {
    // ... otras configuraciones ...
  
    moduleNameMapper: {
      "@core/*": ["src/app/core/*"],
      "@presentation/*": ["src/app/presentation/*"],
      "@assets/*": ["src/assets/*"]
      // ... otros mapeos ...
    },
  
    // ... otras configuraciones ...
};