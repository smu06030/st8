import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface SocialLoginButtonProps {
  provider: 'google' | 'kakao';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const SocialLoginButton = ({ provider, onClick }: SocialLoginButtonProps) => {
  const imageUrl = provider === 'google' ? '/images/google-icon.png' : '/images/kakao-icon.png';
  const altText = provider === 'google' ? 'Google Login' : 'Kakao Login';

  const buttonClassName =
    provider === 'google'
      ? 'shadow-md h-[50px] w-[50px] rounded-full bg-white p-3'
      : 'shadow-md h-[50px] w-[50px] rounded-full bg-[#FEE500] p-3';

  return (
    <button onClick={onClick} className={buttonClassName}>
      <Image src={imageUrl} alt={altText} width={50} height={50} className="rounded-full" />
    </button>
  );
};

export default SocialLoginButton;
