import { useSearchParams } from 'react-router-dom';

const LIMIT_PAGE = 10;

const PagiNation = ({ data }) => {
  const [params, setParams] = useSearchParams();

  const onClickPage = (page) => {
    setParams({
      page,
    });
  };

  const isPrevPageVisible = data?.startPage !== 1;
  const isNextPageVisible =
    Math.ceil(data?.currentPage / LIMIT_PAGE) !==
    Math.ceil(data?.totalPage / LIMIT_PAGE);

  return (
    <div>
      {isPrevPageVisible && (
        <button onClick={() => setParams({ page: data.startPage - 1 })}>
          이전
        </button>
      )}
      {data &&
        Array(data.endPage - data.startPage + 1)
          .fill()
          .map((_, i) => data.startPage + i)
          .map((page) => (
            <button key={page} onClick={() => onClickPage(page)}>
              {page}
            </button>
          ))}
      {isNextPageVisible && (
        <button onClick={() => setParams({ page: data.endPage + 1 })}>
          다음
        </button>
      )}
    </div>
  );
};
export default PagiNation;
