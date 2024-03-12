import { Task } from './components/Task'
import styles from './App.module.css'

const App = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.taskHeaders}> Лист задач</span>
      <div className={styles.flexDiv}>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
      </div>
    </div>
  )
}

export default App
