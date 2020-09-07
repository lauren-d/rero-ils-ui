export const environment = {
  production: true,
  apiBaseUrl: '',
  $refPrefix: 'https://ils.bib.uclouvain.be',
  languages: ['fr', 'de', 'it', 'en', 'nl', 'es'],
  globalViewName: 'global',
  translationsURLs: [
    '/static/node_modules/@rero/rero-ils-ui/dist/public-search/assets/rero-ils-ui/public-search/i18n/${lang}.json',
    '/api/translations/${lang}.json'
  ]
};
