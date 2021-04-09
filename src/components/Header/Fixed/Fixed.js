import React, {useEffect} from "react";
import "./Fixed.scss";
import {useTranslation} from "react-i18next";
import {backArrow, menuIcon} from "../../../assets/icons";
import logo from "../../../assets/icons/logoReview.svg";
import {Drawer} from "../../Drawer";
import DialogActions from "../../DialogAction";
import MenuRight from "../MenuRight";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {useHistory} from "react-router-dom";

const Fixed = (props) => {
    const {t} = useTranslation();
    const [state, setState] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleOpensDialog = () => {
        setState(false);
        setOpenDialog(true);
    };

    const toggleDrawer = (value) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState(value);
    };
    let history = useHistory();
    const handleBackHome = () => {
        history.push("/");
    };

    return (
        <div className="ReviewActionBars">
            <div className="top-bar-container">
                <div className="top-bar">
                    <div className="back-button" onClick={handleBackHome}>
                        <img src={backArrow}/>
                    </div>
                    <div className="logo" onClick={handleBackHome}>
                        <img src={logo}/>
                    </div>
                    <div className="menu-button" onClick={toggleDrawer(true)}>
                        <img src={menuIcon}/>
                    </div>
                </div>
                <div></div>
            </div>
            <Drawer.SiderBar {...props} />

            <SwipeableDrawer
                anchor="right"
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <MenuRight
                    toggleDrawer={toggleDrawer}
                    handleOpensDialog={handleOpensDialog}
                />
            </SwipeableDrawer>

            <DialogActions
                handleClose={handleClose}
                open={openDialog}
                title="Frequent Questions"
            >
                <div className="faq-modal">
                    <div className="faq-content">
                        <div className="FaqItem">
                            <div className="question">Chi phí của Mixtiles là bao nhiêu?</div>
                            <div className="answer">Mỗi tranh bạn mua sẽ có giá 70.000 VNĐ. Nếu bạn mua từ 4 tranh trở
                                lên, chúng tôi sẽ ship hàng miễn phí!
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">Kích thước ô là bao nhiêu như thế nào?</div>
                            <div className="answer">Chúng có kích thước khoảng 20 x 20 x 2 cm (8 x 8 inch và chỉ dày
                                dưới 1 inch).
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">Bạn có kích thước nào khác không?</div>
                            <div className="answer">Giờ thì không, nhưng chúng tôi sẽ cố gắng!</div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">Việc lên hàng mất bao lâu?</div>
                            <div className="answer">Thường là khoảng một tuần để đảm bảo chất lượng tranh tốt nhất.
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">Cách thức hoạt động của Mixtile?</div>
                            <div className="answer">Có một dải băng dính đặc biệt ở mặt sau của chúng. Bạn bóc lớp giấy
                                bảo vệ và dán chúng lên tường. Dễ như ăn bánh! (Chúng tôi thưởng thức bánh.)
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">Có dễ dàng di chuyển tranh xung quanh không?</div>
                            <div className="answer">Siêu dễ dàng - đó là những gì khiến Mixtiles tự hào! Chỉ cần lấy
                                chúng ra khỏi tường và dán chúng vào một vị trí khác. Bạn có thể làm điều này vài chục
                                lần!
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">Và chúng sẽ không làm tổn thương những bức tường của tôi?</div>
                            <div className="answer">Không, không hề thiệt hại nào.</div>
                        </div>
                        <div className="FaqItem">
                            <div className="question"/>
                            <div className="answer"/>
                        </div>
                        <div className="FaqItem">
                            <div className="question">Có bất kỳ loại tường nào mà Mixtiles không dính vào?</div>
                            <div className="answer">Chúng hoạt động hiệu quả trên phần lớn các bức tường. Nhưng nếu bạn
                                gặp bất kỳ sự cố nào, chỉ cần cho chúng tôi biết và chúng tôi sẽ hỗ trợ bạn.
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">Có độ phân giải ảnh tối thiểu mà tôi nên sử dụng không?</div>
                            <div className="answer">Các bức ảnh của bạn phải có kích thước ít nhất là 800 x 800
                                pixel để tạo ra bản in rõ ràng. Ứng dụng sẽ cảnh báo bạn nếu các bức ảnh của bạn nhỏ
                                hơn thế.
                            </div>
                        </div>
                        {/*<div className="FaqItem">*/}
                        {/*    <div className="question">Is there a minimum photo resolution I should use?</div>*/}
                        {/*    <div className="answer">Your pics should be at least 499 x 499 pixels to make a clear*/}
                        {/*        print. The app will warn you if your pics are smaller than that.*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="FaqItem">*/}
                        {/*    <div className="question">Can I use photos from my Facebook or Instagram?</div>*/}
                        {/*    <div className="answer">Yup! Select "Choose from Online Services" when adding your*/}
                        {/*        photos.*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="FaqItem">*/}
                        {/*    <div className="question">Do you ship internationally?</div>*/}
                        {/*    <div className="answer">We ship to most countries around the world. You can choose your*/}
                        {/*        country from the drop-down menu when you enter your address!*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </DialogActions>
        </div>
    );
};
export default Fixed;
