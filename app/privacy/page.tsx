export default function PrivacyPage() {
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 overflow-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">개인정보 처리방침</h1>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8">
          <section>
            <p className="text-gray-600 leading-relaxed mb-6">
              스타터킷(이하 "회사")은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계
              법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다.
              이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및
              기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여
              다음과 같이 개인정보 처리방침을 수립·공개합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              제1조 (개인정보의 처리목적)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의
              목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는
              등 필요한 조치를 이행할 예정입니다.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                <strong>회원 가입 및 관리:</strong> 회원 가입의사 확인, 회원제 서비스 제공에 따른
                본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지 등
              </li>
              <li>
                <strong>서비스 제공:</strong> 서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증 등
              </li>
              <li>
                <strong>고충처리:</strong> 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한
                연락·통지, 처리결과 통보 등
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              제2조 (개인정보의 처리 및 보유기간)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
              동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                <strong>회원 가입 및 관리:</strong> 회원 탈퇴 시까지
              </li>
              <li>
                <strong>서비스 제공:</strong> 서비스 공급 완료 및 요금 결제·정산 완료 시까지
              </li>
              <li>
                단, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>
                    관계 법령 위반에 따른 수사·조사 등이 진행중인 경우: 해당 수사·조사 종료 시까지
                  </li>
                  <li>서비스 이용에 따른 채권·채무관계 잔존 시: 해당 채권·채무관계 정산 시까지</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              제3조 (처리하는 개인정보의 항목)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              회사는 다음의 개인정보 항목을 처리하고 있습니다.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                <strong>회원가입 시</strong>
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>필수항목: 이메일 주소, 이름</li>
                  <li>선택항목: 프로필 사진</li>
                  <li>자동수집항목: IP주소, 쿠키, 서비스 이용 기록, 방문 기록</li>
                </ul>
              </li>
              <li>
                <strong>소셜 로그인 시 (Google)</strong>
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>이메일 주소, 이름, 프로필 사진</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              제4조 (개인정보의 제3자 제공)
            </h2>
            <p className="text-gray-600 leading-relaxed">
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만
              처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및
              제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              제5조 (개인정보의 파기절차 및 방법)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체없이 해당 개인정보를 파기합니다.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                <strong>파기절차:</strong> 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의
                개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
              </li>
              <li>
                <strong>파기방법:</strong> 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적
                방법을 사용합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              제6조 (정보주체와 법정대리인의 권리·의무 및 행사방법)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              정보주체는 회사에 대해 언제든지 개인정보 보호 관련 권리를 행사할 수 있습니다.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>개인정보 열람요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제요구</li>
              <li>처리정지 요구</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              제7조 (개인정보의 안전성 확보조치)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                <strong>관리적 조치:</strong> 내부관리계획 수립·시행, 정기적 직원 교육 등
              </li>
              <li>
                <strong>기술적 조치:</strong> 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템
                설치, 고유식별정보 등의 암호화, 보안프로그램 설치
              </li>
              <li>
                <strong>물리적 조치:</strong> 전산실, 자료보관실 등의 접근통제
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              제8조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로
              불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는
              서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자의 컴퓨터
              하드디스크에 저장되기도 합니다.
            </p>
            <p className="text-gray-600 leading-relaxed">
              이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는 웹브라우저에서
              옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나,
              아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              제9조 (개인정보 보호책임자)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
              정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고
              있습니다.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-gray-600">
              <p>
                <strong>개인정보 보호책임자</strong>
              </p>
              <ul className="list-none mt-2 space-y-1">
                <li>성명: 홍길동</li>
                <li>직책: 개인정보보호팀장</li>
                <li>연락처: privacy@starterkit.com</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              제10조 (개인정보 처리방침 변경)
            </h2>
            <p className="text-gray-600 leading-relaxed">
              이 개인정보 처리방침은 2025년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의
              추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할
              것입니다.
            </p>
          </section>

          <section className="border-t pt-8">
            <p className="text-gray-600 text-center">
              <strong>공고일자:</strong> 2025년 1월 1일
            </p>
            <p className="text-gray-600 text-center mt-2">
              <strong>시행일자:</strong> 2025년 1월 1일
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
