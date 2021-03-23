import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import { bus } from "@/api/api";

const SUPPORTED_LOCALES = {
  en: "English",
  de: "Deutsch (German)"
}
export function getSupportedLocales() {
  const annotatedLocales = []

  for (const code of Object.keys(SUPPORTED_LOCALES)) {
    annotatedLocales.push({
      code,
      name: SUPPORTED_LOCALES[code]
    })
  }
  return annotatedLocales
}

export function isLocaleSupported(locale) {
  return Object.keys(SUPPORTED_LOCALES).includes(locale)
}

export function setI18nLanguage(i18n: any, locale: any) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */

  document.querySelector('html').setAttribute('lang', locale);
}
export function setDocumentLang(lang) {
  document.documentElement.lang = lang
}

export function setDocumentTitle(newTitle) {
  document.title = newTitle
}
export default function getBrowserLocale(options = {}) {
  const defaultOptions = { countryCodeOnly: false }

  const opt = { ...defaultOptions, ...options }

  const navigatorLocale =
    navigator.languages !== undefined
      ? navigator.languages[0]
      : navigator.language

  if (!navigatorLocale) {
    return undefined
  }

  const trimmedLocale = opt.countryCodeOnly
    ? navigatorLocale.trim().split(/-|_/)[0]
    : navigatorLocale.trim()

  return trimmedLocale
}

export async function loadLocaleMessages(i18n: any, locale: any) {
  // load locale messages with dynami import
  const messages = await import(/* webpackChunkName: "locale-[request]" */ `@/locales/${locale}.json`)
    i18n.global.setLocaleMessage(locale, messages.default)

  //  loadedLanguages.push(locale)

    i18n.global.locale.value = locale

  //  EventBus.$emit("i18n-load-complete")
    return Promise.resolve(locale)
 // })
  // set locale and locale message
  //i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}
export function setupI18n(options) {
  const i18n = createI18n(options)
  //setI18nLanguage(i18n, options.locale)
  bus.on('localeChange', e => {
    loadLocaleMessages(i18n, e)
    //setI18nLanguage(i18n, e)
    console.log(e)
  }) 
  loadLocaleMessages(i18n, 'en')
  return i18n
}