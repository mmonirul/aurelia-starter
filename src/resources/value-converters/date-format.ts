import moment from 'moment';
import 'moment/locale/sv';

export class DateFormatValueConverter {
  constructor() {

  }
  toView(value) {
    return moment(value).format('MMMM Do YYYY');
  }

  fromView(value) {

  }
}

