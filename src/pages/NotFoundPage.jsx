import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4 gap-3">
    <p className="text-[15px] font-bold text-zinc-900">페이지를 찾을 수 없습니다</p>
    <p className="text-[13px] text-zinc-500">요청하신 주소가 존재하지 않아요.</p>
    <Link
      to="/"
      className="mt-2 px-5 py-[10px] rounded-xl text-[13px] font-semibold bg-zinc-900 text-white"
    >
      홈으로 돌아가기
    </Link>
  </div>
)

export default NotFoundPage
