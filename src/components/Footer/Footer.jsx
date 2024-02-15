import React from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';
import BackButtonImg from '../../Assets/Images/back_button.png';
import HomeButtonImg from '../../Assets/Images/home_button.png';
import ProfileButtonImg from '../../Assets/Images/profile_blank.png';

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
      <MDBContainer fluid className='d-flex justify-content-between align-items-center p-3 text-center' style={{ backgroundColor: '#AA222B', height: '100px' }}>
        <a href='../' className='text-reset'>
          <img src={BackButtonImg} alt='Back' style={{ maxHeight: '20%', maxWidth: '20%' }} />
        </a>
        <a href='../' className='text-reset'>
          <img src={HomeButtonImg} alt='Home' style={{ maxHeight: '20%', maxWidth: '20%' }} />
        </a>
        <a href='myjobs' className='text-reset'>
          <img src={ProfileButtonImg} alt='MyJobs' style={{ maxHeight: '17%', maxWidth: '17%' }} />
        </a>
      </MDBContainer>
    </MDBFooter>
  );
}
