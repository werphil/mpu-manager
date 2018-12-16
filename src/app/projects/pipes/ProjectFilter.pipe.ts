import { Pipe, PipeTransform } from '@angular/core';
import { ProjectListProject } from '../models/project';

@Pipe({
  name: 'ProjectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

  transform(items: ProjectListProject[], filter: string): any {
    filter = filter.toLowerCase();
    if (!items || !filter) {
        return items;
    }
    return items.filter(item => {
      if (item.Name.toLowerCase().indexOf(filter) !== -1) {
        return true;
      }
      return item.Forms.filter(form => form.Name.toLowerCase().indexOf(filter) !== -1).length > 0;
    });
  }

}
