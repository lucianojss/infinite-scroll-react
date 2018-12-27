# Infinite Scrolling Message List

React application that efficiently renders infinite list of messages.

### Demo

As requested the demo version is protected with a simple prompt window.
A demo version can be seen on this link:

-   https://goo.gl/KnX3Wk (password: google)

### Overall Progress and constraints

The biggest challenge on this task was dealing with a very long list of messages, because more items you load more DOM is generated causing the browser to spend more time to render it, That causes smoothness to drop significantly, and if we are dealing with low end devices this is even more noticeable.

The approach I took was loading to the DOM only the messages that are visible in the viewport and when the user scrolls down the messages that are not anymore in the viewport are removed, while the next ones are loaded.
This allow us to keep always the same number of DOM elements even when more and more messages are fetched keeping the application smooth. This is the same behavior that for example Instagram uses for infinite loading.
To archive this result I used [react-virtualized](https://github.com/bvaughn/react-virtualized)

To handle the swipe out action I picked [React draggable](https://github.com/mzabriskie/react-draggable) that offers an out of the box component to handle drag and drop events.

Main Tech stack:

-   [React](https://reactjs.org/)
-   [Redux](https://redux.js.org/)
-   [React Virtualized](https://github.com/bvaughn/react-virtualized)
-   [Material-UI](https://material-ui.com/)
-   [React draggable](https://github.com/mzabriskie/react-draggable)
-   [Day.js](https://github.com/iamkun/dayjs)

### With more time I would like to add:

-   Add Service Worker to get offline support and cache assets.
-   Save current state of the application so if user reloads the page it will keep the deleted messages and pushed messages will not be fetched again.
-   Add smooth animations during message swiping.
-   Add redo and undo actions when deleting a message.
-   Finish Unit tests to react components.

## Prerequisites

To run locally the app, you need to have node version 10 (recommended) installed in your machine.

## Run client locally

For development mode:

    npm install
    npm run start

For production you can run following command that will generate a build folder.
  
 npm install
npm run build

## Run unit tests

In order to execute the unit tests run the following command:

    npm run test
