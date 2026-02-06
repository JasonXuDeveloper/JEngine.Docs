import { defineI18n, type I18nConfig } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'zh'],
});

// I18n config for the source loader (dot parser)
export const i18nSourceConfig: I18nConfig = {
  defaultLanguage: 'en',
  languages: ['en', 'zh'],
};

export const locales = [
  { locale: 'en', name: 'English' },
  { locale: 'zh', name: '中文' },
];

export type Locale = (typeof locales)[number]['locale'];
