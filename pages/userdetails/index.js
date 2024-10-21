import React, { useEffect, useState } from "react";
import UserDetailsForm from "../../components/autoForm/UserDetailsForm";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import LoginModel from "../../components/models/LoginModel";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModel, handleIsProfile, setLastVisitedUrl } from "../../store/redux/genaralSlice";
import Loader from "../../components/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "reactstrap";
import { PageWrapper } from "../../components/common/PageWrapper/PageWrapper";

const Continuelogin = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isProfile} = useSelector((state) => state.loginStatemodal);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  
  useEffect(() => {
    if (!accessToken || accessToken === "0") {
      console.log('Dispatching lastVisitedUrl:', router.asPath);
      const currentUrl = router.asPath;
      
      setLoginOpen(true);
      setIsLoading(false);
    } else {
      checkUserProfile();
    }
  }, [accessToken]);

  useEffect(() => {
    console.log("profiledata is --> ", profileData);
  }, [profileData]);
  

  const checkUserProfile = async () => {
    try {
      const response = await fetch('https://api.dataplay.co.in/user/get_your_profile/', {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${accessToken}`,
        },
        withCredentials: true
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("data is --> ",data);
      setProfileData(data);
      
      
      // Check if all required fields are filled
      
    
      if (isProfile) {
        setIsLoading(false);
      } else {
        // Profile is incomplete, render the form
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setIsLoading(false);
    }
  };
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  

  if (isLoading) {
    return <Loader/>; // Or a more sophisticated loading component
    <ToastContainer />
  }

  return (
    <>
      
      <LoginModel
        testimonials={[]}
        open={loginOpen}
        onHide={() => {
          setLoginOpen(false);
        }}
      />
      <PageWrapper
        title={`My Profile`}
        subtitle={'Manage Your Personal Information'}
        //subtitle={`In the face of tight and limited job preparation time, this set of selected high-frequency interview problems can help you improve efficiently and greatly increase the possibility of obtaining an offer.`}
      >

      


        {isProfile && profileData ? (
          isEditing ? (
            <>
              <section className="login-user-details">
                  <div className="full-page-background">
                    <div className="content-wrapper">
                      <div className="login-form-container">
                        <Link href="/">
                          <Image src="/logo.svg" alt="Logo" width={168} height={29} />
                        </Link>
                        <h3 className="form-title text-center">
                          Please help us know you a little more
                        </h3>
                        <UserDetailsForm initialData={profileData} />
                      </div>
                    </div>
                  </div>
                </section>
            </>
          ) : (
            <>
              <section className="profile-dashboard">
                <div className="dashboard-container">
                  <div className="dashboard-header hide-on-mobile">
                    <Link href="/">
                      <Image src="/logo.svg" alt="Logo" width={168} height={29} />
                    </Link>
                    <h1>Welcome, {profileData.user.first_name}!</h1>
                  </div>
                  <div className="dashboard-content">
                    <div className="profile-card">
                      <div className="profile-header">
                        <img 
                          src={profileData.profile_pic || "/default-avatar.png"}
                          className="profile-picture"
                          alt="Profile Picture"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "/default-avatar.png";
                          }}
                        />
                        <div className="profile-name">
                          <h2>{`${profileData.user.first_name} ${profileData.user.last_name}`}</h2>
                          <p>{profileData.what_are_you_currently_doing}</p>
                        </div>
                      </div>
                      <div className="profile-body">
                        <div className="info-group">
                          <h3>Contact Information</h3>
                          <p className="email-text"><i className="fas fa-envelope"></i> {profileData.user.email}</p>
                          <p><i className="fas fa-phone"></i> {profileData.mobile_no}</p>
                          <a 
                          href={profileData.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="linkedin-button"
                        >
                          <i className="fab fa-linkedin"></i> LinkedIn Profile
                        </a>
                        </div>
                        <div className="info-group">
                          <h3>Educational Background</h3>
                          <p><strong>College:</strong> {profileData.college_name}</p>
                          <p><strong>Degree:</strong> {profileData.highest_degree_of_study}</p>
                          <p><strong>Year of Study:</strong> {profileData.year_of_study}</p>
                        </div>
                        <div className="info-group">
                          <h3>Personal Information</h3>
                          <p><strong>Hometown:</strong> {profileData.home_town_city}</p>
                          <p><strong>Birthday:</strong> {profileData.birthday}</p>
                          <p><strong>Found us through:</strong> {profileData.how_did_you_find_us}</p>
                        </div>
                        <div className="info-group full-width">
                          <h3>Bio</h3>
                          <p>{profileData.bio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="edit-profile-btn1" onClick={handleEditProfile}>
                    Edit Profile
                  </button>
                </div>
              </section>
            </>
          )
        ) : (
          <>
                  <section className="login-user-details">
                  <div className="full-page-background">
                    <div className="content-wrapper">
                      <div className="login-form-container">
                        <Link href="/">
                          <Image src="/logo.svg" alt="Logo" width={168} height={29} />
                        </Link>
                        <h3 className="form-title text-center">
                          Please help us know you a little more
                        </h3>
                        <UserDetailsForm  initialData={profileData} />
                      </div>
                    </div>
                  </div>
                </section>
          </>
        )}
        </PageWrapper>
      
    </>
    
  );
};

export default Continuelogin;