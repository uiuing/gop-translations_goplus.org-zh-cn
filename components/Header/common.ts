import { ReactNode } from 'react'

export interface NavItemInfo {
  children: ReactNode
  href: string
  isBlank: boolean
}

export const navItems: NavItemInfo[] = [
  {
    children: '概述',
    href: 'https://cn.goplus.uiuing.com',
    isBlank: false
  },
  {
    children: '教程',
    href: 'https://tutorial-cn.goplus.uiuing.com',
    isBlank: false
  },
  {
    children: 'Playground',
    href: 'https://play.goplus.org',
    isBlank: true
  },
  {
    children: '参与贡献',
    href: 'https://github.com/goplus/gop#contributing',
    isBlank: true
  },
  {
    children: 'IDE 扩展',
    href: 'https://github.com/goplus/gop#ide-plugins',
    isBlank: true
  }
]
