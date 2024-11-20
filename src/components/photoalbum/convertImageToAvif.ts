// AVIF 형식으로 변환하는 함수
export const convertImageToAvif = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const webpFile = new File([blob], `${file.name.split('.')[0]}.webp`, { type: 'image/webp' });
            resolve(webpFile);
          } else {
            console.warn('WebP 변환 실패, 원본 파일 사용');
            resolve(file);
          }
        },
        'image/webp',
        0.8
      );
    };
    img.onerror = () => {
      console.warn('이미지 로드 실패, 원본 파일 사용');
      resolve(file);
    };
  });
};
