/** 캘린더: fullcalendar 라이브러리 이용 */

import React, { useContext, useState } from "react";
import styled from "styled-components";
import { StiContext } from "../contexts";
import { AddScheduleForm } from "./AddScheduleForm";
import { StikerBox } from "./StickerBox";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = styled.div`
  position: relative;
  padding: 20px 50px;
  max-width: 1100px;
  margin: 40px auto;
  font-family: "GowunDodum-Regular";
`;

export function CalendarBox() {
  const {
    state: { attachedStickers },
  } = useContext(StiContext);

  const [eventId, setEventId] = useState(1);
  const [events, setEvents] = useState([
    {
      id: 0,
      title: "크리스마스!!",
      start: "2021-12-25",
      end: "2021-12-25",
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState({
    title: "",
    start: "",
    end: "",
  });
  const [isShowScheduleForm, setIsShowScheduleForm] = useState(false);
  const [isShowStiBox, setIsShowStiBox] = useState(false);

  // 새로운 스케줄(일정) 추가를 위한 등록창 열기
  const showScheduleForm = () => {
    setIsShowScheduleForm(!isShowScheduleForm);
  };

  // 새로운 스케줄(일정) 등록하기
  const addSchedule = (title, start, end) => {
    setEvents([...events, { id: eventId, title, start, end }]);
    setEventId((id) => id + 1);
    showScheduleForm();
  };

  // 날짜 선택(하루, 드래그하여 기간), 이벤트 선택 시 selectedEvent에 상태 저장 후 등록 창 열기
  const setEventAndShowForm = (e, title, start, end) => {
    setSelectedEvent({ e, title, start, end });
    showScheduleForm();
  };

  // 스케줄(일정) 수정하기
  const upDateSchedule = (id, title, start, end) => {
    const targetIdx = events.findIndex((event) => event.id == id);
    const newEvents = [...events];
    newEvents[targetIdx] = { id, title, start, end };
    setEvents(newEvents);
    showScheduleForm();
  };

  // 스케줄(일정) 삭제하기
  const deleteSchedule = (id) => {
    const newEvents = events.filter((event) => event.id != id);
    setEvents(newEvents);
    showScheduleForm();
  };

  // 스티커 박스 열기
  const showStiBox = () => {
    setIsShowStiBox(!isShowStiBox);
  };

  return (
    <Calendar>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "new sticker",
        }}
        customButtons={{
          new: { text: "new", click: showScheduleForm },
          sticker: { text: "sticker", click: showStiBox },
        }}
        editable={true}
        droppable={true}
        selectable={true}
        events={events}
        select={(e) => setEventAndShowForm(e, "", e.start, e.end)}
        eventClick={(e) =>
          setEventAndShowForm(e, e.event.title, e.event.start, e.event.end)
        }
        eventDrop={(info) => {
          const { start, end } = info.oldEvent._instance.range;
          const { start: newStart, end: newEnd } = info.event._instance.range;
          if (new Date(start).getDate() === new Date(newStart).getDate()) {
            info.revert();
          }
        }}
      />
      {attachedStickers}
      {isShowStiBox ? <StikerBox /> : null}
      {isShowScheduleForm ? (
        <AddScheduleForm
          event={selectedEvent}
          addSchedule={addSchedule}
          closeForm={showScheduleForm}
          upDateSchedule={upDateSchedule}
          deleteSchedule={deleteSchedule}
        />
      ) : null}
    </Calendar>
  );
}
