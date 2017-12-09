import pxtorem from 'postcss-pxtorem';
const path = require('path');
const svgSpriteDirs = [
  require.resolve( 'antd-mobile' ).replace( /warn\.js$/ , '' ) ,
  // antd-mobile 内置svg
  // 业务代码本地私有 svg 存放目录
  path.resolve( __dirname , 'src/assets/icon' ) ,
];

export default {
  entry : {
    app: "./src/index.js",
    common: "./src/vendor.js"
  } ,
  hash: true,
  multipage: true,
  less: true,
  theme: {
    '@primary-color': 'rgb(100,194,92)',
    '@primary-grey': '#949494',
    '@hd': '2px',
  },
  disableCSSModules : true,
  ignoreMomentLocale: true, // 忽略moment的locale
  publicPath : "./" ,
  svgSpriteLoaderDirs : svgSpriteDirs ,
  autoprefixer : {
    browsers : [
      "iOS >= 8" ,
      "Android >= 4"
    ]
  },
  proxy : {
    "/": {
      "target": "http://app.nefuer.net",
      "changeOrigin": true,
      "pathRewrite": { "^/" : "" }
    }
  },
  extraPostCSSPlugins : [
    pxtorem( {
      rootValue : 100 ,
      propWhiteList : [] ,
    }),
  ],
  // style 必须是 true
  extraBabelPlugins : [
    "transform-runtime" ,
    [
      "import" ,
      [
        { libraryName : "antd-mobile" , "libraryDirectory" : "lib" , "style" : true },
      ]
    ]
  ],
  env : {
    development : {
      extraBabelPlugins : [
        "dva-hmr"
      ]
    }
  },
  // dllPlugin: {
  //   "exclude": [
  //     "babel-runtime"
  //   ],
  //   "include": [
  //     "dva/router",
  //     "dva/saga",
  //     "dva/fetch",
  //     "react",
  //     "react-dom",
  //   ]
  // }
};

