# versions-control

> Playtika Core team versions control tool

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Docker

``` 
docker build -t versions-tool-frontend .
docker run -it -p 80:80 --rm --name dockerize-versions-tool-frontend versions-tool-frontend
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
