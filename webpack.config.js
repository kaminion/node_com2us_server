const path = require('path');

module.exports = {
    name: 'com2us',
    mode: 'none',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // 1. 합칠파일 입력, 이 파일 기준으로 모든 dependencies 추가
    entry: './react/index.js',
    // 2. 
    module: {
        rules:[{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader'
        }]
    },
    // 3. 합친 뒤 출력될 곳 지정
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'app.js'
    },
    externals: {
        // 외부라이브러리
        "react": "React",
        "react-dom": "ReactDOM"
    }

};