export function showFormattedDate(date, locale = 'en-US', options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function setupSkipToContent(element, mainContent) {
  element.addEventListener('click', () => mainContent.focus());
}
 
export function transitionHelper({ skipTransition = false, updateDOM }) {
  if (skipTransition || !document.startViewTransition) {
    const updateCallbackDone = Promise.resolve(updateDOM()).then(() => {});

    return {
      ready: Promise.reject(Error('View transitions unsupported')),
      updateCallbackDone,
      finished: updateCallbackDone,
    };
  }

  return document.startViewTransition(updateDOM);
}

export function isServiceWorkerAvailable() {
  return 'serviceWorker' in navigator;
}
 
export async function registerServiceWorker() {
  if (!isServiceWorkerAvailable()) {
    console.error('Service Worker API unsupported');
    return;
  }
 
  try {
    await navigator.serviceWorker.register('/sw.bundle.js');
  } catch (error) {
    console.error('Failed to install service worker:', error);
  }
}
