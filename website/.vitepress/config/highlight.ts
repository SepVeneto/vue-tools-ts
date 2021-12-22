import prism from 'prismjs'
import { escapeHtml } from 'markdown-it/lib/common/utils'

function wrap(code: string, lang: string) {
  if (lang === 'text') {
    code = escapeHtml(code);
  }
  return `<pre v-pre><code>${code}</code></pre>`
}

export const highlight = (str: string, lang: string) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase();
  const rawLang = lang;
  switch(lang) {
    case 'vue':
    case 'html':
      lang = 'markup';
      break;
    case 'md':
      lang = 'markdown';
      break;
    case 'ts': {
      lang = 'ts';
      break;
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang);
  }
  return wrap(str, 'text');
}