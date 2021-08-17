import {ElementRef} from '@angular/core';
import * as M from 'materialize-css';

export interface MaterialInstance {
  open?(): void;

  close?(): void;

  destroy?(): void;
}

export interface MaterialDatepicker extends MaterialInstance {
  date?: Date;
}

export class MaterializeService {
  static toast(message:string) {
    M.toast({html:message})
  }

  static initDatePicker(ref: ElementRef, onClose: () => void): MaterialDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      yearRange: 30,
      maxDate: new Date(2021, 11, 31),
      onClose
    });
  }
}
