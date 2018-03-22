import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import queryString from 'query-string';
import { createPath } from 'history/PathUtils';

import App from './components/App';
import createFetch from './createFetch';
import configureStore from './store/configureStore';
import history from './history';
import { updateMeta } from './DOMUtils';
import router from './router';


const context = {
  insertCss: (...styles) => {
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
  fetch: createFetch(self.fetch, {
    baseUrl: window.App.apiUrl,
  }),
  store: configureStore(window.App.state, { history }),
  storeSubscription: null,
};

const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let onRenderComplete = function initialRenderComplete() {
  const elem = document.getElementById('css');
  if (elem) elem.parentNode.removeChild(elem);
  onRenderComplete = function renderComplete(route, location) {
    document.title = route.title;

    updateMeta('description', route.description);

    let scrollX = 0;
    let scrollY = 0;
    const pos = scrollPositionsHistory[location.key];
    if (pos) {
      scrollX = pos.scrollX;
      scrollY = pos.scrollY;
    } else {
      const targetHash = location.hash.substr(1);
      if (targetHash) {
        const target = document.getElementById(targetHash);
        if (target) {
          scrollY = window.pageYOffset + target.getBoundingClientRect().top;
        }
      }
    }

    // Restore the scroll position if it was saved into the state
    // or scroll to the given #hash anchor
    // or scroll to top of the page
    window.scrollTo(scrollX, scrollY);

    // Google Analytics tracking. Don't send 'pageview' event after
    // the initial rendering, as it was already sent
    if (window.ga) {
      window.ga('send', 'pageview', createPath(location));
    }
  };
};

const container = document.getElementById('app');
let appInstance;
let currentLocation = history.location;

async function onLocationChange(location, action) {

  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };

  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  try {
    const route = await router.resolve({
      ...context,
      path: location.pathname,
      query: queryString.parse(location.search),
    });

    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    appInstance = ReactDOM.render(
      <App context={context}>{route.component}</App>,
      container,
      () => onRenderComplete(route, location),
    );
  } catch (error) {
    if (__DEV__) {
      throw error;
    }

    console.error(error);

    if (action && currentLocation.key === location.key) {
      window.location.reload();
    }
  }
}

history.listen(onLocationChange);
onLocationChange(currentLocation);
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance) {
      deepForceUpdate(appInstance);
    }

    onLocationChange(currentLocation);
  });
}
