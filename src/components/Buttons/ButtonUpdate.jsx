import styles from './Button.module.css'
import PropTypes from 'prop-types'

export const ButtonUpdate = ({
  setAddFlag,
  setUpdFlag,
  setDelFlag,
  isUpdating,
  setUpdatingTaskForm,
}) => {
  const updateTask = () => {
    setAddFlag(false)
    setUpdFlag(true)
    setDelFlag(false)
    setUpdatingTaskForm(false)
  }

  return (
    <button disabled={isUpdating} onClick={updateTask} className={styles.button}>
      Изменить
    </button>
  )
}

ButtonUpdate.propTypes = {
  isUpdating: PropTypes.bool,
  setAddFlag: PropTypes.any,
  setUpdFlag: PropTypes.any,
  setDelFlag: PropTypes.any,
  setUpdatingTaskForm: PropTypes.any,
}
