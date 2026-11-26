import { Pipe, PipeTransform } from '@angular/core';

import { Translation, TranslationExtras } from './notifications.interface';

@Pipe({
  name: 'translate',
  standalone: false,
  pure: true
})
export class NgxNotificationsTranslatePipe implements PipeTransform {
  transform(value: string | Translation | null | undefined): string | null {
    if (!value) {
      return null;
    }
    if (typeof value === 'string') {
      return value;
    }
    return this.interpolate(value.token, value.data);
  }

  private interpolate(sentence: string, data: TranslationExtras): string {
    const matches = sentence.match(/\$\{(.*?)\}/g) ?? [];
    let result = sentence;
    for (const match of matches) {
      const key = match.replace(/[${} ]/g, '');
      const words = key.split('|');
      if (words.length <= 0 || words.length > 2) {
        continue;
      }
      const token = words[0] ?? '';
      let word = token;
      const replacement = data[token];
      if (replacement) {
        word = replacement;
      }
      if (words.length === 2) {
        const actions = (words[1] ?? '').split(',');
        for (const action of actions) {
          if (action === 'lowercase') {
            word = word.toLowerCase();
          } else if (action === 'uppercase') {
            word = word.toUpperCase();
          } else if (action === 'ucfirst') {
            const character = word.charAt(0).toUpperCase();
            word = character + word.substring(1);
          }
        }
      }
      result = result.replace(match, word);
    }
    return result;
  }
}
