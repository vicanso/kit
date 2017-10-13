function SetConfigs({ options }) {
  this.options = options;
}

SetConfigs.prototype.apply = function apply(compiler) {
  const {
    env,
    target,
  } = this.options;
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, cb) => {
      let html = htmlPluginData.html;
      html = html.replace("env: 'development',", `env: '${env}',`)
        .replace("target: 'web',", `target: '${target}',`);
      htmlPluginData.html = html;
      cb(null, htmlPluginData);
    });
  });
};

module.exports = SetConfigs;
