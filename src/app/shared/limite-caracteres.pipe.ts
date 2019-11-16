import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limiteCaracteres'
})
export class LimiteCaracteresPipe implements PipeTransform {

  transform(value: string, maximoCaracteres: number): string {
    if (value.length > maximoCaracteres) {
      return `${value.slice(0, maximoCaracteres)}...`;
    } else {
      return value;
    }
  }
  
}
