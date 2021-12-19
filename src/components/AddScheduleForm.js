/** 스케줄 등록을 위한 입력창 */

import { useState } from "react";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// 입력창 박스 스타일
const Box = styled.div`
  width: 400px;
  height: 270px;
  display: inline-block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #e7ecef;
  border-radius: 5px;
  z-index: 10;

  .datePicker {
    padding: 8px 10px;
    font-size: 15px;
    border: none;
    border-radius: 15px;
    outline: none;
    text-align: center;
  }
`;

// 모달 효과를 위한 배경 레이어
const BackLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
`;

// 박스 내 헤더 스타일
const Header = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0 20px 0;
`;

// 라벨 스타일
const Label = styled.div`
  margin: 15px 0 10px 5px;
`;

// 일정 입력폼 스타일
const TitleInput = styled.input`
  width: 380px;
  padding: 8px 10px;
  font-size: 15px;
  border: none;
  border-radius: 15px;
  outline: none;
`;

// DatePicker 정렬
const AlignDate = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 10px;
  }
`;

// 버튼 정렬
const AlignBtn = styled.div`
  text-align: center;
  margin-top: 20px;
`;

// 버튼 스타일
const StyledButton = styled.button`
  padding: 8px 10px;
  margin: 0 5px;
  color: #ffffff;
  background-color: #2c3e50;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1b2632;
  }
`;

export function AddScheduleForm(props) {
  const [title, setTitle] = useState(props.event.title);
  const [startDate, setStartDate] = useState(props.event.start);
  const [endDate, setEndDate] = useState(props.event.end);

  // CalendarBox로 데이터를 전달하여 스케줄(일정) 등록하기
  const addSchedule = () => {
    props.addSchedule(title, startDate, endDate);
  };

  const upDateSchedule = () => {
    props.upDateSchedule(props.event.e.event.id, title, startDate, endDate);
  };

  const deleteSchedule = () => {
    props.deleteSchedule(props.event.e.event.id);
  };

  // CalendarBox의 함수를 호출하여 입력창 닫기
  const closeForm = () => {
    props.closeForm();
  };

  return (
    <div>
      <BackLayer></BackLayer>
      <Box>
        <div>Schedule</div>
        <Header>일정 추가</Header>
        <Label>어떤 일정인가요?</Label>
        <TitleInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label>기간를 선택하세요!</Label>
        <AlignDate>
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="시작일"
            className="datePicker"
          />
          <div className="icon"> ~ </div>
          <ReactDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="종료일"
            className="datePicker"
          />
        </AlignDate>
        <AlignBtn>
          {props.event.title ? (
            <>
              <StyledButton onClick={upDateSchedule}>수정</StyledButton>
              <StyledButton onClick={deleteSchedule}>삭제</StyledButton>
            </>
          ) : (
            <StyledButton onClick={addSchedule}>등록</StyledButton>
          )}
          <StyledButton onClick={closeForm}>취소</StyledButton>
        </AlignBtn>
      </Box>
    </div>
  );
}
