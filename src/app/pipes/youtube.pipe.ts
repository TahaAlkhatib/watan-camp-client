import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'youtube'
})
export class YoutubePipe implements PipeTransform {
  
  constructor(public sanitizer: DomSanitizer) {

  }
  transform(value: string, ...args: unknown[]) {
    // const vId = this.readQueryString('v',value)
    // const result = `https://www.youtube.com/embed/${vId}`
    const result = value.replace('watch?v=','embed/')
    return this.sanitizer.bypassSecurityTrustResourceUrl(result)
  }
   readQueryString(name:string, url:string) {
    const urlParams = new URLSearchParams(url);
    const param = urlParams.get(name);
    return param
 }
}
