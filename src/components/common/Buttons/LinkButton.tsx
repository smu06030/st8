import Link from 'next/link';

interface LinkButtonProps {
  text: string;
  href: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ text, href, className }) => {
  return (
    <Link href={href} className={`font-bold text-[14px] text-[#00688A] underline ${className || ''}`}>
      {text}
    </Link>
  );
};

export default LinkButton;
