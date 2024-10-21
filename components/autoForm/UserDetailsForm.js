import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { setLoginModel, handleIsProfile, setLastVisitedUrl } from "../../store/redux/genaralSlice";

const UserDetailsForm = ({ initialData }) => {
  const [profilePic, setProfilePic] = useState(initialData?.profile_pic || null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, accessToken } = useSelector((state) => state.auth);
  const getValue = (obj, path, defaultValue = '') => {
    return path.split('.').reduce((acc, part) => {
      return acc && acc[part] !== undefined && acc[part] !== null 
        ? acc[part] 
        : defaultValue;
    }, obj);
  };
  useEffect(() => {
    console.log("initialdata is --> ", initialData);
  }, [initialData]);
  const formik = useFormik({
    enableReinitialize: true,
      initialValues: {
        first_name: getValue(initialData, 'user.first_name'),
        last_name: getValue(initialData, 'user.last_name'),
        email: getValue(initialData, 'user.email'),
        bio: getValue(initialData, 'bio'),
        linkedin: getValue(initialData, 'linkedin'),
        mobile_no: getValue(initialData, 'mobile_no'),
        what_are_you_currently_doing: getValue(initialData, 'what_are_you_currently_doing'),
        college_name: getValue(initialData, 'college_name'),
        highest_degree_of_study: getValue(initialData, 'highest_degree_of_study'),
        year_of_study: getValue(initialData, 'year_of_study'),
        home_town_city: getValue(initialData, 'home_town_city'),
        birthday: getValue(initialData, 'birthday'),
        how_did_you_find_us: getValue(initialData, 'how_did_you_find_us'),
      },
    validationSchema: Yup.object({
      first_name: Yup.string(),
      last_name: Yup.string(),
      email: Yup.string(),
      bio: Yup.string(),
      linkedin: Yup.string().url('Must be a valid URL'),
      mobile_no: Yup.string()
      .required('Required')
      .test('valid-format', 'Invalid phone number format', function(value) {
        if (!value) return false;
        const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
        try {
          const phoneNumber = phoneUtil.parse(value, 'IN'); // Assuming India as default region
          return phoneUtil.isValidNumber(phoneNumber);
        } catch (error) {
          return false;
        }
      }),
      what_are_you_currently_doing: Yup.string().required('Required'),
      college_name: Yup.string().required('Required'),
      highest_degree_of_study: Yup.string().required('Required'),
      birthday: Yup.date()
        .required('Birthday is required'),
      home_town_city: Yup.string().required('Required'),
      how_did_you_find_us: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setFieldError }) => {
      const formData = new FormData();
      console.log( "data submitting -->", formData)
      Object.keys(values).forEach(key => formData.append(key, values[key]));
      if (profilePic instanceof File) {
        formData.append('profile_pic', profilePic);
      }

      try {
        
        const token = accessToken;

        const response = await fetch('https://api.dataplay.co.in/user/complete_your_profile/', {
          method: 'POST',
          headers: {
            'Authorization': `JWT ${token}`,
            
          },
          body: formData,
          withCredentials: true

        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Success:', result);
        if (result){
          const storedUrl = localStorage.getItem('lastVisitedUrl') ;
          localStorage.setItem('isProfile', true);
          dispatch(handleIsProfile(true));
          if (storedUrl && storedUrl !== 'null') {
            router.push(storedUrl);
          } else {
            router.push('/'); 
          }

          toast.success('Profile created successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
        }
        
      } catch (error) {
        console.error('Error:', error); 
      }
      console.log(formData);
    },
  });

  const handleProfilePicChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const RequiredLabel = ({ htmlFor, label }) => (
    <label htmlFor={htmlFor}>
      {label} <span className="required">*</span>
    </label>
  );

  return (
    <div className="user-details-form">
      <ToastContainer/>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <RequiredLabel htmlFor="profile_pic" label="Profile Picture" />
          <div className="avatar-upload">
            <img src={profilePic 
                        ? (typeof profilePic === 'string' ? profilePic : URL.createObjectURL(profilePic)) 
                        : '/default-avatar.png'
                      }  alt="Profile" />
            <input
              id="profile_pic"
              name="profile_pic"
              type="file"
              onChange={handleProfilePicChange}
              accept="image/*"
            />
          </div>
        </div>
        <div className="form-group">
        <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={formik.values.first_name}
            readOnly
            className="read-only-input"
          />
          {formik.touched.first_name && formik.errors.first_name ? (
            <div className="error">{formik.errors.first_name}</div>
          ) : null}
        </div>
        <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={formik.values.last_name}
            readOnly
            className="read-only-input"
            
          />
          {formik.touched.last_name && formik.errors.last_name ? (
            <div className="error">{formik.errors.last_name}</div>
          ) : null}
        </div>
        <div className="form-group">
        <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            readOnly
            className="read-only-input"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bio}
          />
          {formik.touched.bio && formik.errors.bio ? (
            <div className="error">{formik.errors.bio}</div>
          ) : null}
        </div>
        <div className="form-group">
          
          <RequiredLabel htmlFor="linkedin" label="LinkedIn" />
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.linkedin}
          />
          {formik.touched.linkedin && formik.errors.linkedin ? (
            <div className="error">{formik.errors.linkedin}</div>
          ) : null}
        </div>
        <div className="form-group">
          <RequiredLabel htmlFor="mobile_no" label="Mobile Number" />
          <PhoneInput
            country={'in'}
            value={formik.values.mobile_no}
            onChange={(phone) => formik.setFieldValue('mobile_no', phone)}
            inputProps={{
              name: 'mobile_no',
              id: 'mobile_no',
              required: true,
              minLength: 10,
            }}
          />
          {formik.touched.mobile_no && formik.errors.mobile_no ? (
            <div className="error">{formik.errors.mobile_no}</div>
          ) : null}
        </div>
        <div className="form-group">
    
          <RequiredLabel htmlFor="what_are_you_currently_doing" label="What are you currently doing?" />
          <input
            id="what_are_you_currently_doing"
            name="what_are_you_currently_doing"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.what_are_you_currently_doing}
          />
          {formik.touched.what_are_you_currently_doing && formik.errors.what_are_you_currently_doing ? (
            <div className="error">{formik.errors.what_are_you_currently_doing}</div>
          ) : null}
        </div>
        <div className="form-group">
          <RequiredLabel htmlFor="college_name" label="College Name" />
          <input
            id="college_name"
            name="college_name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.college_name}
          />
          {formik.touched.college_name && formik.errors.college_name ? (
            <div className="error">{formik.errors.college_name}</div>
          ) : null}
        </div>
        <div className="form-group">
        
          <RequiredLabel htmlFor="highest_degree_of_study" label="Highest Degree of Study" />
          <input
            id="highest_degree_of_study"
            name="highest_degree_of_study"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.highest_degree_of_study}
          />
          {formik.touched.highest_degree_of_study && formik.errors.highest_degree_of_study ? (
            <div className="error">{formik.errors.highest_degree_of_study}</div>
          ) : null}
        </div>
        <div className="form-group">
              <RequiredLabel htmlFor="year_of_study" label="Year of Study" />
              <select
                id="year_of_study"
                name="year_of_study"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.year_of_study}
              >
                <option value="">Select an option</option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="0">College pass out</option>
              </select>
              {formik.touched.year_of_study && formik.errors.year_of_study ? (
                <div className="error">{formik.errors.year_of_study}</div>
              ) : null}
            </div>
        <div className="form-group">
          <RequiredLabel htmlFor="home_town_city" label="Home Town/City" />
          <input
            id="home_town_city"
            name="home_town_city"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.home_town_city}
          />
          {formik.touched.home_town_city && formik.errors.home_town_city ? (
            <div className="error">{formik.errors.home_town_city}</div>
          ) : null}
        </div>
        <div className="form-group">
          <RequiredLabel htmlFor="birthday" label="Birthday" />
          <input
            id="birthday"
            name="birthday"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthday}
          />
          {formik.touched.birthday && formik.errors.birthday ? (
            <div className="error">{formik.errors.birthday}</div>
          ) : null}
        </div>
        <div className="form-group">
          <RequiredLabel htmlFor="how_did_you_find_us" label="How did you find us?" />
          <select
            id="how_did_you_find_us"
            name="how_did_you_find_us"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.how_did_you_find_us}
          >
            <option value="">Select an option</option>
            <option value="Google">Google</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Friend referred">Friend referred</option>
            <option value="Dataplay reached out">Dataplay reached out</option>
            <option value="College TPO">College TPO</option>
            
          </select>
          {formik.touched.how_did_you_find_us && formik.errors.how_did_you_find_us ? (
            <div className="error">{formik.errors.how_did_you_find_us}</div>
          ) : null}
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default UserDetailsForm;
