import React, { Component } from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import "../../assets/css/components/Slider/index.scss";

import {
    logo,
    Nature1,
    Nature2,
    Nature3,
    Nature4,
    Nature5,
    Nature6,
    Nature7,
    Nature8,
    Nature9,
    Nature10,
    Nature11,
    Nature12
} from "../../assets/imgs";

const SliderImg = () => {
    const { t } = useTranslation();
    const settings = {
        dots: true,
        swipeToSlide: true,
        centerMode: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        focusOnSelect: true,
        variableWidth: true,
        centerMode: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    centerPadding: '15px',
                    slidesToShow: 1
                }
            }
        ],
        customPaging: i => (
            <button
            >
                {i}
            </button>
        )
    };
    const sliderData = [
        {
            img: Nature1,
            author: t("Slide.name1"),
            review: t("Slide.review1")
        },
        {
            img: Nature2,
            author: t("Slide.name2"),
            review: t("Slide.review2")
        },
        {
            img: Nature3,
            author: t("Slide.name3"),
            review: t("Slide.review3")
        },
        {
            img: Nature4,
            author: t("Slide.name4"),
            review: t("Slide.review4")
        },
        {
            img: Nature5,
            author: t("Slide.name5"),
            review: t("Slide.review5")
        },
        {
            img: Nature6,
            author: t("Slide.name6"),
            review: t("Slide.review6")
        },
        {
            img: Nature7,
            author: t("Slide.name7"),
            review: t("Slide.review7")
        },
        {
            img: Nature8,
            author: t("Slide.name8"),
            review: t("Slide.review8")
        },
        {
            img: Nature9,
            author: t("Slide.name9"),
            review: t("Slide.review9")
        },
        {
            img: Nature10,
            author: t("Slide.name10"),
            review: t("Slide.review10")
        },
        {
            img: Nature11,
            author: t("Slide.name11"),
            review: t("Slide.review11")
        },
        {
            img: Nature12,
            author: t("Slide.name12"),
            review: t("Slide.review12")
        }
    ]
    return (
        <div className="Testimonials-container">
            <Slider {...settings}>
                {sliderData.map((e, i) => {
                    return (
                        // phải style thằng width mới ăn
                        <div key={e + i} style={{ width: 330 }}>
                            <div>
                                <div className="testimonial-item">
                                    <div className="OptimizedImage testimonial-image">
                                        <img
                                            className="ls-is-cached lazyloaded"
                                            height="290"
                                            src={e.img}
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="social-user">@{e.author}</div>
                                        <div className="text">{e.review}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};
export default SliderImg;
