# Beta-Omega-Chi Website

This repository contains a React implementation of the Social Club site. The React
application lives in the `react-app` folder and was bootstrapped with Create React
App. The app provides a login page and a simple personal calendar powered by
`localStorage`.

## Running the React app

```bash
cd react-app
npm start
```

This will start the development server and open the site at
`http://localhost:3000`.

## Deploying to GitHub Pages

The `docs` folder contains the compiled site that is served by GitHub Pages. To
rebuild it after making changes run:

```bash
npm --prefix react-app run build
rm -rf docs && cp -r react-app/build docs
```

Then commit the updated `docs` folder and push. Configure the repository's
GitHub Pages settings to use the `docs` directory as the site source.
