// 계좌관리

import { useState } from "react";

// 버튼: 입금버튼, 출금버튼
// 버튼 클릭시에 입금 금액 또는 출금 금액을 입력 받을 수 있음.

// 목록: 입금, 출금액 목록을 ul > li로 표시한다.
// 입금 금액은 <li> 입금: 금액 (녹색)</li> 으로 표시
// 출금 금액은 <li> 출금: -금액 (빨간색)</li> 으로 표시

// 잔액: 잔액을 입금, 출금 버튼 우측에 표시한다.

const AccountManager = () => {
  // 입출금 이력을 표시하는 state
  const [logs, setLogs] = useState<number[]>([]);

  // 입력값 받는 함수
  // transact: 거래하다, transaction: 거래
  const transact = (mode: "deposit" | "withdraw") => {
    const msg = mode === "deposit" ? "입금금액" : "출금금액";
    const input = prompt(`${msg}을 입력해주세요`);

    // 입금이면 양수, 출금이면 음수
    let money = 0;
    if (input) {
      money = mode === "deposit" ? +input : -input;
    }
  };

  return (
    <div>
      <h2>Account Manneger</h2>
      <button onClick={() => transact("deposit")}>입금</button>
      <button onClick={() => transact("withdraw")}>출금</button>
      <span>잔액:{logs}</span>
      <ul>
        <li>입금</li>
        <li>출금</li>
        {/* {logs.map((num, index) => (
          <ListItem key={index} logs={num} />
        )} */}
      </ul>
    </div>
  );
};

export default AccountManager;
