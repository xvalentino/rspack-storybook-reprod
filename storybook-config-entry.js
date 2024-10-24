import { createBrowserChannel } from 'storybook/internal/channels'
import {
  PreviewWeb,
  addons,
  composeConfigs,
} from 'storybook/internal/preview-api'

import { global } from '@storybook/global'

import { importFn } from './storybook-stories.js'

const getProjectAnnotations = () =>
  composeConfigs([require('/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/react/dist/entry-preview.mjs'),require('/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/react/dist/entry-preview-docs.mjs'),require('/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/docs/preview.mjs'),require('/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/actions/preview.mjs'),require('/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/backgrounds/preview.mjs'),require('/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/viewport/preview.mjs'),require('/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/measure/preview.mjs'),require('/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/outline/preview.mjs'),require('/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/highlight/preview.mjs'),require('/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-interactions/dist/preview.mjs'),require('/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/.storybook/preview.ts')])

const channel = createBrowserChannel({ page: 'preview' })
addons.setChannel(channel)

if (global.CONFIG_TYPE === 'DEVELOPMENT') {
  window.__STORYBOOK_SERVER_CHANNEL__ = channel
}

const preview = new PreviewWeb(importFn, getProjectAnnotations)

window.__STORYBOOK_PREVIEW__ = preview
window.__STORYBOOK_STORY_STORE__ = preview.storyStore
window.__STORYBOOK_ADDONS_CHANNEL__ = channel

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept('./storybook-stories.js', () => {
    // importFn has changed so we need to patch the new one in
    preview.onStoriesChanged({ importFn })
  })

  import.meta.webpackHot.accept(['/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/react/dist/entry-preview.mjs','/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/react/dist/entry-preview-docs.mjs','/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/docs/preview.mjs','/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/actions/preview.mjs','/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/backgrounds/preview.mjs','/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/viewport/preview.mjs','/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/measure/preview.mjs','/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/outline/preview.mjs','/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-essentials/dist/highlight/preview.mjs','/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/node_modules/@storybook/addon-interactions/dist/preview.mjs','/Users/valentino/dev/rspack-storybook-reprod/rspack-storybook-reprod/.storybook/preview.ts'], () => {
    // getProjectAnnotations has changed so we need to patch the new one in
    preview.onGetProjectAnnotationsChanged({ getProjectAnnotations })
  })
}
