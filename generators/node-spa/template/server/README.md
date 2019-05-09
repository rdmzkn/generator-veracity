# Server
This is the server side of your application. It has a few useful features that you can build upon, but its primary here to provide a minimal base that you can modify and expand upon.

- [Express](https://expressjs.com/) - for a robust web-server base
- [Winston](https://github.com/winstonjs/winston) - for logging
- [PassportAzureAD](https://github.com/AzureAD/passport-azure-ad) - for authenticating against Veracity
- Automatic generation of development mode SSL certificates

## Configuration
The server comes with a simple configuration loader. Configs are provided as JavaScript objects and resolved from the config folder by finding the first defined value of the following:

1. `process.env.APPSETTING_APP_ENV`
2. `process.env.APP_ENV`
3. Use "dev"

The first value that is defined is used as the prefix of the config file name followed by `.config.js`. If no file is found an error is thrown and the application stops.