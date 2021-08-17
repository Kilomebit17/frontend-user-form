import { Directive } from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs";
import {UserService} from "./services/user.service";
import {delay, map} from "rxjs/operators";

@Directive({
  selector: '[uniqueEmail]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi:true}]
})
export class UniqueEmailValidatorDirective implements AsyncValidator{

  constructor(private service:UserService) { }

  validate(c:AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.service.getUserByEmail(c.value).pipe(
      delay(2000),
      map(users => {
        return users && users.length > 0 ? {uniqueEmail:true} : null
      })
    )
  }
}
