'use client'

import ApiComponent from '../components/coinList/route';
import FooterComponent from '../components/footer/footer';
import NavComponent from '../components/navbar/navbar';

const HomeComponent: React.FC = () => {


    return (
        <div >
            <NavComponent />

            <ApiComponent />
                
           
           

            <FooterComponent />
        </div>    
    )
}

export default HomeComponent
