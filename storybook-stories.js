const pipeline = (x) => x();

const importers = [
  async (path) => {
    if (!/^\.[\\/](?:src\/app(?:\/(?!\.)(?:(?:(?!(?:^|\/)\.).)*?)\/|\/|$)(?!\.)(?=.)[^/]*?\.(mdx|stories\.(js|jsx|ts|tsx)))$/.exec(path)) {
      return;
    }
  
    const pathRemainder = path.substring(10);
    return import(
      /* webpackChunkName: "[request]" */
      /* webpackInclude: /(?!.*node_modules)(?:\/src\/app(?:\/(?!\.)(?:(?:(?!(?:^|\/)\.).)*?)\/|\/|$)(?!\.)(?=.)[^/]*?\.(mdx|stories\.(js|jsx|ts|tsx)))$/ */
      './src/app/' + pathRemainder
    );
  }
  
];

export async function importFn(path) {
  const offset = '';

  for (let i = 0; i < importers.length; i++) {
    const pathWithOffset = buildPath(offset, path)

    const moduleExports = await pipeline(() => importers[i](pathWithOffset));
    if (moduleExports) {
      return moduleExports;
    }
  }
}

function buildPath(offset, path) {
  if(path.startsWith('./')) {
    return offset + '/' + path.substring(2);
  } else {
    return offset + '/' + path;
  }
}