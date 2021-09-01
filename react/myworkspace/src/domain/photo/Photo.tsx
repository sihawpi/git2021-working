import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Photo = () => {
  const photo = useSelector((state: RootState) => state.photo);

  return (
    <>
      <div>
        <div className='d-flex'></div>
      </div>
    </>
  );
};

export default Photo;
