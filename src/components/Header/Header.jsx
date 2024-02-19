import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Hamburger from '../../Assets/Images/hamburger.png'
import Brand from '../../Assets/Images/Logo1.jpg'
import './Header.css'
import UserMenu from '../Usermenu'
import { BackgroundChecked1, TextChecked } from '../../pages/Home/HomeStyles'
import SearchBarComp from '../SearchBar'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchBarRec from '../SearchBarRecommend'
import SearchBarTop from '../SearchBarTop'
import useMediaQuery from '../../hooks/MediaQuery'

const Data = [
  {
    id: 1,
    label: 'Beliebte Kategorien',
    value: 1
  },
  {
    id: 2,
    label: 'Empfehlungen',
    value: 2
  },
  {
    id: 3,
    label: 'Top Dienstleister',
    value: 3
  }
]
const Header = ({ show }) => {
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [showImpressum, setShowImpressum] = useState(false); // Zustandsvariable für das Impressum
  const [showNavbar, setShowNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMobile = useMediaQuery('(min-width: 450px)');

  useEffect(() => {
    const token = localStorage.getItem('@storage_Key');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleChange = (event, value) => {
    setSelectedValue(value);
  };

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
    setShowImpressum(false); // Setzen Sie das Impressum auf false, wenn das Hamburger-Menü angezeigt wird
  };

  const toggleImpressum = () => {
    setShowImpressum(!showImpressum);
  };

  return (
    <div className='nav-container'>
      <nav className="navbar">
        <div className="container">
          <div>
            <img src={Brand} className="logo" />
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <img src={Hamburger} />
          </div>

          <div className={`nav-elements ${showNavbar && 'active'}`}>
            <ul>
              {show === 'false' ? <></> :

                <li style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', borderRadius: '8px' }}>

                  <Autocomplete
                    value={selectedValue}
                    onChange={handleChange}
                    options={Data}
                    sx={{ width: 220, zIndex: 1000 }}
                    size='medium'

                    renderInput={(params) => <TextField {...params} label="Suche nach"
                      sx={{
                        "& input": { color: '#000', fontSize: '15px', fontWeight: '300', borderRadius: '8px' },

                      }}
                    />}
                  />
                  {selectedValue && selectedValue.value === 1 ?

                    <SearchBarComp />
                    :
                    selectedValue && selectedValue.value === 2 ?
                      <SearchBarRec />
                      :
                      selectedValue && selectedValue.value === 3 ?
                      <SearchBarTop />
                      :
                      <></>
                  }
                </li>
              }

              <li>
                {/* Button Impressum */}
                <button onClick={toggleImpressum} style={{ marginLeft: '10px', backgroundColor: '#AA222B', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Impressum</button>
              </li>

              <li>
                {/* Impressum */}
                {showNavbar && showImpressum && (
                  <div className="impressum" style={{ maxWidth: '300px', border: '1px solid #ccc', padding: '10px', fontSize: '14px', marginTop: '10px' }}>
                    <p>Willkommen auf ServiceSparrow! Ein Online Dienstleistungsportal für Schüler/innen und Student/innen.</p>
                    <p>CONTACT</p>
                    <p>Wien, W 1220, AUT</p>
                    <p>helpdesk.servicesparrow@gmail.com</p>
                    <p>+43 681 123456</p>
                    <p>+43 681 123456</p>
                    <p>© 2024 Copyright: ServiceSparrow.com</p>
                  </div>
                )}
              </li>

              <li>
                <UserMenu />
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </div>
  )
}










export default Header