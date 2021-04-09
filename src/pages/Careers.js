import React from 'react';
import { useTranslation } from "react-i18next";
import StaticPage from '../containers/StaticPage'
import "../../src/assets/css/pages/StaticPages/Careers.scss";
import team from '../assets/imgs/team.jpg'

const Careers = () => {
    const { t } = useTranslation();
    return <div>
        <StaticPage>
        <div className="CareersPage">
            <img className="team-photo" src={team} alt="Team" />
            <div className="job-departments">
                <div className="JobDepartment">
                    <div className="department-name">{t("careers.Software Development")}</div>
                    <div className="JobPosition">
                        <div className="content">
                            <div className="job-info">
                                <div className="job-title">{t("careers.Senior Full Stack Engineer")}</div>
                                <div className="job-location">{t("careers.Tel Aviv")}</div>
                            </div>
                            <div className="PinkButton">{t("careers.Apply")}</div>
                        </div>
                    </div>
                </div>
                <div className="JobDepartment">
                    <div className="department-name">{t("careers.Operations")}</div>
                    <div className="JobPosition">
                        <div className="content">
                            <div className="job-info">
                                <div className="job-title">{t("careers.Customer Service Operations Manager")}</div>
                                <div className="job-location">{t("careers.Tel Aviv")}</div>
                            </div>
                            <div className="PinkButton">{t("careers.Apply")}</div>
                        </div>
                    </div>
                    <div className="JobPosition">
                        <div className="content">
                            <div className="job-info">
                                <div className="job-title">{t("careers.Data Analyst Lead")}</div>
                                <div className="job-location">{t("careers.Tel Aviv")}</div>
                            </div>
                            <div className="PinkButton">{t("careers.Apply")}</div>
                        </div>
                    </div>
                    <div className="JobPosition">
                        <div className="content">
                            <div className="job-info">
                                <div className="job-title">{t("careers.Head of Physical Product Engineering")}</div>
                                <div className="job-location">{t("careers.Tel Aviv")}</div>
                            </div>
                            <div className="PinkButton">{t("careers.Apply")}</div>
                        </div>
                    </div>
                    <div className="JobPosition">
                        <div className="content">
                            <div className="job-info">
                                <div className="job-title">{t("careers.Strategic Materials Sourcing Specialist")}</div>
                                <div className="job-location">{t("careers.Tel Aviv")}</div>
                            </div>
                            <div className="PinkButton">{t("careers.Apply")}</div>
                        </div>
                    </div>
                    <div className="JobPosition">
                        <div className="content">
                            <div className="job-info">
                                <div className="job-title">{t("careers.Supply Chain Coordinator")}</div>
                                <div className="job-location">{t("careers.Tel Aviv")}</div>
                            </div>
                            <div className="PinkButton">{t("careers.Apply")}</div>
                        </div>
                    </div>
                </div>
                <div className="JobDepartment">
                    <div className="department-name">{t("careers.HR")}</div>
                    <div className="JobPosition">
                        <div className="content">
                            <div className="job-info">
                                <div className="job-title">{t("careers.Technical Talent Acquisition Lead")}</div>
                                <div className="job-location">{t("careers.Tel Aviv")}</div>
                            </div>
                            <div className="PinkButton">{t("careers.Apply")}</div>
                        </div>
                    </div>
                </div>
                <div className="JobDepartment">
                    <div className="department-name">{t("careers.Finance")}</div>
                    <div className="JobPosition">
                        <div className="content">
                            <div className="job-info">
                                <div className="job-title">{t("careers.Assistant Controller")}</div>
                                <div className="job-location">{t("careers.Tel Aviv")}</div>
                            </div>
                            <div className="PinkButton">{t("careers.Apply")}</div>
                        </div>
                    </div>
                    <div className="JobPosition">
                        <div className="content">
                            <div className="job-info">
                                <div className="job-title">{t("careers.Bookkeeper")}</div>
                                <div className="job-location">{t("careers.Tel Aviv")}</div>
                            </div>
                            <div className="PinkButton">{t("careers.Apply")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </StaticPage>
    </div>
}
export default Careers