import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarButton } from '../SidebarButton/SidebarButton';

const MENU_ITEMS = [
  { path: '/mypage', label: '프로필' },
  { path: '/mypage/password', label: '비밀번호 변경' },
  { path: '/mypage/quiz', label: '쪽지시험' },
] as const;

export function MypageSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col gap-2 w-50 shrink-0">
      {MENU_ITEMS.map((item) => (
        <SidebarButton
          key={item.path}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </SidebarButton>
      ))}
    </aside>
  );
}
