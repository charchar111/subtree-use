// @ts-check
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import LogoWhite from '/svgs/logo_white.svg';

const ForbiddenUser = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //     // 페이지가 로드되면 3초 후 홈으로 리다이렉트
  //     const timer = setTimeout(() => {
  //         navigate('/', { replace: true });
  //     }, 2000);

  //     // cleanup function to clear timer when component unmounts
  //     return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className='error_page_container'>
      <div className='error_page_layout'>
        <div className='error_page_modal forbidden_page_modal'>
          <div className='error_page__header forbidden_page__header'>
            {/* <img src={LogoWhite} /> */}
          </div>

          <div className='error_page__content forbidden_page__content'>
            <p> 접근이 제한된 사용자입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenUser;
