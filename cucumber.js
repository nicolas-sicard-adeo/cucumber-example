const common = {
  requireModule: ["@swc/register"],
  require: ["./**/test/**/*.step.ts"],
  forceExit: true,
};

module.exports = {
  usage: {
    ...common,
    format: ["progress-bar", "usage-json:./cucumber-usage.json"],
  },
  default: {
    ...common,
    format: ["progress"],
  },
};
