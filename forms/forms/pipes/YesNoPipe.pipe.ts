import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'YesNoPipe'
})
export class YesNoPipe implements PipeTransform {

  transform(value: boolean): string {
    return (value) ? 'Ja' : 'Nein';
  }

}
