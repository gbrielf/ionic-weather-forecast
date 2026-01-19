  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({
    name: 'toSeconds',
    standalone: true,
  })
  export class ToSecondsPipe implements PipeTransform {

    transform(value: number): number {
      return value ? value * 1000 : 0;
    }

  }
