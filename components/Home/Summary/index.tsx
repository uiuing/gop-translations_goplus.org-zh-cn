import React from 'react'

import { useMobile } from 'hooks'
import SummaryCollapse from './Collapse'
import SummaryTabs from './Tabs'
import styles from './style.module.scss'

export default function Summary() {

  const isMobile = useMobile()

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>为何是 Go+</h2>
      {isMobile ? <SummaryCollapse /> : <SummaryTabs />}
    </div>
  )
}
