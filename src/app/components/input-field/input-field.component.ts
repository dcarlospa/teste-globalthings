import { Component, forwardRef, Input, Provider } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() type = 'text';
  @Input() position = 'stacked';
  @Input() control: FormControl;
  @Input() isReadOnly = false;

  private innerValue: string;

  constructor() { }

  private get required(): boolean {
    const validator = this.control.validator && this.control.validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }

    return false;
  }

  private get value(): string {
    return this.innerValue;
  }

  private set value(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onChangeCallback: (_: any) => void = () => { };
  onTouchCallback: (_: any) => void = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

}
