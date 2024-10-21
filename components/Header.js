import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoginModel from "./models/LoginModel";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModel } from "../store/redux/genaralSlice";
import { usePathname } from "next/navigation";
import Logo from "./Logo/logo";
import Button from "../components/ui/Button";
import NavList from "./common/Navbar/NavList";
import { setTokens, clearTokens } from "../store/redux/authSlice";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [token, setToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const toggleLoginModal = useSelector((state) => state.general);
  const { user, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const lastVisitedUrl = useSelector((state) => state.loginStatemodal.lastVisitedUrl);

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const path = usePathname();

  


  useEffect(() => {
    const fetchProfile = async () => {
      if (accessToken) {
        try {
          const response = await fetch('https://api.dataplay.co.in/user/get_your_profile/', {
            method: 'GET',
            headers: {
              'Authorization': `JWT ${accessToken}`,
            },
            withCredentials: true
          });

          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
          } else {
            console.error('Failed to fetch profile data');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, [accessToken]);


  useEffect(() => {
    

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('isProfile')
    localStorage.removeItem('loginModel')
    localStorage.removeItem('lastVisitedUrl')
    dispatch(clearTokens());
    window.location.href = "/";
  };

  return (
    <>
      <header className="main-header">
        <div className="custom-container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-logo">
              <button
                type="button"
                onClick={handleClick}
                className={`menu-bar${isActive ? " slidebar-on" : ""}`}
              ></button>
              <Logo />
            </div>
            <div className="d-flex align-items-center">
              <div className="nav-menus d-flex align-items-center">
                <NavList
                  user={user}
                  isActive={isActive}
                  handleClick={handleClick}
                />
              </div>
              <div className="header-btn-box d-flex align-items-center">
                {accessToken ? (
                  <div className="user-menu-container" ref={dropdownRef}>
                    <Button 
                      onClick={() => {
                        setDropdownOpen(!dropdownOpen);
                      }}
                      className="user-profile-button"
                    >

                      <Image
                        src={ profileData?.profile_pic || '/default-avatar.png' }
                        alt="profile-img"
                        width={40}
                        height={40}
                        className="rounded-circle"
                        style={{
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <span>{profileData?.user?.first_name || 'Welcome!'}</span>
                    </Button>
                    {dropdownOpen && (
                      <div className="user-menu-dropdown">
                        <Link href="/userdetails">
                          <Button className="dropdown-option">My Profile</Button>
                        </Link>
                        <Button onClick={logOut} className="dropdown-option">Log Out</Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    className="btn-custom header-btn"
                    onClick={() => setOpen(true)}
                  >
                    Log in /Sign up
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <LoginModel onHide={() => setOpen(false)} open={open} />
    </>
  );
};

export default Header;