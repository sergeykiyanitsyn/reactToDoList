import { Tasks } from './components/Task'
import { ButtonAdd, ButtonUpdate, ButtonDelete } from './components/Buttons'
import { Form } from './components/Form'
import { Message } from './components/Message'
import styles from './App.module.css'
import { useState } from 'react'

const App = () => {
  const [refreshTasksFlag, setRefreshTasksFlag] = useState(false)
  // Показ сообщения
  const [addFlag, setAddFlag] = useState(false)
  const [updFlag, setUpdFlag] = useState(false)
  const [delFlag, setDelFlag] = useState(false)
  //Блокируют кнопки
  const [isCreating, setIsCreating] = useState(false)
  const [isDeliting, setIsDeliting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  // Обновляет задачи
  const refreshTasks = () => setRefreshTasksFlag(!refreshTasksFlag)
  // Вывод формы и получение ID
  const [updatingTaskForm, setUpdatingTaskForm] = useState(false)
  const [updatingTaskId, setUpadtingTaskId] = useState(null)

  return (
    <div className={styles.wrapper}>
      <div className={styles.taskHeaders}> Лист задач </div>
      <div className={styles.flexButtons}>
        <ButtonAdd
          setAddFlag={setAddFlag}
          setUpdFlag={setUpdFlag}
          setDelFlag={setDelFlag}
          isCreating={isCreating}
        ></ButtonAdd>
        <ButtonUpdate
          setAddFlag={setAddFlag}
          setUpdFlag={setUpdFlag}
          setDelFlag={setDelFlag}
          isUpdating={isUpdating}
          setUpdatingTaskForm={setUpdatingTaskForm}
        ></ButtonUpdate>
        <ButtonDelete
          setAddFlag={setAddFlag}
          setUpdFlag={setUpdFlag}
          setDelFlag={setDelFlag}
          isDeliting={isDeliting}
          setUpdatingTaskForm={setUpdatingTaskForm}
        ></ButtonDelete>
      </div>
      {(addFlag || updatingTaskForm) && (
        <Form
          addFlag={addFlag}
          setAddFlag={setAddFlag}
          updatingTaskForm={updatingTaskForm}
          setUpdatingTaskForm={setUpdatingTaskForm}
          setIsCreating={setIsCreating}
          setIsUpdating={setIsUpdating}
          refreshTasks={refreshTasks}
          updatingTaskId={updatingTaskId}
        ></Form>
      )}
      <Message updFlag={updFlag} delFlag={delFlag}></Message>
      <Tasks
        refreshTasks={refreshTasks}
        refreshTasksFlag={refreshTasksFlag}
        updFlag={updFlag}
        delFlag={delFlag}
        setUpdFlag={setUpdFlag}
        setDelFlag={setDelFlag}
        setIsDeliting={setIsDeliting}
        setUpdatingTaskForm={setUpdatingTaskForm}
        setUpadtingTaskId={setUpadtingTaskId}
      ></Tasks>
    </div>
  )
}

export default App
