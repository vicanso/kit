function SetConfigs({ options }) {
  this.options = options;
}
SetConfigs.prototype.apply = function apply(compiler) {
  const {
    env,
    target,
    apiPrefix,
  } = this.options;
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, cb) => {
      let html = htmlPluginData.html;
      html = html
        .replace(/env: '\S+?'/, `env: '${env}'`);
      if (target) {
        html = html
          .replace(/target: '\S+?'/, `target: '${target}'`);
      }
      if (apiPrefix) {
        html = html
          .replace(/apiPrefix: '\S+?'/, `apiPrefix: '${apiPrefix}'`);
      }
      htmlPluginData.html = html;
      cb(null, htmlPluginData);
    });
  });
};

module.exports = SetConfigs;
