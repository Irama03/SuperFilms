import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  //отслеживать изменения во всем приложении
  //public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment())
  public someString: BehaviorSubject<string> = new BehaviorSubject<string>('aaa');

  /*changeMonth(dir: number) {
    const value = this.date.value.add(dir, 'month')
    this.date.next(value)
  }*/

  changeSomeString(dir: number) {
    const value = this.someString.value;
    this.someString.next(value + dir);
  }

  /*changeDate(date: moment.Moment) {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month()
    })
    this.date.next(value)
  }*/
}
