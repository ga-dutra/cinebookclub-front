import { useContext, useEffect, useState } from "react";
import LoadingAnimation from "../../common/LoadingAnimation";
import { UserContext } from "../../contexts/userContext";
import {
  getApiTrendingFilms,
  getApiTrendingTvShows,
} from "../../services/external_api";
import styled from "styled-components";
import MediaTypeSelection from "./MediaTypeSelection";
import TrendingBox from "./TrendingBox";

export default function Trending() {
  const { bottomMenuSelected, mainMenuSelected } = useContext(UserContext);
  const [medias, setMedias] = useState([]);
  const [mediaSelected, setMediaSelected] = useState("");

  useEffect(() => {
    async function getMedias() {
      try {
        let newMedias;
        if (mediaSelected === "films" && mainMenuSelected === "POPULARES") {
          newMedias = await getApiTrendingFilms("popular");
          setMedias(newMedias.results);
        } else if (
          mediaSelected === "films" &&
          mainMenuSelected === "PASSANDO HOJE"
        ) {
          newMedias = await getApiTrendingFilms("now_playing");
          setMedias(newMedias.results);
        } else if (
          mediaSelected === "tvshows" &&
          mainMenuSelected === "POPULARES"
        ) {
          newMedias = await getApiTrendingTvShows("popular");
          setMedias(newMedias.results);
        } else if (
          mediaSelected === "tvshows" &&
          mainMenuSelected === "PASSANDO HOJE"
        ) {
          newMedias = await getApiTrendingTvShows("now_playing");
          setMedias(newMedias.results);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMedias();
  }, [mainMenuSelected, mediaSelected]);

  if (bottomMenuSelected !== "Início") return <></>;
  if (mainMenuSelected === "POPULARES") {
    return (
      <Wrapper>
        <MediaTypeSelection
          mediaSelected={mediaSelected}
          setMediaSelected={setMediaSelected}
        />
        <MediaWrapper>
          {medias.length !== 0 && mediaSelected !== ""
            ? medias.map((media) => {
                if (media.backdrop_path) {
                  return <TrendingBox media={media}></TrendingBox>;
                }
              })
            : ""}
        </MediaWrapper>
        {mediaSelected && medias.length === 0 ? <LoadingAnimation /> : ""}
      </Wrapper>
    );
  } else if (mainMenuSelected === "PASSANDO HOJE") {
    return (
      <Wrapper>
        <MediaTypeSelection
          mediaSelected={mediaSelected}
          setMediaSelected={setMediaSelected}
        />
        <MediaWrapper>
          {medias.length !== 0 && mediaSelected !== ""
            ? medias.map((media) => {
                if (media.backdrop_path) {
                  return (
                    <TrendingBox key={media.id} media={media}></TrendingBox>
                  );
                }
              })
            : ""}
        </MediaWrapper>
        {mediaSelected && medias.length === 0 ? <LoadingAnimation /> : ""}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: calc(100vw - 20px);
  display: flex;
  margin-top: 50px;
`;

const MediaWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
`;