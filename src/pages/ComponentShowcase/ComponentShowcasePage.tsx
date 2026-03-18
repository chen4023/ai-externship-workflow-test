import { useState } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { Input } from "../../shared/ui/Input/Input";
import { PasswordInput } from "../../shared/ui/PasswordInput/PasswordInput";
import { Dropdown } from "../../shared/ui/Dropdown/Dropdown";
import { Pagination } from "../../shared/ui/Pagination/Pagination";
import { SearchInput } from "../../shared/ui/SearchInput/SearchInput";
import { Loading } from "../../shared/ui/Loading/Loading";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { NotFound } from "../../shared/ui/NotFound/NotFound";
import { Popup } from "../../shared/ui/Popup/Popup";
import { SidebarButton } from "../../shared/ui/SidebarButton/SidebarButton";
import { QuestionCard } from "../../shared/ui/QuestionCard/QuestionCard";
import { CommentInput } from "../../shared/ui/CommentInput/CommentInput";
import { CommentSubmitButton } from "../../shared/ui/CommentSubmitButton/CommentSubmitButton";
import { CategoryTab, CategoryTabBar } from "../../shared/ui/CategoryTab/CategoryTab";
import { ProfileImage } from "../../shared/ui/ProfileImage/ProfileImage";
import { SortModal } from "../../shared/ui/SortModal/SortModal";
import { ProfileDropdown } from "../../shared/ui/ProfileDropdown/ProfileDropdown";
import { Toast } from "../../shared/ui/Toast/Toast";
import { Modal, ConfirmModal } from "../../shared/ui/Modal/Modal";
import { QuestionInputModal } from "../../shared/ui/Modal/QuestionInputModal";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function ComponentShowcasePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownValue, setDropdownValue] = useState("");
  const [sortValue, setSortValue] = useState("latest");
  const [activeCategory, setActiveCategory] = useState("전체");
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [headerVariant, setHeaderVariant] = useState<"guest" | "unregistered" | "registered">("guest");
  const [notFoundVariant, setNotFoundVariant] = useState<"quiz" | "qna" | "community" | "404">("quiz");

  const dropdownOptions = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
  ];

  const sortOptions = [
    { label: "최신순", value: "latest" },
    { label: "인기순", value: "popular" },
    { label: "답변순", value: "answers" },
  ];

  const categories = ["전체", "프론트엔드", "백엔드", "DevOps", "디자인"];

  const sidebarItems = ["대시보드", "질문하기", "커뮤니티", "마이페이지", "설정"];

  const profileMenuItems = [
    { label: "마이페이지", onClick: () => alert("마이페이지") },
    { label: "설정", onClick: () => alert("설정") },
    { label: "로그아웃", onClick: () => alert("로그아웃"), danger: true },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Section title="Header">
        <SubSection label="variant 선택">
          {(["guest", "unregistered", "registered"] as const).map((v) => (
            <Button
              key={v}
              variant={headerVariant === v ? "primary" : "outline"}
              size="sm"
              onClick={() => setHeaderVariant(v)}
            >
              {v}
            </Button>
          ))}
        </SubSection>
        <Header
          variant={headerVariant}
          onLogin={() => alert("로그인")}
          onSignup={() => alert("회원가입")}
        />
      </Section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Button */}
        <Section title="Button">
          <SubSection label="variant: primary / ghost / outline / mypage">
            <Button variant="primary">Primary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="mypage">Mypage</Button>
          </SubSection>
          <SubSection label="size: lg / sm">
            <Button size="lg">Large</Button>
            <Button size="sm">Small</Button>
          </SubSection>
          <SubSection label="disabled">
            <Button disabled>Disabled</Button>
          </SubSection>
        </Section>

        {/* Input */}
        <Section title="Input">
          <SubSection label="state: default / focus / filled / check / danger / disabled">
            <Input state="default" placeholder="Default" />
            <Input state="check" placeholder="Check" />
            <Input state="danger" placeholder="Danger" dangerText="오류 메시지입니다" />
            <Input state="disabled" placeholder="Disabled" disabled />
          </SubSection>
        </Section>

        {/* PasswordInput */}
        <Section title="PasswordInput">
          <SubSection label="state: default / danger / success">
            <PasswordInput state="default" />
            <PasswordInput state="danger" helperText="비밀번호가 일치하지 않습니다" />
            <PasswordInput state="success" helperText="사용 가능한 비밀번호입니다" />
          </SubSection>
        </Section>

        {/* SearchInput */}
        <Section title="SearchInput">
          <SubSection label="기본">
            <SearchInput placeholder="질문 검색" className="w-96" />
          </SubSection>
        </Section>

        {/* CommentInput + CommentSubmitButton */}
        <Section title="CommentInput & CommentSubmitButton">
          <div className="flex gap-3 items-end w-full max-w-xl">
            <CommentInput className="flex-1" />
            <CommentSubmitButton />
          </div>
        </Section>

        {/* Dropdown */}
        <Section title="Dropdown">
          <SubSection label="기본 / disabled">
            <Dropdown
              options={dropdownOptions}
              value={dropdownValue}
              onChange={setDropdownValue}
              className="w-72"
            />
            <Dropdown options={dropdownOptions} disabled className="w-72" />
          </SubSection>
        </Section>

        {/* CategoryTab */}
        <Section title="CategoryTab">
          <CategoryTabBar>
            {categories.map((cat) => (
              <CategoryTab
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </CategoryTabBar>
        </Section>

        {/* SortModal */}
        <Section title="SortModal">
          <SortModal
            options={sortOptions}
            value={sortValue}
            onChange={setSortValue}
          />
        </Section>

        {/* ProfileImage */}
        <Section title="ProfileImage">
          <SubSection label="size: sm / md / lg">
            <ProfileImage size="sm" />
            <ProfileImage size="md" />
            <ProfileImage size="lg" />
          </SubSection>
        </Section>

        {/* ProfileDropdown */}
        <Section title="ProfileDropdown">
          <SubSection label="variant: registered / unregistered">
            <ProfileDropdown
              variant="registered"
              userName="홍길동"
              menuItems={profileMenuItems}
            />
            <ProfileDropdown
              variant="unregistered"
              menuItems={profileMenuItems}
            />
          </SubSection>
        </Section>

        {/* SidebarButton */}
        <Section title="SidebarButton">
          <div className="w-60 space-y-1">
            {sidebarItems.map((item, i) => (
              <SidebarButton
                key={item}
                active={activeSidebar === i}
                onClick={() => setActiveSidebar(i)}
              >
                {item}
              </SidebarButton>
            ))}
          </div>
        </Section>

        {/* QuestionCard */}
        <Section title="QuestionCard">
          <QuestionCard
            title="React 19에서 use() API는 어떻게 사용하나요?"
            content="React 19에서 새로 도입된 use() API의 사용법과 기존 useEffect와의 차이점이 궁금합니다."
            author="개발자A"
            date="2026.03.17"
            answerCount={3}
          />
          <QuestionCard
            title="Tailwind CSS v4 마이그레이션 가이드"
            content="v3에서 v4로 마이그레이션할 때 주의할 점이 있을까요?"
            author="디자이너B"
            date="2026.03.16"
            answerCount={0}
          />
        </Section>

        {/* Toast */}
        <Section title="Toast">
          <SubSection label="variant: inline / popup">
            <Toast message="저장되었습니다" variant="inline" />
            <Toast message="알림" description="새로운 답변이 등록되었습니다" variant="popup" />
          </SubSection>
        </Section>

        {/* Loading */}
        <Section title="Loading">
          <Loading />
        </Section>

        {/* NotFound */}
        <Section title="NotFound">
          <SubSection label="variant 선택">
            {(["quiz", "qna", "community", "404"] as const).map((v) => (
              <Button
                key={v}
                variant={notFoundVariant === v ? "primary" : "outline"}
                size="sm"
                onClick={() => setNotFoundVariant(v)}
              >
                {v}
              </Button>
            ))}
          </SubSection>
          <NotFound variant={notFoundVariant} />
        </Section>

        {/* Pagination */}
        <Section title="Pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </Section>

        {/* Modals & Popups */}
        <Section title="Modal / Popup / ConfirmModal / QuestionInputModal">
          <SubSection label="클릭하여 열기">
            <Button onClick={() => setPopupOpen(true)}>Popup 열기</Button>
            <Button onClick={() => setModalOpen(true)} variant="outline">Modal 열기</Button>
            <Button onClick={() => setConfirmOpen(true)} variant="ghost">ConfirmModal 열기</Button>
            <Button onClick={() => setQuestionModalOpen(true)} variant="outline">질문 작성 Modal</Button>
          </SubSection>
        </Section>
      </div>

      {/* Footer */}
      <Footer />

      {/* Popup */}
      <Popup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        title="알림"
        description="이 작업을 진행하시겠습니까?"
      />

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4">모달 제목</h3>
          <p className="text-gray-600 mb-4">모달 내용이 들어갑니다.</p>
          <Button onClick={() => setModalOpen(false)}>닫기</Button>
        </div>
      </Modal>

      {/* ConfirmModal */}
      <ConfirmModal
        open={confirmOpen}
        message="정말 삭제하시겠습니까?"
        onConfirm={() => {
          alert("삭제됨");
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* QuestionInputModal */}
      <QuestionInputModal
        open={questionModalOpen}
        onClose={() => setQuestionModalOpen(false)}
        onSubmit={(content: string) => {
          alert(`내용: ${content}`);
          setQuestionModalOpen(false);
        }}
      />
    </div>
  );
}
