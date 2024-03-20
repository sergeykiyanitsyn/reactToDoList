import { useEffect, useState } from 'react'
import styles from './Task.module.css'
import PropTypes from 'prop-types'
import { onValue, ref, remove } from 'firebase/database'
import { db } from '../../firebase'

const isEmpty = ''

export const Tasks = ({
  updFlag,
  delFlag,
  setUpdFlag,
  setDelFlag,
  setIsDeliting,
  setUpdatingTaskForm,
  setUpadtingTaskId,
  isLoading,
  setIsLoading,
}) => {
  const [tasks, setTasks] = useState({})
  const [sortTasks, setSortTasks] = useState({})
  const [findTasks, setFindTasks] = useState({})
  const [sortFindTasks, setSortFindTasks] = useState({})

  const [textFinder, setTextFinder] = useState('')

  const [findFlag, setFindFlag] = useState(false) // Нажат ли поиск
  const [sortOn, setSortOn] = useState(false) // Кнопка вкл/выкл

  const onClickSort = () => {
    setSortOn(!sortOn)
  }

  const findAllTasks = (event) => {
    event.preventDefault()
    setFindFlag(true)
    let allFindTasks = []
    let allSortFindTask = []
    Object.entries(tasks).map(([id, { title, description }]) => {
      // решить вопрос с маленьким регистром
      const index = description.search(textFinder)
      if (index !== -1) {
        const finderTasks = { id, title, description }
        allFindTasks.push(finderTasks)
      }
    })
    sortTasks.map(([id, { title, description }]) => {
      // решить вопрос с маленьким регистром
      const index = description.search(textFinder)
      if (index !== -1) {
        const finderTasks = { id, title, description }
        allSortFindTask.push(finderTasks)
      }
    })

    setFindTasks(allFindTasks)
    setSortFindTasks(allSortFindTask)
  }

  const onChangeFinder = ({ target }) => {
    setTextFinder(target.value)
    if (target.value === isEmpty) {
      setFindFlag(false)
    }
  }

  const showClick = (id) => {
    if (updFlag) {
      setUpadtingTaskId(id)
      setUpdatingTaskForm(true)
      setUpdFlag(false)
    }
    //удалить
    if (delFlag) {
      setIsLoading(false)
      const tasksDelDbRef = ref(db, `tasks/${id}`)

      remove(tasksDelDbRef).finally(() => {
        setIsDeliting(false)
        setDelFlag(false)
      })
    }
  }

  useEffect(() => {
    const tasksDbRef = ref(db, 'tasks')

    return onValue(tasksDbRef, (snapshot) => {
      const loaderTasks = snapshot.val() || {}

      const newFutureSortTasks = Object.entries(loaderTasks).sort(([, a], [, b]) => {
        if (a.title < b.title) {
          return -1
        }
        if (a.title > b.title) {
          return 1
        }
        return 0
      })

      setTasks(loaderTasks)
      setSortTasks(newFutureSortTasks)
      setIsLoading(false)
    })
  }, [])

  return (
    <>
      <div className={styles.addFunctional}>
        <div className={styles.sorting}>
          <span>
            {' '}
            {'Сортировка по алфавиту '}
            <button className={styles.sortingButton} type="click" onClick={onClickSort}>
              {sortOn ? 'On' : 'Off'}
            </button>
          </span>{' '}
        </div>

        <form className={styles.search} onSubmit={findAllTasks}>
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
        ) : sortOn ? (
          findFlag ? (
            Object.entries(sortFindTasks).map(([id, { title, description }]) => {
              return (
                <div key={id} className={styles.note} onClick={() => showClick(id)}>
                  <div> {title} </div>
                  <div> {description} </div>
                </div>
              )
            })
          ) : (
            sortTasks.map(([id, { title, description }]) => {
              return (
                <div key={id} className={styles.note} onClick={() => showClick(id)}>
                  <div> {title} </div>
                  <div> {description} </div>
                </div>
              )
            })
          )
        ) : findFlag ? (
          Object.entries(findTasks).map(([id, { title, description }]) => {
            return (
              <div key={id} className={styles.note} onClick={() => showClick(id)}>
                <div> {title} </div>
                <div> {description} </div>
              </div>
            )
          })
        ) : (
          Object.entries(tasks).map(([id, { title, description }]) => {
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
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.any,
}
