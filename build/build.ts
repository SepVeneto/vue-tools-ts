/* eslint-disable */
import fs from 'fs'
import path from 'path'
import rollup, { OutputOptions } from 'rollup'
import vue from  '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import css from 'rollup-plugin-css-only'
import filesize, { FileSizeInfo, FileSizeOptions } from 'rollup-plugin-filesize'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import babel from '@rollup/plugin-babel'
import chalk from 'chalk'
import typescript from '@rollup/plugin-typescript'
import scss from 'rollup-plugin-scss'
import { execSync } from 'child_process'

const EP_PREFIX = 'element-plus'
const VUE_REGEX = 'vue'
const VUE_MONO = '@vue'
const indexRoot = path.resolve(__dirname, '..', 'packages', 'basic-components')
const compRoot = path.resolve(__dirname, '../', './packages', './components');
const outputDir = path.resolve(__dirname, '../', './dist');
const themeDir = path.resolve(__dirname, '..', 'packages', 'theme-chalk', 'dist');
const plugins = [
  scss({
    // output: 'bundle.css'
  }),
  // babel({ babelHelpers: 'bundled', extensions: ['.tsx'] }),
  // vue({
  //   target: 'browser',
  // }),
  vue(),
  vueJsx(),
  // typescript({
  //   noEmitOnError: true, // 运行时是否验证ts错误
  // }),
  nodeResolve(),
  esbuild(),
]

const pathsRewriter = (id: string) => {
  if (id.startsWith(`${EP_PREFIX}/components`))
    return id.replace(`${EP_PREFIX}/components`, '..')
  if (id.startsWith(EP_PREFIX) && ['icons'].every((e) => !id.endsWith(e)))
    return id.replace(EP_PREFIX, EP_PREFIX)
  if (id.startsWith('@basic-components')) {
    return id.replace('@basic-components', '.')
  }
  return id
}

async function reporter(opt: FileSizeOptions, outputOptions: OutputOptions, info: FileSizeInfo) {
  const values = [
    info.fileName ? [`${outputOptions.file?.split('packages/').pop()}`] : [],
    [`${info.bundleSize}`],
    ...(info.minSize
      ? [`${info.minSize}`]
      : []),
  ]
  return `${chalk.cyan(chalk.bold(values[0]))}: bundle size ${chalk.yellow(values[1])} => minified ${chalk.green(values[2])}`
}
async function getComponents() {
  const raw = await fs.promises.readdir(compRoot)
  return raw
    .filter(f => f !== 'package.json' && f !== 'index.ts')
    .map(f => ({ path: path.resolve(compRoot, f), name: f }))
}

async function buildComponents() {
  const componentPaths = await getComponents();
  const builds = componentPaths.map(
    async ({ path: p, name: componentName }) => {
      const entry = path.resolve(p, './index.ts')
      if (!fs.existsSync(entry)) {
        return
      }

      const external = (id) => {
        return (
          id.startsWith(VUE_REGEX) ||
          id.startsWith(VUE_MONO) ||
          id.startsWith(EP_PREFIX)
        )
      }

      // const external = (id: string) => {
      //   return(
      //   )
      // }
      const esm = {
        format: 'esm',
        file: `${outputDir}/es/components/${componentName}/index.js`,
        plugins: [
          filesize({
            reporter
          })
        ],
        paths: pathsRewriter
      }
      const cjs = {
        format: 'cjs',
        file: `${outputDir}/lib/components/${componentName}/index.js`,
        exports: 'named',
        plugins: [
          filesize({
            reporter
          })
        ],
        paths: pathsRewriter
      }
      const rollupConfig = {
        input: entry,
        plugins,
        external
      }
      const bundle = await rollup.rollup(rollupConfig)
      await bundle.write(esm as any)
      await bundle.write(cjs as any)
    }
  )
  try {
    await Promise.all(builds)
  } catch (e: any) {
    console.error(chalk.red(e.message))
    process.exit(1)
  }
}

async function buildEntry() {
  const entry = path.resolve(compRoot, 'index.ts')
  const config = {
    input: entry,
    plugins: [
      esbuild(),
    ],
    external: () => true,
  }
  try {
    const bundle = await rollup.rollup(config)
    await bundle.write({
      format: 'es',
      file: `${outputDir}/es/components/index.js`,
      plugins: [
        filesize({
          reporter
        })
      ]
    })

    await bundle.write({
      format: 'cjs',
      file: `${outputDir}/lib/components/index.js`,
      plugins: [
        filesize({
          reporter
        })
      ]
    })
  } catch (e: any) {
    console.error(chalk.red(e.message))
    process.exit(1)
  }
}

async function buildIndexEntry() {
  const entry = path.resolve(indexRoot, 'index.ts')
  const config = {
    input: entry,
    plugins: [
      esbuild(),
    ],
    external: (id: string) => {
      return (
        id.startsWith('@basic-components') ||
        id.startsWith(VUE_REGEX) ||
        id.startsWith(VUE_MONO) ||
        id.startsWith(EP_PREFIX)
      )
    },
  }
  try {
    const bundle = await rollup.rollup(config)
    await bundle.write({
      format: 'es',
      file: `${outputDir}/es/index.js`,
      plugins: [
        filesize({
          reporter
        })
      ],
      paths: pathsRewriter,
    })

    await bundle.write({
      format: 'cjs',
      file: `${outputDir}/lib/index.js`,
      plugins: [
        filesize({
          reporter
        })
      ],
      exports: 'named',
      paths: pathsRewriter,
    })
  } catch (e: any) {
    console.error(chalk.red(e.message))
    process.exit(1)
  }
}
async function copyFiles() {
  await fs.promises.cp(path.resolve(indexRoot, 'index.d.ts'), path.resolve(outputDir, 'lib', 'index.d.ts'));
  await fs.promises.cp(path.resolve(indexRoot, 'index.d.ts'), path.resolve(outputDir, 'es', 'index.d.ts'));
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(indexRoot, 'package.json'), 'utf-8'));
  packageJson.main = 'lib/index.js'
  packageJson.module = 'es/index.js'
  packageJson.types = 'lib/index.d.ts'
  await fs.promises.writeFile(path.resolve(outputDir, 'package.json'), JSON.stringify(packageJson, null, 2))
  // await fs.promises.cp(path.resolve(indexRoot, 'package.json'), path.resolve(outputDir, 'package.json'));
}

// function pathsRewriter(id: string) {
//   if()
// }

;(async () => {
  console.log('build components')
  await buildComponents()

  console.log('build entry')
  await buildEntry()

  console.log('build index')
  await buildIndexEntry()

  console.log('copy type/package')
  await copyFiles()

  console.log('copy style')
  execSync('npm run build:style')
  await copyStyle()

  console.log('pack')
  execSync('cd ./dist && npm pack --pack-destination ../')
})().then(() => {
  green('success')
  process.exit(0)
})

function red(str: string) {
  console.error(chalk.red(str))
}
function green(str: string) {
  console.log(chalk.green(str))
}


function logAndShutdown(e) {
  red(e.message)
  process.exit(1)
}

async function copyStyle() {
  await fs.promises.cp(path.resolve(indexRoot, 'index.d.ts'), path.resolve(outputDir, 'lib', 'index.d.ts'));
  const styleDir = path.join(outputDir, 'theme-chalk');
  fs.mkdirSync(styleDir, { recursive: true })
  await fs.promises.cp(path.join(themeDir, 'index.css'), path.join(outputDir, 'theme-chalk', 'index.css'))
}
