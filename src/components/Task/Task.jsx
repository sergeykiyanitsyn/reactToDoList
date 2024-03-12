import { useState } from 'react'
import styles from './Task.module.css'

export const Task = () => {
  const [isClick, setIsClick] = useState(true)
  return (
    <div className={styles.note}>
      <img src="pin" alt="pin" />
      <span> Название задачи </span>
      {isClick && <div> Описание задачи </div>}
    </div>
  )
}
