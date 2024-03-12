import { useEffect, useState } from 'react'
import styles from './Task.module.css'

export const Task = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((loadedData) => loadedData.json())
      .then((loadedProducts) => {
        setTasks(loadedProducts)
      })
  }, [])

  return (
    <>
      {tasks.map(({ id, title }) => {
        return (
          <div key={id} className={styles.note}>
            <div> {title} </div>
            <div> Описание задачи </div>
          </div>
        )
      })}
    </>
  )
}

//  <img src="pin" alt="pin" />
//       <span> Название задачи </span>
//       <div> Описание задачи </div>
