import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Form.module.css'

export const Form = ({
  addFlag,
  updatingTaskId,
  updatingTaskForm,
  setIsUpdating,
  setUpdatingTaskForm,
  setAddFlag,
  setIsCreating,
  refreshTasks,
}) => {
  const [title, setValueTitle] = useState('')
  const [description, setValueDescription] = useState('')

  const onChangeTitle = ({ target }) => {
    setValueTitle(target.value)
  }

  const onChangeDescription = ({ target }) => {
    setValueDescription(target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (addFlag) {
      fetch('http://localhost:3005/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          title: `${title}`,
          description: `${description}`,
        }),
      })
        .then(() => refreshTasks())
        .finally(() => {
          setAddFlag(false)
          setIsCreating(false)
        })
    }

    if (updatingTaskForm) {
      fetch(`http://localhost:3005/tasks/${updatingTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          title: `${title}`,
          description: `${description}`,
        }),
      })
        .then(() => refreshTasks())
        .finally(() => {
          setIsUpdating(false)
          setUpdatingTaskForm(false)
        })
    }

    setValueTitle('')
    setValueDescription('')
  }

  return (
    <form className={styles.formNewTasks} onSubmit={onSubmit}>
      <input
        className={styles.formNewTasksName}
        type="text"
        placeholder="Введите название задачи"
        onChange={onChangeTitle}
      />
      <input
        className={styles.formNewTasksDesc}
        type="text"
        placeholder="Введите описание задачи"
        onChange={onChangeDescription}
      />
      <button className={styles.formNewTasksButton} type="submit">
        <i className="bi bi-cloud-download"></i>
      </button>
    </form>
  )
}

Form.propTypes = {
  addFlag: PropTypes.bool,
  updatingTaskId: PropTypes.string,
  updatingTaskForm: PropTypes.any,
  setIsUpdating: PropTypes.any,
  setUpdatingTaskForm: PropTypes.any,
  setAddFlag: PropTypes.any,
  setIsCreating: PropTypes.any,
  refreshTasks: PropTypes.any,
}
