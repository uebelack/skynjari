import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'timeago.js';

@Pipe({ name: 'timeago' })
class TimeagoPipe implements PipeTransform {
  transform(value: Date | undefined): String {
    return value ? format(value) : '';
  }
}

export default TimeagoPipe;
