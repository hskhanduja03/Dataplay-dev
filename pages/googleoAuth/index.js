import React, { useState, useEffect, useRef } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../../store/redux/authSlice";
import {  setLoginModel, handleIsProfile, setLastVisitedUrl } from "../../store/redux/genaralSlice";
import axios from "axios";
import { setTokens, clearTokens } from "../../store/redux/authSlice";

export default function GoogleLogin(props) {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const callbackExecuted = useRef(false);
  const lastVisitedUrl = useSelector((state) => state.loginStatemodal.lastVisitedUrl);
  const { user, accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(()=>{
    
    const parameters = window.location.search;
    console.log('Last visited URL from Redux:', lastVisitedUrl);

    if (parameters && !callbackExecuted.current) {
      callbackExecuted.current = true;
      handleCallback(parameters);
    } else if (!parameters) {
      initiateGoogleOAuth();
    }

  }, []);
  
  

  const initiateGoogleOAuth = async() => {
    setLoading(true);

    
    try {
      const redirectURL = window.location.href + "/"
      const response = await axios.get(`https://api.dataplay.co.in/auth/sauth/o/google-oauth2/?redirect_uri=${redirectURL}`, {
        withCredentials: true
      });
      window.location.href=response.data.authorization_url;
      
    } catch (error) {
      console.error("Error handling callback:", error);
    }
  };

  const handleCallback = async (parameters) => {
    if (isSubmitting) {
      console.log("Submission already in progress, skipping.");
      return;
    }
    setIsSubmitting(true);
    setLoading(true);
    const url = `https://api.dataplay.co.in/auth/sauth/o/google-oauth2/${parameters}`;
    

    try {
      const response = await axios.post(url, null, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      });
    

      const { access: accessToken, refresh: refreshToken, user: user } = response.data;
       if (accessToken && refreshToken) {
         
         localStorage.setItem('accessToken', accessToken);
         localStorage.setItem('refreshToken', refreshToken);
         localStorage.setItem('loginModel', true)
         const storedUrl = localStorage.getItem('lastVisitedUrl') ;
         console.log('Stored URL:', storedUrl);
         dispatch(setTokens({ accessToken, refreshToken }));
        dispatch(setLastVisitedUrl(storedUrl));
        dispatch(setLoginModel(true));
        router.push(storedUrl || "/");
        localStorage.removeItem('storedUrl');

      
        

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
      
          const profileData = await response.json();
          console.log("get response", profileData);
      
          if (profileData.bio) {
            dispatch(handleIsProfile(true));
            localStorage.setItem('isProfile', true);
            
          } else {
            dispatch(handleIsProfile(false));
            localStorage.setItem('isProfile', false);
            try {
              router.push(storedUrl || "/");
            } catch (error) {
              console.error('Navigation error:', error);
              router.push("/"); // Fallback to userdetails page if there's an error
            }
          }
        } catch (error) {
          console.error('Error checking user profile:', error);
          // Handle the error appropriately
        }
       }
      else {
        console.error("Login failed: tokens not found in response");
      }
      
      
    } catch (error) {
      console.error("Error handling callback:", error);
    } 
    
   };

  
  

   const checkUserProfile = async (accessToken) => {
    
  };

  return loading && <Loader />;
}
