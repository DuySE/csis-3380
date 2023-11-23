const Modal = ({ title, children, show, onToggle, onAdd }) => {
  const style = {
    display: show ? 'block' : 'none'
  };
  return (
    <div className='modal' style={style} tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
            <button type='button' className='btn btn-light' onClick={onToggle}>
              <span>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            {children}
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-light' onClick={onToggle}>
              Close
            </button>
            <button type='button' className='btn btn-warning' onClick={() => onAdd()}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Modal;