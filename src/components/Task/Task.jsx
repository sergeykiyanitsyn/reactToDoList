import { useState } from 'react'

export const Task = () => {
  const [isClick, setIsClick] = useState(true)
  return (
    <div>
      <img src="pin" alt="pin" />
      <span> Название задачи </span>
      {isClick && <div> Описание задачи </div>}
    </div>
  )
}
