import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pressure',
  standalone: true,
})
export class PressurePipe implements PipeTransform {

  transform(value: number): number {
    return value ? value * 0.75 : 0;
  }

}
