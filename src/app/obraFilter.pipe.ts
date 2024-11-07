import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obraFilter'
})
export class ObraFilterPipe implements PipeTransform {

  transform(value: any[], args: String): any {
    if (!value || !args.trim()) {
      return value;
  }
   return value.filter(item => item.specifications.indexOf(args.trim()) !== -1);
}

}
