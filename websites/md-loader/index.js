/* eslint-disable @typescript-eslint/no-var-requires */
const { stripScript, stripTemplate, genInlineComponentText } = require('./util');
const md = require('./config');

module.exports = function(source) {
  const content = md.render(source);

  const startTag = '<!--element-demo:'
  const startTaglen = startTag.length
  const endTag = ':element-demo-->'
  const endTagLen = endTag.length;

  let componentsString = ''
  let id = 0;
  let output = []
  let start = 0

  let commentStart = content.indexOf(startTag)
  let commentEnd = content.indexOf(endTag, commentStart + startTaglen)
  while(commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart))

    const commentContent = content.slice(commentStart + startTaglen, commentEnd)
    const html = stripTemplate(commentContent)
    const script = stripScript(commentContent)
    let demoComponentContent = genInlineComponentText(html, script)
    const demoComponentName = `element-demo${id}`
    output.push(`<template #source><${demoComponentName} /></template>`)
    componentsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`

    ++id;
    start = commentEnd + endTagLen
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTaglen)
  }

  let pageScript = ''
  if (componentsString) {
    pageScript = `<script lang="ts">
      import * as Vue from 'vue';
      export default {
        name: 'component-doc',
        components: {
          ${componentsString}
        }
      }
    </script>`
  } else if (content.indexOf('<script>') === 0) {
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start))
  const result = `
  <template>
    <section class="content element-doc">
      ${output.join('')}
      <right-nav />
    </section>
  </template>
  ${pageScript}
  `
  return result;
}