import path from 'path'
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import { parse } from '@vue/compiler-sfc'
import { highlight } from './highlight'
// import { highlight } from 'vitepress/dist/node/markdown/plugins/highlight'

const localMd = MarkdownIt()
const docRoot = path.resolve(__dirname, '../../')
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/

export const mdPlugin = (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    render(tokens, idx) {
      const data = (md as any).__data

      const hoistedTags: string[] = data.hoistedTags || (data.hoistedTags = [])

      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2];
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          const filePath = path.resolve(docRoot, 'examples', `${sourceFile}.vue`);
          source = fs.readFileSync(filePath, 'utf-8')
          const existingScriptIndex = ~hoistedTags.findIndex((tag) => {
            return scriptSetupRE.test(tag)
          })
          if (!existingScriptIndex) {
              hoistedTags.push(`
                <script setup>
                const demos = import.meta.globEager('../examples/${
                  sourceFile.split('/')[0]
                }/*.vue')
                </script>
              `)
          }
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

        const { html, js, css, cssPreProcessor, jsPreProcessor } = generateCodePenSnippet(source);
        return `<Demo :demos="demos" source="${encodeURIComponent(
          highlight(source, 'vue')
        )}" path="${sourceFile}" html="${html}" js="${js}" css="${css}" css-pre-processor="${cssPreProcessor}" js-pre-processor="${jsPreProcessor}" raw-source="${encodeURIComponent(
          source
        )}" description="${encodeURIComponent(localMd.render(description))}">`
      } else {
        return '</Demo>'
      }
    }
  })
}

function generateCodePenSnippet(source: string) {
  const { template, script, styles } = parse(source).descriptor
  const css = styles.pop()
  return {
    html: encodeURIComponent(template?.content ?? ''),
    js: encodeURIComponent((script || { content: '' }).content),
    css: encodeURIComponent(css?.content ?? ''),
    cssPreProcessor: css?.lang ?? 'none',
    jsPreProcessor: script?.lang || 'none',
  }
}