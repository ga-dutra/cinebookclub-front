import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/userContext";

function MenuIcon({ outlineIcon, fullIcon, name }) {
  const [isClicked, setIsClicked] = useState(false);
  const { menuClicked, setMenuClicked } = useContext(UserContext);

  function clickMenu() {
    if (menuClicked !== name) {
      setIsClicked(true);
      setMenuClicked(name);
    } else {
      setIsClicked(false);
      setMenuClicked("");
    }
  }

  return (
    <IconWrapper onClick={clickMenu}>
      <ion-icon
        name={isClicked && menuClicked === name ? fullIcon : outlineIcon}
      ></ion-icon>
      <IconName menuClicked={menuClicked} name={name}>
        {name}
      </IconName>
    </IconWrapper>
  );
}

const iconNames = [
  { outlineIcon: "home-outline", fullIcon: "home", name: "Início" },
  { outlineIcon: "film-outline", fullIcon: "film", name: "Filmes" },
  {
    outlineIcon: "book-outline",
    fullIcon: "book",
    name: "Livros",
  },
  { outlineIcon: "tv-outline", fullIcon: "tv", name: "Séries" },
  { outlineIcon: "menu-outline", fullIcon: "menu", name: "Mais" },
];

export default function BottomNavigationMenu() {
  return (
    <MenuWrapper>
      {iconNames.map((element) => {
        return (
          <MenuIcon
            outlineIcon={element.outlineIcon}
            fullIcon={element.fullIcon}
            name={element.name}
            key={element.name}
          />
        );
      })}
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  height: 100px;
  width: 100vw;

  align-items: center;
  justify-content: space-around;
  border: 1px solid #dbdbdb;
  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.05);
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 60px;
  cursor: pointer;

  > ion-icon {
    font-size: 30px;
    padding-bottom: 2px;
  }
`;

const IconName = styled.h1`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 20px;
  font-weight: ${(props) => (props.menuClicked === props.name ? 700 : 500)};
`;
