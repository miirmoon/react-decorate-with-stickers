/** 주제별 스티커를 검색할 수 있는 검색창 */

import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

// 검색창을 포함하고 있는 검색박스 스타일
const Box = styled.div`
  position: relative;
  text-align: center;
  padding: 10px;

  .icon {
    position: absolute;
    left: 50px;
    top: 19px;
    color: #7a7a7a;
  }
`;

// 검색창 스타일
const SearchInput = styled.input`
  width: 80%;
  padding: 8px 10px;
  text-indent: 1.8em;
  font-size: 15px;
  border: none;
  border-radius: 20px;
  outline: none;
`;

export function SearchBar(props) {
  // 입력된 검색어를 StickerBox 컴포넌트로 전달
  const checkEnter = (e) => {
    if (e.key === "Enter") {
      props.sendWord(e.target.value);
    }
  };

  return (
    <Box>
      <FiSearch className="icon" />
      <SearchInput
        type="text"
        onKeyPress={checkEnter}
        placeholder="검색어를 입력하세요."
      ></SearchInput>
    </Box>
  );
}
