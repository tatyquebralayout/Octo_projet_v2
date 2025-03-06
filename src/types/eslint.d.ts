declare module '@eslint/js' {
  type RuleLevel = 'off' | 'warn' | 'error' | 0 | 1 | 2;
  type RuleConfig = RuleLevel | [RuleLevel, ...unknown[]];
  
  const configs: {
    recommended: {
      rules: Record<string, RuleConfig>;
    };
  };
  export default { configs };
} 