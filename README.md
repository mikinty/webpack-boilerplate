# Webpack Boilerplate
Adapted from the SurviveJS Webpack tutorial, with some handpicked packages.

# Features
## Main
1. Babel
2. HTML Webpack Plugin
3. Support for deploying onto Github Pages
4. Hot Module Replacement
5. Multiple page support
6. Sourcemaps - good for debuggin
7. Yarn - lock file is cool

## CSS
1. SASS - may not be processed and imported as intended
2. Autoprefixer
3. Modules - see below for why this is causing trouble

## Testing
1. Mocha - for unit tests
2. Karma - to view tests
3. Istanbul - code coverage, integrated into karma config

## Optimizations
1. Minification for JS and CSS
2. Minification of packages by deleting unused code
3. Application/Vendor splitting - code splitting is good
4. Hashing for build files - caching is good
5. Record and stats files are generated for analysis

# Improvements
Don't _fully_ understand webpack and all the technologies but this is a good start...
1. CSS Modules - these classnames are very annoying