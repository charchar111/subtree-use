import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import LogoWhite from '/svgs/logo_white.svg';

const NotFound404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 로드되면 3초 후 홈으로 리다이렉트
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);

    // cleanup function to clear timer when component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='error_page_container'>
      <div className='error_page_layout'>
        <div className='error_page_modal'>
          <div className='error_page__header'>
            {/* <img src={LogoWhite} /> */}
            <h1 className='error_page__title'>페이지를 찾을 수 없습니다.</h1>
          </div>

          <div className='error_page__content'>
            <p>잠시 후 홈으로 리다이렉트됩니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
