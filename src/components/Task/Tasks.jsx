import { useEffect, useState } from 'react'
import styles from './Task.module.css'
import PropTypes from 'prop-types'
import { onValue, ref, value } from 'firebase/database'
import { db } from '../../firebase'

const isEmpty = ''

export const Tasks = ({
  refreshTasksFlag,
  updFlag,
  delFlag,
  setUpdFlag,
  setDelFlag,
  setIsDeliting,
  refreshTasks,
  setUpdatingTaskForm,
  setUpadtingTaskId,
}) => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [textFinder, setTextFinder] = useState('')
  const [sortOn, setSortOn] = useState(false)
  const [isSorting, setIsSorting] = useState(false)

  const onClickSort = () => {
    setIsSorting(true)
    setSortOn(!sortOn)
  }

  const getServerTasks = () => {
    setIsLoading(true)

    return fetch('http://localhost:3005/tasks')
      .then((loadedData) => loadedData.json())
      .then((loadedProducts) => {
        setTasks(loadedProducts)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const findTasks = (event) => {
    event.preventDefault()
    let allFindTasks = []
    getServerTasks().then(() => {
      tasks.map(({ id, title, description }) => {
        // решить вопрос с маленьким регистром
        const index = description.search(textFinder)
        if (index !== -1) {
          const finderTasks = { id, title, description }
          allFindTasks.push(finderTasks)
        }
      })
      setTasks(allFindTasks)
    })
  }

  const onChangeFinder = ({ target }) => {
    setTextFinder(target.value)
    if (target.value === isEmpty) {
      refreshTasks()
    }
  }

  const showClick = (id) => {
    if (updFlag) {
      setUpadtingTaskId(id)
      setUpdatingTaskForm(true)
      setUpdFlag(false)
    }
    if (delFlag) {
      fetch(`http://localhost:3005/tasks/${id}`, {
        method: 'DELETE',
      })
        .then(() => refreshTasks())
        .finally(() => {
          setIsDeliting(false)
          setDelFlag(false)
        })
    }
  }

  useEffect(() => {
    const tasksDbRef = ref(db, 'tasks')

    return onValue(tasksDbRef, (snapshot) => {
      const loaderProducts = snapshot.val()

      setTasks(loaderProducts)
      setIsLoading(false)
    })

    // if (sortOn === true) {
    //   setIsLoading(true)

    //   fetch('http://localhost:3005/tasks')
    //     .then((loadedData) => loadedData.json())
    //     .then((loadedProducts) => {
    //       const sortTasks = loadedProducts.sort((a, b) => {
    //         if (a.title < b.title) {
    //           return -1
    //         }
    //         if (a.title > b.title) {
    //           return 1
    //         }
    //         return 0
    //       })
    //       setTasks(sortTasks)
    //     })
    //     .finally(() => {
    //       setIsLoading(false)
    //       setIsSorting(false)
    //     })
    // } else {
    //   getServerTasks().then(() => setIsSorting(false))
    // }
  }, [])

  return (
    <>
      <div className={styles.addFunctional}>
        <div className={styles.sorting}>
          <label htmlFor="sort">
            {' '}
            Сортировка по алфавиту{' '}
            <button
              className={styles.sortingButton}
              disabled={isSorting}
              id="sort"
              type="click"
              onClick={onClickSort}
            >
              {sortOn ? 'On' : 'Off'}
            </button>
          </label>{' '}
        </div>

        <form className={styles.search} onSubmit={findTasks}>
          <input
            className={styles.searchString}
            type="text"
            placeholder="Поиск задачи по описанию"
            onChange={onChangeFinder}
          />

          <button className={styles.searcbtn} type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
      <div className={styles.flexDiv}>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          tasks.map(({ id, title, description }) => {
            return (
              <div key={id} className={styles.note} onClick={() => showClick(id)}>
                <div> {title} </div>
                <div> {description} </div>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}

Tasks.propTypes = {
  refreshTasksFlag: PropTypes.bool,
  refreshTasks: PropTypes.func,
  updFlag: PropTypes.bool,
  delFlag: PropTypes.bool,
  setUpdFlag: PropTypes.any,
  setDelFlag: PropTypes.any,
  setIsDeliting: PropTypes.any,
  setUpdatingTaskForm: PropTypes.any,
  setUpadtingTaskId: PropTypes.any,
}
