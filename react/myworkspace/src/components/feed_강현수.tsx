import { useRef, useState } from "react";

interface FeedState {
  id: number;
  content: string | undefined;
  url: string | undefined;
  type: string;
  createTime: number;
  modifyTime?: number;
}

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

        console.log(baseCode);

        const data: FeedState = {
          id: feed.length > 0 ? feed[0].id + 1 : 1,
          content: inputContent,
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
    <>
      <form>
        <textarea
          className='form-control mb-1'
          placeholder='Leave a post here'
          ref={textRef}
          style={{ boxSizing: "border-box" }}
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
            className='btn btn-primary content-nowrap'
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
          <div key={item.id} className='card'>
            <video controls>
              <source src={item.url} type='video/mp4'></source>
            </video>
            <p className='card-content'>{item.content}</p>
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
        ) : (
          <div key={item.id} className='card'>
            <img src={item.url} className='card-img-top' alt='…' />
            <p className='card-content'>{item.content}</p>
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
    </>
  );
};

export default Feed;
