---
title: Install
---

# 安装

## 环境支持

由于是对`element-plus`的二次封装，同时基于`vue3`，因此不支持ie11

| ![IE](https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png) | ![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png) | ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) | ![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png) |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Edge ≥ 79                                                              | Firefox ≥ 78                                                                      | Chrome ≥ 64                                                                    | Safari ≥ 12                                                                    |

## 本地安装

```bash
git clone https://github.com/SepVeneto/vue-tools-ts.git

pnpm i

pnpm build:comps

# 或者通过npm link建立软连接
```

## 使用包管理器安装

由于没有发布到npm上，对于有私有仓库的，可以fork到本地打包上传

```bash
# npm
npm install basic-components --registry {仓库地址}

#yarn
yarn add basic-components --registry {仓库地址}

#pnpm
pnpm install basic-components --registry {仓库地址}
```
