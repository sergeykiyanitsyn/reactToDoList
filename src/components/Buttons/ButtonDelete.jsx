/* eslint-disable react/prop-types */
import styles from './Button.module.css'
import PropTypes from 'prop-types'

export const ButtonDelete = ({
  setAddFlag,
  setUpdFlag,
  setDelFlag,
  isDeliting,
  setUpdatingTaskForm,
}) => {
  const deleteTask = () => {
    setAddFlag(false)
    setUpdFlag(false)
    setDelFlag(true)
    setUpdatingTaskForm(false)
  }

  return (
    <button disabled={isDeliting} onClick={deleteTask} className={styles.button}>
      Удалить
    </button>
  )
}

ButtonDelete.propTypes = {
  refreshTasks: PropTypes.func,
  setDelFlag: PropTypes.any,
  setUpdatingTaskForm: PropTypes.any,
}
