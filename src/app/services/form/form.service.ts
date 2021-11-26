import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  public getErrorMessage(fieldName: string, validatorName: string, validatorValue?: any): string {
    const config = {
      required: `${fieldName} é obrigatório(a).`,
      email: 'Formato de e-mail incorreto.',
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      notMatch: `Senhas diferentes.`
    };

    return config[validatorName];
  }

}
