/** 캘린더에 붙일 스티커를 선택하는 스티커박스
 * - 스티커: 스티팝API 이용
 */

import { useEffect, useState } from "react";
import styled from "styled-components";
import { stiApi } from "../apis/StickerAPI";
import { SearchBar } from "./SearchBar";
import { StickerItem } from "../components/StickerItem";

// 스티커 박스 스타일
const Box = styled.div`
  background-color: #e7ecef;
  width: 21vw;
  height: 300px;
  border-radius: 10px;
  position: absolute;
  top: 70px;
  right: 50px;
  z-index: 30;
`;

// 스티커 박스 내 스티커 목록 스타일
const List = styled.ul`
  display: flex;
  height: 235px;
  flex-wrap: wrap;
  overflow: auto;
`;

// 스티커 목록 끝의 더보기 버튼 스타일
const BtnMore = styled.button`
  background-color: #e7ecef;
  width: 100%;
  border: none;
  padding: 10px 0;
  color: #7a7a7a;
  &:hover {
    background-color: #d9e1e6;
    cursor: pointer;
  }
`;

// 검색된 스티커가 없을 경우 나타나는 글귀 스타일
const NoSticker = styled.div`
  text-align: center;
  padding-top: 50px;
`;

export function StikerBox() {
  const [stickerList, setStickerList] = useState([]);
  const [keyword, setKeyword] = useState("hello");
  const [pageNumber, setPageNumber] = useState(1);

  // 처음 스티커 박스를 열었을 때 hello 키워드로 검색된 결과 보여주기
  useEffect(() => {
    searchStikers(keyword, pageNumber);
  }, []);

  // 검색어(word)와 일치하는 스티커 목록 불러오기
  const searchStikers = (word, pageNumber) => {
    stiApi.searchStikers(
      { keyword: word, pageNumber: pageNumber },
      ({ data }) => {
        setStickerList(data.body.stickerList);
      },
      () => {
        alert(
          "스티커를 불러오는 중 오류가 발생했습니다. 다시 시도하여 주시기 바랍니다."
        );
        location.reload(true);
      }
    );
  };

  // 검색창에 입력된 키워드를 전달받아 검색하기
  const getSearchWord = (word) => {
    setKeyword(word);
    setPageNumber(1);
    searchStikers(word, 1);
  };

  // 스티커 목록의 끝에서 더보기를 클릭했을 때 다음 페이지의 스티커를 불러오기
  const getMoreSticker = () => {
    stiApi.searchStikers(
      { keyword: keyword, pageNumber: pageNumber + 1 },
      ({ data }) => {
        setStickerList(stickerList.concat(data.body.stickerList));
        setPageNumber((num) => num + 1);
      },
      () => {
        alert(
          "스티커를 불러오는 중 오류가 발생했습니다. 다시 시도하여 주시기 바랍니다."
        );
        location.reload(true);
      }
    );
  };

  return (
    <Box>
      <SearchBar sendWord={getSearchWord} />
      {stickerList ? (
        <List>
          {stickerList.map((sticker) => {
            return (
              <StickerItem img={sticker.stickerImg} key={sticker.stickerId} />
            );
          })}
          <BtnMore onClick={getMoreSticker}>더보기</BtnMore>
        </List>
      ) : (
        <NoSticker>조회된 스티커가 없습니다.</NoSticker>
      )}
    </Box>
  );
}
