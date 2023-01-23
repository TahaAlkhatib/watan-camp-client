import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'youtube'
})
export class YoutubePipe implements PipeTransform {
  
  constructor(public sanitizer: DomSanitizer) {

  }
  transform(value: string, ...args: unknown[]) {
    const result = value.replace('watch?v=','embed/')
    return this.sanitizer.bypassSecurityTrustResourceUrl(result)
  }

}
