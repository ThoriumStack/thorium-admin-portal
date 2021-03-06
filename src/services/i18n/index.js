import _ from 'lodash'
import i18next from 'i18next'
import * as moment from 'moment'

import { locales } from '../../config/i18n'
import { formatDate, formatPrice } from './util'

export const setUiLocale = (locale) => {
  if (!_.find(locales, supported => supported.code === locale)) {
    return Promise.reject(`Locale ${locale} is not supported.`)
  }

  return fetch(`/translations/${locale}.json`)
    .then(response => response.json())
    .then(loadedResources => (

      new Promise((resolve, reject) => {
        console.log(loadedResources)
        console.log(locale)
        i18next.init({
          lng: locale,
          fallbackLng: 'en',
          debug: true,
          resources: { [locale]: loadedResources },
          interpolation: {
            format(value, format, _locale) {
              if (value instanceof Date) {
                return formatDate(value, format, _locale)
              }

              if (_.startsWith(format, 'style:currency')) {
                return formatPrice(value, format, _locale)
              }

              return value
            },
          },
        }, (err) => {
          if (err) {
            reject(err)
            return
          }

          resolve()
        })
      })
    ))
    .catch(err => Promise.reject(err))
}

export const t = (key, opt) => i18next.t(key, opt)

export const currentLocale = () => i18next.language;




