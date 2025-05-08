import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateFormat', standalone: false })
export class DateFormatPipe implements PipeTransform {
  transform(value: number): string {
    return new Date(value).toLocaleString();
  }
}
