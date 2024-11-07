import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indiceFilter'
})
export class IndiceFilterPipePipe implements PipeTransform {

  transform(value: any[], args: String): any {
    if (!value || !args) {
      return value;
    }
    return value.filter(item => item.obra.specifications.indexOf(args) !== -1);
  }

}
