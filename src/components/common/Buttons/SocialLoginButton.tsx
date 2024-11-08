import Image from 'next/image';

interface SocialLoginButtonProps {
  provider: 'google' | 'kakao';
  onClick: () => void;
  altText: string;
  imageUrl: string;
}

const SocialLoginButton = ({ onClick, altText, imageUrl }: SocialLoginButtonProps) => (
  <button onClick={onClick} className="shadow-md h-[50px] w-[50px] rounded-full bg-white p-3">
    <Image src={imageUrl} alt={altText} width={50} height={50} className="rounded-full" />
  </button>
);

export default SocialLoginButton;

//소셜로그인 버튼 분리
