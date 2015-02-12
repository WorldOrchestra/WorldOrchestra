# WorldOrchestra

[ ![Codeship Status for WorldOrchestra/WorldOrchestra](https://codeship.com/projects/3eb4b8d0-9521-0132-ffbf-466960a0e7d2/status?branch=master)](https://codeship.com/projects/62739)

[![Code Climate](https://codeclimate.com/github/WorldOrchestra/WorldOrchestra/badges/gpa.svg)](https://codeclimate.com/github/WorldOrchestra/WorldOrchestra)

Bringing the world together - one track at a time.

## Team

  - __Product Owner__: 
  - __Scrum Master__: 
  - __Development Team Members__: 

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

### Installing Dependencies

From within the root directory:

```sh
npm install
bower install
```

## Usage

From the root directory run: 

TODO
- `grunt` : Runs jshint, tests and builds the project.
- `grunt build` : Builds the project. All production ready files are stored in the `dist` directory.
- `grunt serve` : Builds the project and runs a server locally for a preview of the site. 

## Development

TODO
All development is done in folders outside of root. Running `grunt` will build your project into the `dist` folder. Use the `dist` folder for pushing to a production server. You can find instructions for how to do so on the yeoman generator [site](https://github.com/DaftMonk/generator-angular-fullstack#heroku).

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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
