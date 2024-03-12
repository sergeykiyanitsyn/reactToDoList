import styles from './Button.module.css'
import PropTypes from 'prop-types'

export const Button = ({ action }) => {
  return <button className={styles.button}> {action} </button>
}

Button.propTypes = {
  action: PropTypes.string,
}
