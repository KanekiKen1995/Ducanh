import React from 'react';
import { Link } from "react-router-dom";
import './HeaderStaticPage.scss'
import logo from '../../../assets/icons/logoStaticPage.svg'
const HeaderStaticPage = () => {
    const menuItems = [
        {
            label: 'Iphone',
            url: 'https://mixtilesvietnam.com/',
            external: true
        },
        {
            label: 'Android',
            url: 'https://mixtilesvietnam.com/',
            external: true
        }
        // {
        //     label: 'Careers',
        //     url: '/careers'
        // },
        // {
        //     label: 'Contact',
        //     url: '/contact'
        // }
    ]
    return <div className="top-menu static-page-component">
        <Link to="/"><img src={logo} /></Link>
        <div className="menu-items">
            {menuItems.map(item => <div className="MenuItem" key={`menu-items-${item.label}`}>
                {item.external ? <a href={item.url} target="_blank">{item.label}</a> : <Link to={item.url}  >{item.label}</Link>}
            </div>)}
        </div>
    </div>
}
export default HeaderStaticPage
