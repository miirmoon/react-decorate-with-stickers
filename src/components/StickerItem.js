/** 하나의 개별 스티커
 * - 스티커 위치 이동 및 크기 조절: react-rnd 라이브러리 이용
 */

import { useContext, useState } from "react";
import styled from "styled-components";
import { StiContext } from "../contexts";
import { ADD_Sticker } from "../contexts/actionTypes";
import { Rnd } from "react-rnd";
// import { TiDelete } from "react-icons/ti";

// 목록에 표현되는 스티커 스타일
const ListImg = styled.img`
  width: 75px;
  margin: 5px 10px;
  cursor: pointer;
`;

// 스티커를 클릭했을 때 캘린더에 생성되는 각 스티커를 감싸는 박스(react-rnd)
const StyledRnd = styled(Rnd)`
  position: relative;
  z-index: 5;
  &:hover {
    border: 1px solid #a9bac5;
  }
  &:hover .delete {
    visibility: visible;
  }

  .delete {
    visibility: hidden;
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 6;
    cursor: pointer;
    color: #a9bac5;
  }
`;

// 스티커를 클릭했을 때 캘린더의 생성되는 스티커의 크기를 rnd 박스에 맞춤
const Sticker = styled.img`
  width: inherit;
`;

export function StickerItem(props) {
  const {
    state: { countKey },
    dispatch,
  } = useContext(StiContext);

  // 캘린더에 생성되는 스티커의 위치 및 크기 초기화
  const [position, setPosition] = useState({
    x: 30,
    y: 80,
    width: 100,
    height: 100,
  });

  // 스티커의 조정된 크기 상태 저장(같은 스티커를 추가했을 때 같은 크기로 생성)
  const onResize = (event, direction, ref, delta) => {
    const { width, height } = ref.style;

    setPosition((prevPosition) => ({
      ...prevPosition,
      width,
      height,
    }));
  };

  // 스티커의 이동 위치 상태 저장(같은 스티커를 추가했을 때 근처 위치에 생성)
  const onDragStop = (e, d) => {
    const { x, y } = d;
    setPosition((prevPosition) => ({
      ...prevPosition,
      x: x + 10,
      y: y + 10,
    }));
  };

  // 스티커 목록에서 스티커를 선택해서 캘린더에 추가하기
  const addSticker = () => {
    const newStickerTag = (
      <StyledRnd
        default={position}
        onResize={onResize}
        onDragStop={onDragStop}
        bounds="parent"
        lockAspectRatio={true}
        key={countKey}
      >
        <Sticker src={props.img}></Sticker>
        {/* <TiDelete className="delete" size="25" onClick={deleteSticker} /> */}
      </StyledRnd>
    );
    dispatch({
      type: ADD_Sticker,
      payload: newStickerTag,
    });
  };

  // const deleteSticker = () => {
  //   console.log();
  // };

  return (
    <li>
      <ListImg src={props.img} onClick={addSticker}></ListImg>
    </li>
  );
}
