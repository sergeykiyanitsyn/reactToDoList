import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Form.module.css'
import { db } from '../../firebase'
import { ref, push, set } from 'firebase/database'

export const Form = ({
  addFlag,
  updatingTaskId,
  updatingTaskForm,
  setIsUpdating,
  setUpdatingTaskForm,
  setAddFlag,
  setIsCreating,
}) => {
  const [title, setValueTitle] = useState('')
  const [description, setValueDescription] = useState('')

  const tasksDbRef = ref(db, 'tasks')

  const onChangeTitle = ({ target }) => {
    setValueTitle(target.value)
  }

  const onChangeDescription = ({ target }) => {
    setValueDescription(target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (addFlag) {
      push(tasksDbRef, { title: `${title}`, description: `${description}` })

      setAddFlag(false)
      setIsCreating(false)
    }

    //изменить
    if (updatingTaskForm) {
      const updateDbTaskRef = ref(db, `tasks/${updatingTaskId}`)

      set(updateDbTaskRef, {
        title: `${title}`,
        description: `${description}`,
      }).finally(() => {
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
