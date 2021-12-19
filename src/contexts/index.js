/** 캘린더에 추가된 스티커를 다른 컴포넌트에서 공유하기 위한 관리 */

import { createContext, useReducer } from "react";
import { ADD_Sticker } from "./actionTypes";

const InitialState = {
  attachedStickers: [],
  newSticker: "",
  countKey: 0,
};

const StiContext = createContext({});

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case ADD_Sticker:
      return {
        ...state,
        attachedStickers: [...state.attachedStickers, action.payload],
        newSticker: action.payload,
        countKey: state.countKey + 1,
      };
    default:
      return state;
  }
};

const StiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const value = { state, dispatch };
  return <StiContext.Provider value={value}>{children}</StiContext.Provider>;
};

export { StiContext, StiProvider };
