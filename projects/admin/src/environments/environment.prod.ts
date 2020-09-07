/*
 * RERO ILS UI
 * Copyright (C) 2019 RERO
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export const environment = {
  production: true,
  apiBaseUrl: '',
  $refPrefix: 'https://ils.bib.uclouvain.be',
  languages: ['fr', 'de', 'it', 'en', 'nl', 'es'],
  defaultLanguage: 'en',
  adminRoles: ['system_librarian', 'librarian'],
  sessionExpiredSeconds: 1800, /* Seconds => 1800: 30 minutes */
  translationsURLs: [
    'static/node_modules/@rero/rero-ils-ui/dist/admin/assets/rero-ils-ui/admin/i18n/${lang}.json',
    '/api/translations/${lang}.json'
  ],
  librarySwitchCheckParamsUrl: ['new', 'edit']
};
