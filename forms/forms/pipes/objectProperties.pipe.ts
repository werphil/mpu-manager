import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ObjectProperties'
})
export class ObjectPropertiesPipe implements PipeTransform {

  transform(value: {}): string[] {
    if (!value) {
      return [];
    }
    return Object.keys(value);
  }

}
