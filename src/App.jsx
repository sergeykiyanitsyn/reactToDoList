import { Tasks } from './components/Task'
import { Button } from './components/Buttons'
import styles from './App.module.css'

const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.taskHeaders}> Лист задач</div>
      <div className={styles.flexButtons}>
        <Button action="Добавить"></Button>
        <Button action="Изменить"> </Button>
        <Button action="Удалить"></Button>
      </div>
      <div className={styles.flexDiv}>
        <Tasks></Tasks>
      </div>
    </div>
  )
}

export default App
