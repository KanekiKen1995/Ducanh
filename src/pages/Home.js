import React from "react";
import "../index.scss";
import "../../src/assets/css/pages/Home/index.scss";
import { useTranslation } from "react-i18next";
import { Footer } from "../components/Footer";
import SliderImg from "../components/Slider/Slider";
import { logo } from "../assets/icons";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  let history = useHistory();
  function handleClick() {
    history.push("/review");
  }
  return (
    <div className="pitch-page">
      <div className="Pitch-scrollable">
        <div className="Pitch-box-1">
          <img className="logo" src={logo} />
          <div className="Pitch-header">
            {t("home.Turn your photos into affordable, stunning wall art")}
          </div>
          <div className="PitchMedia visible">
            <div className="video-container">
              <video controls autoPlay>
                <source
                  src="https://dl.dropbox.com/s/1svjpkw397gg863/video.mp4"
                  type="video/mp4"
                />
              </video>
              {/* <iframe
                width="800"
                height="450"
                src="http://techslides.com/demos/sample-videos/small.mp4"
                frameBorder="20"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> */}
            </div>
          </div>
          {/*<div className="Pitch-pr-bit">*/}
          {/*  {t('home."This is heaven"')}*/}
          {/*  <br />*/}
          {/*  <img className="press-logo" src={pressLogo} />*/}
          {/*</div>*/}
        </div>

        {/*<div className="White-section Pitch-pricing">*/}
        {/*  <div className="title"> {t("home.Only US$11 each")}</div>*/}
        {/*  <div className="text">{t("home.Shipping is always free")}</div>*/}
        {/*  <div className="text"></div>*/}
        {/*</div>*/}

        <div className="Pitch-box-2">
          <div className="Pitch-tiles-sold">
            {t("home.Millions Of Tiles Sold")}
            <div className="Pitch-gracing-walls">
              {t("home.GRACING WALLS OF ALL KINDS")}
            </div>
          </div>
          <SliderImg />
        </div>

        <div className="White-section Pitch-pricing">
          <div className="title">{t("home.One perfect size")}</div>
          <div className="text">{t("home.Tiles are 8 by 8")}</div>
        </div>

        <div className="Pitch-reviews">
          <div className="stars">
            <div className="stars-image">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-star fa-w-18 fa-7x"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" className=""></path></svg>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-star fa-w-18 fa-7x"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" className=""></path></svg>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-star fa-w-18 fa-7x"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" className=""></path></svg>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-star fa-w-18 fa-7x"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" className=""></path></svg>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-star fa-w-18 fa-7x"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" className=""></path></svg>
            </div>
          </div>
          <div className="subtitle">{t("home.APP STORE REVIEWS")}</div>
        </div>

        {/*<div className="Pitch-guarantee">*/}
        {/*  {t("home.You'll love our product or we'll return your money")}*/}
        {/*</div>*/}
        <Footer />
        <div className="Spacer"></div>
      </div>
      <div className="bottom-bar" onClick={handleClick}>
        <div className="bottom-button-container">
          <div className="bottom-button" id="real_button">
            {t("home.Start")}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
