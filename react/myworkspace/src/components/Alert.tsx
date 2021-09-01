// import "bootstrap/dicst/js/bootstrap.min";

interface AlertProp {
  message: string;
  variant: string;
  // 속성함수
  onClose?: () => void;
}
// import된 파일에서 매개변수에 입력한 값을 받아서 각각 return값에 적용함
const Alert = ({ message, variant, onClose }: AlertProp) => {
  return (
    <div
      //                   danger -> variant
      className={`alert alert-${variant} alert-dismissible my-2`}
      role='alert'
    >
      {/* 입력값을 입력해주세요. */}
      {message}
      <button
        type='button'
        className='btn-close'
        data-bs-dismiss='alert'
        aria-label='Close'
        // 클릭하면 부모컴포넌트에서 받은 onClose함수 함수 실행
        // () => { setIsError(false); }
        onClick={onClose} // 콜백함수
      ></button>
    </div>
  );
};

export default Alert;
