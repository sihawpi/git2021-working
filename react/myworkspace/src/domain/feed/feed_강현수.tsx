import { useRef, useState } from "react";

interface FeedState {
  id: number;
  text: string | undefined;
  url: string | undefined;
  type: string;
  createTime: number;
  modifyTime?: number;
}

// 생성 날짜 + 시간
const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Feed = () => {
  const [feed, setFeed] = useState<FeedState[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const add = () => {
    if (fileRef.current?.files?.length) {
      const file = fileRef.current?.files[0];
      const reader = new FileReader();
      const inputContent = textRef.current?.value;
      const fileType = file.type;

      reader.readAsDataURL(file);

      reader.onload = () => {
        const baseCode = reader.result?.toString();

        const data: FeedState = {
          id: feed.length > 0 ? feed[0].id + 1 : 1,
          text: inputContent,
          url: baseCode,
          type: fileType,
          createTime: new Date().getTime(),
        };

        setFeed([data, ...feed]);
      };
      // input값 비우기
      formRef.current?.reset();
    }
  };
  const remove = (id: number) => {
    setFeed(feed.filter((item) => item.id !== id));
  };
  return (
    <div style={{ width: "40vw" }} className='mx-auto'>
      <form>
        <textarea
          className='form-control mb-1'
          placeholder='Leave a post here'
          ref={textRef}
        ></textarea>
        <div className='d-flex'>
          <input
            type='file'
            className='form-control me-1'
            accept='image/png, image/jpeg, video/mp4'
            aria-describedby='inputGroupFileAddon04'
            aria-label='Upload'
            ref={fileRef}
          />
          <button
            type='button'
            className='btn btn-primary text-nowrap'
            onClick={() => {
              add();
            }}
          >
            입력
          </button>
        </div>
      </form>
      {feed.map((item) =>
        item.type === "video/mp4" ? (
          <div key={item.id} className='card mt-1'>
            <div className='card-header'>Featured</div>
            <video controls>
              <source src={item.url} type='video/mp4'></source>
            </video>
            <p className='card-content'>{item.text}</p>
            <div className='card-body d-flex'>
              <span className='w-100'>
                {getTimeString(
                  item.modifyTime ? item.modifyTime : item.createTime
                )}
              </span>
              <a
                href='#!'
                onClick={(e) => {
                  e.preventDefault(); // 기본 동작 방지
                  remove(item.id);
                }}
                className='link-secondary fs-6 float-end content-nowrap'
              >
                삭제
              </a>
            </div>
          </div>
        ) : (
          <div key={item.id} className='card'>
            <div className='card-header'>Featured</div>
            <img src={item.url} className='card-img-top' alt='…' />
            <p className='card-content'>{item.text}</p>
            <div className='card-body d-flex'>
              <span className='w-100'>
                {getTimeString(
                  item.modifyTime ? item.modifyTime : item.createTime
                )}
              </span>
              <a
                onClick={() => {
                  remove(item.id);
                }}
                href='#!'
                className='link-secondary fs-6 float-end content-nowrap'
              >
                삭제
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Feed;
