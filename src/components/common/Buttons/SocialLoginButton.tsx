import Image from 'next/image';

interface SocialLoginButtonProps {
  onLogin: (provider: 'google' | 'kakao') => void;
}

const SocialLoginButton = ({ onLogin }: SocialLoginButtonProps) => {
  const providers = [
    { provider: 'google', imageUrl: '/images/auth/google-icon.png', alt: 'Google Login', bgColor: 'bg-white' },
    { provider: 'kakao', imageUrl: '/images/auth/kakao-icon.png', alt: 'Kakao Login', bgColor: 'bg-[#FEE500]' }
  ];

  return (
    <div className="mt-6 flex justify-center space-x-4">
      {providers.map(({ provider, imageUrl, alt, bgColor }) => (
        <button
          key={provider}
          onClick={(e) => onLogin(provider as 'google' | 'kakao')}
          className={`shadow-md h-[50px] w-[50px] rounded-full ${bgColor} p-3`}
        >
          <Image src={imageUrl} alt={alt} width={50} height={50} className="rounded-full" />
        </button>
      ))}
    </div>
  );
};

export default SocialLoginButton;
