import React from "react";
import { Button } from "antd";

import * as S from "./styles";

function Header({ name, isShowSidebar, setIsShowSidebar }) {
  function handleToggleSidebar() {
    setIsShowSidebar(!isShowSidebar);
  }

  return (
    <S.HeaderContainer>
      <S.HeaderLogo>
        <Button
          variant="outline-primary"
          onClick={() => handleToggleSidebar()}
        >
          Ẩn/Hiện Sidebar
        </Button>
        <div>Logo</div>
      </S.HeaderLogo>
      <div>{name}</div>
    </S.HeaderContainer>
  );
}

export default Header;
