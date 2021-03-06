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

/* tslint:disable */
// required as json properties is not lowerCamelCase

import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { User } from './user';

export function _(str) {
  return marker(str);
}

export enum ItemStatus {
  ON_SHELF = _('on_shelf'),
  AT_DESK = _('at_desk'),
  ON_LOAN = _('on_loan'),
  IN_TRANSIT = _('in_transit'),
  EXCLUDED = _('excluded'),
  MISSING = _('missing')
}

export enum ItemNoteType {
  GENERAL = _('general_note'),
  STAFF = _('staff_note'),
  CHECKIN = _('checkin_note'),
  CHECKOUT = _('checkout_note'),
  BINDING = _('binding_note'),
  PROVENANCE = _('provenance_note'),
  CONDITION = _('condition_note'),
  PATRIMONIAL = _('patrimonial_note'),
  ACQUISITION = _('acquisition_note'),
}

export enum IssueItemStatus {
  RECEIVED = _('received'),
  CLAIMED = _('claimed'),
  DELETED = _('deleted'),
  LATE = _('late')
}

export enum LoanState {
  CREATED = _('CREATED'),
  PENDING = _('PENDING'),
  ITEM_ON_LOAN = _('ITEM_ON_LOAN'),
  ITEM_RETURNED = _('ITEM_RETURNED'),
  ITEM_IN_TRANSIT_FOR_PICKUP = _('ITEM_IN_TRANSIT_FOR_PICKUP'),
  ITEM_IN_TRANSIT_TO_HOUSE = _('ITEM_IN_TRANSIT_TO_HOUSE'),
  ITEM_AT_DESK = _('ITEM_AT_DESK'),
  CANCELLED = _('CANCELLED')
}

export interface Organisation {
  pid: string
}

export interface Document {
  pid: string;
  title: string;
}

export enum ItemAction {
  checkout = _('checkout'),
  checkin = _('checkin'),
  request = _('request'),
  lose = _('lose'),
  receive = _('receive'),
  return_missing = _('return_missing'),
  // cancel_loan = _('cancel_loan'),
  extend_loan = _('extend_loan'),
  validate = _('validate'),
  no = _('no')
}

type ItemActionObjectType<R> = {[key in keyof typeof ItemAction]: R };


export class LoanDestination {
  location_name?: string;
  library_name?: string;
  library_code?: string;
  location_code?: string;

  constructor(obj?: any) {
    Object.assign(this, obj)
  }
}

export class Loan {

  pid?: string;
  state: LoanState;
  transaction_date?: Moment;
  patron_pid?: string;
  item_pid?: string;
  start_date?: Moment;
  end_date?: Moment;
  request_expire_date?: Moment;
  pickup_location_pid?: string;
  item_destination?: LoanDestination;

  constructor(obj?: any) {
    Object.assign(this, obj);
    this.request_expire_date = this.convertToMoment(this.request_expire_date);
    this.start_date = this.convertToMoment(this.start_date);
    this.end_date = this.convertToMoment(this.end_date);
    this.transaction_date = this.convertToMoment(this.transaction_date);
  }

  private convertToMoment(data) {
    if (data) {
      return moment(data);
    }
    return null;
  }

  get dueDate() {
    switch (this.state) {
      case LoanState.PENDING:
        return this.request_expire_date;
      case LoanState.ITEM_ON_LOAN:
        return this.end_date;
      default:
        return null;
    }
  }

  public get expired() {
    if (this.dueDate) {
      return this.dueDate.isBefore();
    }
    return false;
  }
}

export class ItemNote {
  type: ItemNoteType;
  content: string;
}

export class Item {

  static PUBLIC_NOTE_TYPES: ItemNoteType[] = [
    ItemNoteType.GENERAL,
    ItemNoteType.BINDING,
    ItemNoteType.PROVENANCE,
    ItemNoteType.CONDITION,
    ItemNoteType.PATRIMONIAL
  ];

  available: boolean;
  barcode: string;
  call_number: string;
  document: any;
  status: ItemStatus;
  organisation: Organisation;
  pid: string;
  requests_count: number;
  action_applied?: ItemActionObjectType<object>;
  _currentAction: ItemAction;
  actionDone: ItemAction;
  loan: Loan;
  actions: ItemAction[] = [];
  pending_loans: Loan[];
  number_of_extensions: number;
  location: any;
  notes: ItemNote[];
  acquisition_date: Moment;
  enumerationAndChronology: string;


  constructor(obj?: any) {
    Object.assign(this, obj);
    if (obj.pending_loans) {
      this.pending_loans = obj.pending_loans.map(loan => new Loan(loan));
    }
    if (this.actions !== undefined) {
      this.actions.unshift(ItemAction.no);
    }
  }

  setLoan(obj?: any) {
    this.loan = new Loan(obj);
  }

  public set currentAction(action: ItemAction) {
    this._currentAction = action;
  }
  public get currentAction() {
    if (this._currentAction) {
      return this._currentAction;
    }
    return ItemAction.no;
  }

  public isActionLoan() {
    return this.currentAction === ItemAction.checkout;
  }

  public isActionReturn() {
    return this.currentAction === ItemAction.checkin;
  }

  public requestedPosition(patron: User) {
    return (!patron || !this.pending_loans)
      ? 0
      : this.pending_loans.findIndex(loan => loan.patron_pid === patron.pid) + 1;
  }

  public get hasRequests() {
    return (this.pending_loans && this.pending_loans.length > 0);
  }

  /** Search on item notes a note corresponding to the note type
   *
   * @param type: the note type
   * @return Return the corresponding note or null if not found
   */
  public getNote(type: ItemNoteType): ItemNote | null {
    if (this.notes == null) {
      return null;
    }
    const filteredNotes = this.notes.filter(note => note.type === type);
    return (filteredNotes)
      ? filteredNotes[0]
      : null;
  }
}
