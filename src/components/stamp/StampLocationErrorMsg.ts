//가져오기 실패했을때 상황에 따른 에러메세지
export const showErrorMsg = (error: GeolocationPositionError | null | string, setError: (message: string) => void) => {
  if (error instanceof GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError('Geolocation API의 사용 요청을 거부했습니다.');
        break;
      case error.POSITION_UNAVAILABLE:
        setError('위치 정보를 사용할 수 없습니다.');
        break;
      case error.TIMEOUT:
        setError('위치 정보를 가져오기 위한 요청이 허용 시간을 초과했을습니다.');
        break;
      default:
        setError('알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.');
        break;
    }
  } else if (typeof error === 'string') {
    console.error('Error:', error);
  }
};
