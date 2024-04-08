# earthquakes

Welcome to my first ever vue project! It pulls in data for significant earthquakes in the last month from a usgs endpoint and displays it on a map. This application is not yet responsive so is best run on a desktop or laptop device. It has only been tested in Chrome so far, so Chrome is the recommended browser.

Tech Stack:

- [Vue 3](https://vuejs.org/) - Chosen JS Framework as the goal of this exercise was to learn Vue.
- [Mapboxgl](https://www.mapbox.com/mapbox-gljs) - Web mapping library
- [Pinia](https://pinia.vuejs.org/) - State management library, now recommended instead of Vuex for state management in Vue but has "has almost the exact same or enhanced API as Vuex 5. You could simply consider Pinia as Vuex 5 with a different name".
- [Vite](https://vitejs.dev/) - Recommended Build tool
- [Vitest](https://vitest.dev/) - Unit testing
- [Vuetify](https://vuetifyjs.com/en/) - UI library lightly used to test how it works
- [Playwright](https://playwright.dev/) - End-to-end testing. nb. ran out of time to implement e2e tests :(

## Project Setup

To run this app first create a .env.local file in the root directory and add the following to it:

`VITE_MAPBOX_API_KEY='YourMapboxKeyHere'`

then run

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run start
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Summary of Project approach

### Inspiration & Design

> [!NOTE]
> Screenshots of the moodboard, design and some of the dev process can be viewed in the assets/process directory.

First I looked for design inspiration from other applications that display similar data, or have similar interactions & collated these in a moodboard in Figma.

One of the key inspirations for the app design comes from a talk I attended at the [Information+](https://informationplusconference.com/2023/) conference held in Edinburgh in November 2023. Hungarian data journalist Krisztián Szabó presented [ATLO's Information is Beautiful award-winning work on earthquakes](https://atlo.team/wp-content/uploads/2024/03/foldrengesatlasz.html).

For displaying the attribute data I explored a table approach against a card list approach by generating two indicative designs in Figma. I decided on the card approach as I thought it would enable me to explore presentational components in Vue and also was a more friendly ui that optimised screen space. I also intended to make this content another page within the app so I could play with routing but again ran out of time.

The globe projection was chosen over a regular flat map because I am working with a global dataset and I wanted to try it out.

### Setting up the app

Alongside the tech listed in the tech stack section above, I set up the app with a husky pre-commit hook to ensure that the [conventional commit standard](https://www.conventionalcommits.org/en/v1.0.0/) would be adhered to throughout the project.

After creating the repository, I created a github action to run some CI processes such as linting, unit testing and building on pull request. This was to ensure I did not commit any failing code to main.

Normally I use Jira for task management but I tried out github issues for this one. Before getting to work I created a backlog of foreseeable tasks to fully implement the application.

Vue has 2 ways of writing code, the options api and the composition api. I chose to use the composition api as it seemed more familiar to me coming from Angular & React. One challenge throughout development was translating tutorials and example code from options api into the composition api.

### Building the app

The biggest challenging building the app was learning a whole new framework, state library and testing library in a very short time (in fact the only part of the tech stack I have worked with before is mapbox and playwright a little). I spent a lot of time reading docs, watching videos and looking for examples to make sure I got the implemetations right (and it's probably a little shy of best practice as this is my first go). Across the app I took the approach of trying to find different ways to do things so I could assess the differences between approaches.

I would like the app to be more comprehensively tested but was up against it with time so compromised testing for functionality implementation, however made sure to include some tests (specifically on the earthquakes store) to provide an indication of what unit testing in this application might look like.

### Developing further

When switching out the significant events endpoint for one that has all the events in the past month, there is a significant performance lapse which indicates the code could be optimised. I would like to ensure that the app is scalable and can accommodate larger datasets.
