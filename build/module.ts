import path from 'path'
import glob from 'fast-glob'
import { rollup, RollupBuild } from 'rollup'
import { Alias } from './plugins/alias'
import css from 'rollup-plugin-css-only'
import vue from  '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild from 'rollup-plugin-esbuild'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import filesize, { FileSizeInfo, FileSizeOptions } from 'rollup-plugin-filesize'
import chalk from 'chalk'
import type { ModuleFormat, OutputOptions } from 'rollup'

const pkgRoot = path.resolve(__dirname, '../packages')
const indexRoot = path.resolve(pkgRoot, 'basic-components')

const outputDir = path.resolve(__dirname, '../dist');
const indexOutput = path.resolve(outputDir)

type Module = 'esm' | 'cjs'
interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    /** e.g: `es` */
    name: string
    /** e.g: `dist/element-plus/es` */
    path: string
  }

  bundle: {
    /** e.g: `element-plus/es` */
    path: string
  }
}
const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(indexOutput, 'es')
    },
    bundle: {
      path: 'basic-components/es',
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(indexOutput, 'lib'),
    },
    bundle: {
      path: 'basic-components/lib'
    },
  },
}

function excludeFiles(files: string[]) {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter(path => !excludes.some(exclude => path.includes(exclude)))
}

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      await Alias(),
      css(),
      vue(),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
      }),
      filesize({ reporter })
    ],
    external: await generateExternal(),
    treeshake: false
  })
  await writeBundles(bundle,
    Object.entries(buildConfig).map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: indexRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    })
  )
}

function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map(option => bundle.write(option)))
}

async function generateExternal() {
  const packages = ['vue', 'element-plus', '@element-plus/icons-vue']
  return (id: string) => {
    return packages.some(pkg => id === pkg || id.startsWith(`${pkg}/`))
  }
}

async function reporter(opt: FileSizeOptions, outputOptions: OutputOptions, info: FileSizeInfo) {
  return `${chalk.cyan(chalk.bold(info.fileName))}: bundle size ${chalk.yellow(info.bundleSize)} => minified ${chalk.green(info.minSize)}`
}