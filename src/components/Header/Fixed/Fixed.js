import React, { useEffect } from "react";
import "./Fixed.scss";
import { useTranslation } from "react-i18next";
import { backArrow, menuIcon } from "../../../assets/icons";
import logo from "../../../assets/icons/logoReview.svg";
import { Drawer } from "../../Drawer";
import DialogActions from "../../DialogAction";
import MenuRight from "../MenuRight";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { useHistory } from "react-router-dom";

const Fixed = (props) => {
    const { t } = useTranslation();
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
                        <img src={backArrow} />
                    </div>
                    <div className="logo" onClick={handleBackHome}>
                        <img src={logo} />
                    </div>
                    <div className="menu-button" onClick={toggleDrawer(true)}>
                        <img src={menuIcon} />
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
                title={t("FrequentQuestionsed.Frequent Questions")}
            >
                <div className="faq-modal">
                    <div className="faq-content">
                        <div className="FaqItem">
                            <div className="question">{t("FrequentQuestionsed.How much does Mixtiles cost")}</div>
                            <div className="answer">{t("FrequentQuestionsed.Each picture you buy will cost 70,000 VND If you buy 4 or more pictures, we will ship the item for free!")}
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">{t("FrequentQuestionsed.What is the cell size")}</div>
                            <div className="answer">{t("FrequentQuestionsed.They measure about 20 x 20 x 2 cm (8 x 8 inches and just under 1 inch thick)")}
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">{t("FrequentQuestionsed.Do you have any other sizes")}</div>
                            <div className="answer">{t("FrequentQuestionsed.Not now, but we will try")}</div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">{t("FrequentQuestionsed.How long does loading take")}</div>
                            <div className="answer">{t("FrequentQuestionsed.It usually takes about a week to ensure the best quality of painting")}
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">{t("FrequentQuestionsed.How Mixtile works")}</div>
                            <div className="answer">{t("FrequentQuestionsed.There is a special adhesive tape on the back of them You peel off the protective paper and stick them on the wall Easy as pie! (We enjoy the cake)")}
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">{t("FrequentQuestionsed.Is it easy to move pictures around")}</div>
                            <div className="answer">{t("FrequentQuestionsed.Super easy - that's what makes Mixtiles proud! Just take them off the wall and stick them in a different location You can do this a few dozen times")}
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">{t("FrequentQuestionsed.And they won't hurt my walls")}</div>
                            <div className="answer">{t("FrequentQuestionsed.No, no damage at all")}</div>
                        </div>
                        <div className="FaqItem">
                            <div className="question" />
                            <div className="answer" />
                        </div>
                        <div className="FaqItem">
                            <div className="question">{t("FrequentQuestionsed.Is there any kind of wall that Mixtiles doesn't stick to")}</div>
                            <div className="answer">{t("FrequentQuestionsed.They work effectively on most walls But if you have any issues, just let us know and we will assist you")}
                            </div>
                        </div>
                        <div className="FaqItem">
                            <div className="question">{t("FrequentQuestionsed.Is there a minimum photo resolution I should be using")}</div>
                            <div className="answer">{t("FrequentQuestionsed.Your photos should be at least 800 x 800 pixels in size to produce a clear print The app will warn you if your photos are smaller than that")}
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
