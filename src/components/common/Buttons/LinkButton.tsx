import Link from 'next/link';

interface LinkButtonProps {
  label: string;
  href: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, href, className }) => {
  return (
    <Link href={href} className={`font-bold text-[14px] text-[#00688A] underline ${className || ''}`}>
      {label}
    </Link>
  );
};

export default LinkButton;
