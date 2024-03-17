import styles from './Button.module.css'
import PropTypes from 'prop-types'

export const ButtonAdd = ({ isCreating, setAddFlag, setUpdFlag, setDelFlag }) => {
  const addTask = () => {
    setAddFlag(true)
    setUpdFlag(false)
    setDelFlag(false)
  }

  return (
    <button disabled={isCreating} onClick={addTask} className={styles.button}>
      Добавить
    </button>
  )
}

ButtonAdd.propTypes = {
  isCreating: PropTypes.bool,
  setAddFlag: PropTypes.any,
  setUpdFlag: PropTypes.any,
  setDelFlag: PropTypes.any,
}
