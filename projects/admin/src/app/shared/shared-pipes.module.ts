/*
 * RERO ILS UI
 * Copyright (C) 2020 RERO
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

import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContributionFormatPipe } from '../pipe/contribution-format.pipe';
import { IdAttributePipe } from '../pipe/id-attribute.pipe';
import { MainTitlePipe } from '../pipe/main-title.pipe';
import { PatronBlockedMessagePipe } from '../pipe/patron-blocked-message.pipe';
import { ProvisionActivityPipe } from '../pipe/provision-activity.pipe';

@NgModule({
  declarations: [
    ContributionFormatPipe,
    IdAttributePipe,
    MainTitlePipe,
    ProvisionActivityPipe,
    PatronBlockedMessagePipe
  ],
  exports: [
    ContributionFormatPipe,
    IdAttributePipe,
    MainTitlePipe,
    ProvisionActivityPipe,
    PatronBlockedMessagePipe
  ],
  providers: [
    DatePipe
  ]
})
export class SharedPipesModule {}
