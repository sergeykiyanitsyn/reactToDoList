import { useEffect, useState } from 'react'
import styles from './Task.module.css'

export const Tasks = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setIsLoading(true)

    fetch('http://localhost:3005/tasks')
      .then((loadedData) => loadedData.json())
      .then((loadedProducts) => {
        setTasks(loadedProducts)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        tasks.map(({ id, title, description }) => {
          return (
            <div key={id} className={styles.note}>
              <div> {title} </div>
              <div> {description} </div>
            </div>
          )
        })
      )}
    </>
  )
}

//  <img src="pin" alt="pin" />
//       <span> Название задачи </span>
//       <div> Описание задачи </div>
