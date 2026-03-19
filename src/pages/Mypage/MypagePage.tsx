// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5063&m=dev
// Figma-states: mypage
import { useState } from "react";
import { MypageSidebar } from "../../shared/ui/MypageSidebar/MypageSidebar";
import { Input } from "../../shared/ui/Input/Input";
import { Button } from "../../shared/ui/Button/Button";
import { ProfileImage } from "../../shared/ui/ProfileImage/ProfileImage";
import { ConfirmModal } from "../../shared/ui/Modal/Modal";

export function MypagePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("홍길동");
  const [email] = useState("user@example.com");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  return (
    <>
      <div className="flex gap-10 w-300">
        <MypageSidebar />

        {/* Content */}
        <section className="flex-1 flex flex-col gap-10">
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
            프로필
          </h2>

          <div className="flex flex-col gap-8">
            {/* Profile Image */}
            <div className="flex items-center gap-6">
              <ProfileImage size="lg" />
              {isEditing && (
                <Button variant="ghost" size="sm">
                  사진 변경
                </Button>
              )}
            </div>

            {/* Profile Fields */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="mypage-name" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                  이름
                </label>
                {isEditing ? (
                  <Input id="mypage-name" value={name} onChange={setName} />
                ) : (
                  <p className="text-base leading-snug tracking-tight text-gray-primary py-2.5">
                    {name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="mypage-email" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                  이메일
                </label>
                <p className="text-base leading-snug tracking-tight text-gray-500 py-2.5">
                  {email}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(false)}>
                    저장
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                  >
                    취소
                  </Button>
                </>
              ) : (
                <Button
                  variant="mypage"
                  onClick={() => setIsEditing(true)}
                >
                  수정하기
                </Button>
              )}
            </div>
          </div>

          {/* Withdrawal */}
          <div className="border-t border-gray-200 pt-8">
            <button
              type="button"
              onClick={() => setShowWithdrawModal(true)}
              className="text-sm tracking-tight text-gray-400 cursor-pointer hover:text-danger transition-colors"
            >
              회원 탈퇴
            </button>
          </div>
        </section>
      </div>

      <ConfirmModal
        open={showWithdrawModal}
        message="정말 탈퇴하시겠습니까? 탈퇴 후에는 계정을 복구할 수 없습니다."
        confirmLabel="탈퇴"
        cancelLabel="취소"
        onConfirm={() => {
          setShowWithdrawModal(false);
          // TODO: API 연동
        }}
        onCancel={() => setShowWithdrawModal(false)}
      />
    </>
  );
}
