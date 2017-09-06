# universal-react-boilerplate
Project boilerplate for a universal react/redux app with react-router, server-side rendering, code splitting and hot module replacement

## Installation
```javascript
npm install
npm run dev
```

Open up `localhost:3000`

## How it works
The code is intended to be shared among backend and frontend, thus it resides inside the `shared` folder. However there's some differences in bootstrapping react-router on the backend vs. on the frontend.

### Frontend
On the frontend the app is wrapped inside react router's `<BrowserRouter />` and inside react-redux' `<Provider />`.
```javascript
render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
```

### Backend
On the backend side you need to utilize react's `renderToString` method found in `react-dom/server`. This renders your whole app to an HTML string which can be injected in a server template (be it .ejs, .pug or whatever). Redux wiring goes as on the frontend. However react-router needs to use `<StaticRouter />` instead of `<BrowserRouter />`. Here's the whole route, suggesting that you use express.js as your backend server.
```javascript
app.get('*', (req, res) => {
    const context = {};
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );
    res.render('index', { html });
});
```

## Hot Reloading
This repo makes use of webpack for bundling and of `webpack-dev-middleware` and `webpack-hot-middleware` for hot reloading react components as you go. I'm not sure if my config is perfect - most probably not. It seems to work but if you have a look at the webpack config you'll see that it is kind of hacky in some places. 

## Build
Once you're done developing, you can `npm run build` in order to generate the production builds. An app code bundle with your own code is being geneated (`bundle.[hash].js`) as well as a bundle for all vendor libs (`vendor.[hash].js`). After the build just run `npm start` and watch your production version.

## Shortcomings
There are, I am sure. For example when you've built the project and want to go back to development mode, you need to manually replace the content of `index.ejs` file with a new boilerplate in order to make the dev environment work again:

``` html
<!doctype html>
<html>
    <head>
        <title>App</title>
    </head>
    <body>
        <div id="root"><%- html %></div>
        <script type="text/javascript" src="/manifest.js"></script>
        <script type="text/javascript" src="/vendor.js"></script>
        <script type="text/javascript" src="/bundle.js"></script>
    </body>
</html>
```

This is necessary since the production version of `index.ejs` features the hash version file names of the scripts.

## Why did you build that by yourself and not use one of the boilerplates out there?
Simply because I wanted to get a grasp of all that webpack stuff (kind of... it's tricky) and most of the others just deviate from my expectations so I decided to do my own. With other boilerplates I struggled to get hot module replacement working and many of them require to separate node servers to run (backend + webpack dev server). Proxying dev server API calls to the backend server is hacky, too. :D The others probably are more solid than this one, but as long as this suits my needs I'll stick with it.
