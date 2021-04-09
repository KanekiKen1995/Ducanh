import React, {Component} from "react";
import Slider from "react-slick";
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
            author: "minhhoang",
            review: "Phòng khách của tôi trông sang trọng hơn rất nhiều <3"
        },
        {
            img: Nature2,
            author: "nguyenthuy112",
            review: "Tôi đã có một lựa chọn đúng đắn. Cảm ơn Mixtiles!"
        },
        {
            img: Nature3,
            author: "vananh56",
            review: "Tôi đi lên cầu thang hằng ngày luôn!"
        },
        {
            img: Nature4,
            author: "namdoan",
            review: "Góc thư giãn hằng ngày của tôi!"
        },
        {
            img: Nature5,
            author: "khanhnam0902",
            review: "Những bãi biển tôi đã từng đi này :D !!"
        },
        {
            img: Nature6,
            author: "minhchien",
            review: "Đi về nhà!"
        },
        {
            img: Nature7,
            author: "vuhuy82",
            review: "Vợ con tôi, gia đình tôi! <3"
        },
        {
            img: Nature8,
            author: "thangdang",
            review: "Ngủ ngon nhé :>, tôi chắc chắn sẽ tiếp tục mua thêm để trang trí phòng khách :>"
        },
        {
            img: Nature9,
            author: "phungmy",
            review: "Đằng sau bức tường là cả 1 câu chuyện tình yêu <3 ! Cảm ơn Mixtiles nhiều nhéee ^^"
        },
        {
            img: Nature10,
            author: "chidang",
            review: "Chỉ định dùng thử thôi, nhưng giờ thành fan cứng :D <3 #MixtilesVietNam"
        },
        {
            img: Nature11,
            author: "chithanh",
            review: "Aaaaaaaa, cảm ơn Mixtiles nhé <3"
        },
        {
            img: Nature12,
            author: "nguyetnguyen",
            review: "Mỗi nơi mỗi khác!"
        }
    ]
    return (
        <div className="Testimonials-container">
            <Slider {...settings}>
                {sliderData.map((e, i) => {
                    return (
                        // phải style thằng width mới ăn
                        <div key={e + i} style={{width: 330}}>
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
