import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;

  constructor(
    private formService: FormService
  ) { }

  ngOnInit() { }

  private get errorMessage(): string {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return this.formService.getErrorMessage(this.label, propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

}
