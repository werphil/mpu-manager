import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'RepeatToText'
})
export class RepeatToTextPipe implements PipeTransform {

  transform(value: number): string {
    const options = ['keine', 'in Tabelle', 'als Subformular'];
    return options[value];
  }

}
