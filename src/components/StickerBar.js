import { useEffect, useState } from "react";
import styled from "styled-components";
import { stiApi } from "../apis/StickerAPI";

function StickerBar() {
  useEffect(() => {
    getBestPacks();
  }, []);

  const getBestPacks = () => {
    stiApi.getBestPacks(
      ({ data }) => {
        console.log(data);
      },
      () => {
        alert(
          "스티커를 불러오는 중 오류가 발생했습니다. 다시 시도하여 주시기 바랍니다."
        );
      }
    );
  };

  return <div>스티커바아아아</div>;
}

export default StickerBar;
