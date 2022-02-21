import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  /*transform(m: moment.Moment, format: string = 'MMMM YYYY'): string {
    return m.format(format)
  }*/

  transform(a: string | null): string {
    return a + '!';
  }
}
