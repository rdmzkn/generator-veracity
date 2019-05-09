# Veracity Single-Page-Application
Welcome to your generated Single-Page application. This is your starting point for building an app that integrates with Veracity. The project consists of a `client` and `server`. To read more about these parts open their respective folders and check out their `README.md` files.

## Development
This project is optimized for development with [VisualStudio Code (VSCode)](https://code.visualstudio.com/). It contains the necessary configuration to start the server component in debug mode directly by hitting F5 (see documentation for the debug tool in VSCode online).

1. Start the client code by running `npm start` within the `client` folder.
2. Start the server in debug mode from VSCode by hitting F5 or by using the debug tools and selecting the "Debug Veracity SPA" configuration.

After this you should now have a running development environment supporting hot-reloading of client changes.

## Production
To build the project for production just run:
```
npm run build
```

in the `client` and `server` folders respectively. The final application will outputted to the `dist` folder.