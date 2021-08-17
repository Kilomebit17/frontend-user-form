import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Frameworks, FrameworksVersions, User, UserHobby} from './interfaces';
import {
  MaterialDatepicker,
  MaterializeService,
} from './shared/services/materialize.service';
import {UserService} from './shared/services/user.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  frameworks: Frameworks[] = [];
  frameworksVersion: FrameworksVersions[]
  userHobby: UserHobby[] = []

  form: FormGroup

  @ViewChild('datepicker') datePicker: ElementRef;
  pickBirthday: MaterialDatepicker;

  isSelectedValue: boolean = false
  isButtonDisabled: boolean = true;

  constructor(private service: UserService) {
  }

  ngOnInit() {
    this.service.getFrameworks().subscribe((frameworks) => {
      this.frameworks = frameworks;
    });

    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      framework: new FormControl('', Validators.required),
      frameworkVersion: new FormControl('', Validators.required),
      hobbyName: new FormControl(null, Validators.required),
      hobbyDuration: new FormControl(null, Validators.required)
    })

  }

  ngAfterViewInit() {
    this.pickBirthday = MaterializeService.initDatePicker(this.datePicker, this.validateDatePicker.bind(this));
  }

  public removeValidators(form: FormGroup) {
    form.reset()
    this.datePicker.nativeElement.value = ''
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }

  onSubmit() {
    this.form.disable()
    this.isButtonDisabled = true

    let hobby: UserHobby[] = this.userHobby.map(u => u)
    let isCanSubmit: boolean
    const user: User = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      dateOfBirth: this.datePicker.nativeElement.value,
      framework: this.form.value.framework,
      frameworkVersion: this.form.value.frameworkVersion.v,
      email: this.form.value.email,
      hobby: hobby
    }
    hobby.forEach(f => {
      isCanSubmit = f.name && f.duration !== "" || null;
    })
    if (isCanSubmit) {
      this.service.sendUserForm(user).subscribe(() => {
        this.removeValidators(this.form)
        this.isButtonDisabled = true
        this.form.enable()
        MaterializeService.toast('Successful dispatch')
      })
    } else {
      this.removeValidators(this.form)
      this.isButtonDisabled = true
      this.form.enable()
      return MaterializeService.toast('Error, please indicate your hobby in field before dispatch')
    }

  }

  validateDatePicker() {
    if (!this.datePicker.nativeElement.value) {
      this.isButtonDisabled = true
    }
  }

  selectOption(name: string) {
    this.isSelectedValue = true
    this.frameworks.filter(f => {
      if (f.name === name) {
        this.frameworksVersion = f.version
      }
    })

  }

  addHobbies() {
    if (!this.form.value.hobbyName || !this.form.value.hobbyDuration) {
      MaterializeService.toast(`please indicate your hobby in field`)
    } else if (this.form.value.hobbyName || this.form.value.hobbyDuration) {
      MaterializeService.toast(`Added a new hobby`)
      this.isButtonDisabled = false
      let hobby = {
        name: this.form.value.hobbyName,
        duration: this.form.value.hobbyDuration,
      }
      this.userHobby.push(hobby)
    }

  }

}
