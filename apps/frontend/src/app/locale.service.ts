import { Injectable } from '@angular/core';
import '@angular/common/locales/global/de';
import '@angular/common/locales/global/de-CH';

// FIXME: find a solution to dynamically load locale data

const SUPPORTED_LOCALES = ['de-CH', 'de-DE'];

const findBestLocale = () => {
  const browserLocale = navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : /* istanbul ignore next */ navigator.language;

  return SUPPORTED_LOCALES.indexOf(browserLocale) >= 0 ? /* istanbul ignore next */ browserLocale : 'en-US';
};

const userLocale = findBestLocale();

@Injectable({
  providedIn: 'root',
})
class LocaleService {
  static locale() {
    return userLocale;
  }
}

export default LocaleService;
