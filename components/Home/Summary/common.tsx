import React, { ReactNode } from 'react'

export interface SummaryItem {
  title: string
  content: ReactNode
}

export const summaryItems: SummaryItem[] = [
  {
    title: '用于 工程',
    content: ( // TODO: from markdown file
      <ul>
        <li>
          将支持所有Go功能（包括部分支持 <code>cgo</code>）。
        </li>
        <li>Go+ 提供更简单、更优雅的语法，比Go更接近自然语言。</li>
        <li>Go+ 很容易学习，你不必在一开始就处理复杂的工程问题。</li>
        <li>Go+ 为每一行代码赋能，你可以用更少的代码完成更多的工作。</li>
      </ul>
    )
  },
  {
    title: '用于 STEM 教育',
    content: (
      <>
        <h5>与Scratch相比：</h5>
        <ul>
          <li>
            Scratch 只为编程教学而设计。这种通过图形化积木块编程的方式，
            显而易见，与实际工程经验并不一致。
          </li>
          <li>
            参考{' '}
            <a href="https://www.codemonkey.com/" target="_blank" rel="noreferrer">
              Code Monkey
            </a> 的经验，
            Go+ 直接使用代码进行编程教学，
            学习难度低（不比基于块的编程高）并有一个平稳的学习曲线。
          </li>
          <li>
            Go+ 创新地实现了工程与教学的结合。你学习的语言正是工作中会使用的语言。
            通过创造更有成效的程序，在学习过程中将获得更大的学习成就感。
          </li>
        </ul>
        <p>你可以在Go+学习网站上找到更多细节（即将推出）。</p>
      </>
    )
  },
  {
    title: '用于 数据科学',
    content: (
      <>
        <p>
          Go+ 提供了更强大的数学表达能力，如{' '}
          <a href="#rational-number">有理数表达式</a>，简化了数据科学用途的编程。
        </p>
        <p>Go+ 支持字节码后台和Go代码生成。</p>
        <h5>与Python相比，Go+提供了：</h5>
        <ul>
          <li>更好的性能。</li>
          <li>更接近自然语言的语法。</li>
          <li>与 Python 生态系统的兼容性（在未来）。</li>
          <li>数据科学与工程所使用的语言相同。</li>
        </ul>
      </>
    )
  }
]
