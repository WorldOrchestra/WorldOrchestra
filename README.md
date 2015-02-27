# WorldOrchestra

[ ![Codeship Status for WorldOrchestra/WorldOrchestra](https://codeship.com/projects/3eb4b8d0-9521-0132-ffbf-466960a0e7d2/status?branch=master)](https://codeship.com/projects/62739)

[![Code Climate](https://codeclimate.com/github/WorldOrchestra/WorldOrchestra/badges/gpa.svg)](https://codeclimate.com/github/WorldOrchestra/WorldOrchestra)

Bringing the world together - one track at a time.

## Team

  - __Product Owner__: Dave Fedele
  - __Scrum Master__: Albert Lee
  - __Development Team Members__: Domen Vajevec, Tyler Davis
  - __Key Master__: Tyler Davis
  - __CDN__: Domen Vajevec
  - __Eastern European__: Domen Vajevec
  - __The Fonz__: Dave Fedele
  - __The Zoomkeeper__: Dave Fedele
  - __The Domenator__: Domen Vajevec

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

- Node 0.10.x
- MongoDB
- Grunt
- Bower

### Installing Dependencies

From within the root directory:

```sh
npm install
bower install
```

## Usage

From the root directory run: 

- `grunt` : Runs jshint, tests and builds the project.
- `grunt build` : Builds the project. All production ready files are stored in the `dist` directory.
- `grunt serve` : Runs a local server for a preview of the site using the original files. 
- `grunt serve:dist` : Builds the project and runs a server locally for a preview of the site using the concatenated and uglified files. 
- `grunt serve:test` : Runs a local server and opens the test file for Mocha, Chai, and Sinon.

## Development

All development is done in the public or server folders.  Running `grunt` or `grunt build` will build your project into the `dist` folder.  Use the `dist` folder for pushing to a production server.

TODO
An example client component in `client/app`

    main
    ├── main.js                 - Routes
    ├── main.controller.js      - Controller for our main route
    ├── main.controller.spec.js - Test
    ├── main.html               - View
    └── main.less               - Styles

An example server component in `server/api`

    thing
    ├── index.js                - Routes
    ├── thing.controller.js     - Controller for our `thing` endpoint
    ├── thing.model.js          - Database model
    ├── thing.socket.js         - Register socket events
    └── thing.spec.js           - Test

### Roadmap

View the project roadmap [here](https://github.com/WorldOrchestra/WorldOrchestra/issues)

[![Stories in Ready](https://badge.waffle.io/worldorchestra/worldorchestra.png?label=ready&title=Ready)](https://waffle.io/worldorchestra/worldorchestra)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Resources

http://blog.dirk-eisenberg.de/2014/12/21/deploy-angularjs-apps-to-azure-websites-with-codeship/
http://stackoverflow.com/questions/18924263/how-to-fix-error-please-set-env-variable-chrome-bin-when-running-angular-js-wi
http://backbonetutorials.com/organizing-backbone-using-modules/
http://bl.ocks.org/hunzy/11110940
