import PropTypes from 'prop-types'

export const Message = ({ updFlag, delFlag }) => {
  return (
    <>
      {updFlag && <div> Выберите задачу для обновления</div>}
      {delFlag && <div> Выберите задачу для удаления</div>}
    </>
  )
}

Message.propTypes = {
  updFlag: PropTypes.bool,
  delFlag: PropTypes.bool,
}
