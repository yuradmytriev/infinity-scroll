import webpack from 'webpack';
import webpackConfig from './webpack.config';


const bundle = () => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig)
      .run((err, stats) => {
        if (err) return reject(err);
        return resolve();
      });
  });
}

export default bundle;
