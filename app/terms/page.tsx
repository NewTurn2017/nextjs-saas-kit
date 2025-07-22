export default function TermsPage() {
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 overflow-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">서비스 약관</h1>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">제1조 (목적)</h2>
            <p className="text-gray-600 leading-relaxed">
              이 약관은 스타터킷(이하 "회사")이 제공하는 모든 서비스(이하 "서비스")의 이용조건 및
              절차에 관한 사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">제2조 (용어의 정의)</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>"서비스"란 회사가 제공하는 모든 온라인 서비스를 의미합니다.</li>
              <li>
                "회원"이란 회사와 서비스 이용계약을 체결하고 회원 아이디를 부여받은 자를 의미합니다.
              </li>
              <li>
                "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인한 이메일
                주소를 의미합니다.
              </li>
              <li>
                "비밀번호"란 회원이 부여받은 아이디와 일치되는 회원임을 확인하기 위해 회원 자신이
                정한 문자 또는 숫자의 조합을 의미합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              제3조 (약관의 효력 및 변경)
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력을
                발생합니다.
              </li>
              <li>
                회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 제1항과
                같은 방법으로 공지함으로써 효력을 발생합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">제4조 (회원가입)</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                회원가입은 신청자가 이 약관에 동의하고 회사가 정한 가입 양식에 따라 회원정보를
                기입하여 가입을 신청합니다.
              </li>
              <li>
                회사는 제1항과 같이 회원으로 가입할 것을 신청한 자가 다음 각 호에 해당하지 않는 한
                회원으로 등록합니다.
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                  <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                  <li>
                    기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우
                  </li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">제5조 (서비스의 이용)</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
              <li>
                회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한
                이유가 있는 경우 서비스의 제공을 일시적으로 중단할 수 있습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">제6조 (회원의 의무)</h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              회원은 다음 행위를 하여서는 안 됩니다.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>신청 또는 변경 시 허위 내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>회사가 게시한 정보의 변경</li>
              <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
              <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
              <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>
                외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개
                또는 게시하는 행위
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">제7조 (개인정보 보호)</h2>
            <p className="text-gray-600 leading-relaxed">
              회사는 회원의 개인정보를 보호하기 위하여 "개인정보 처리방침"을 제정하여 운영하고
              있으며, 개인정보 보호에 관한 자세한 사항은 회사의 개인정보 처리방침을 참조하시기
              바랍니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">제8조 (면책조항)</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는
                경우에는 서비스 제공에 관한 책임이 면제됩니다.
              </li>
              <li>
                회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
              </li>
              <li>
                회사는 회원이 서비스와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에
                관하여는 책임을 지지 않습니다.
              </li>
            </ol>
          </section>

          <section className="border-t pt-8">
            <p className="text-gray-600 text-center">
              <strong>시행일:</strong> 2025년 1월 1일
            </p>
            <p className="text-gray-600 text-center mt-2">
              <strong>문의:</strong> support@starterkit.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
