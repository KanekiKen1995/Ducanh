import React from 'react';
import { HeaderStaticPage } from '../components/Header'
import { Footer } from '../components/Footer'

const StaticPage = ({children}) => {
    return <div>
        <HeaderStaticPage />
            {children}
        <Footer />
    </div>
}
export default StaticPage