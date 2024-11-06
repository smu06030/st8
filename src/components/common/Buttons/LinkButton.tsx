import Link from 'next/link';

interface LinkButtonProps {
  text: string;
  href: string;
  className?: string;
}

const LinkButton = ({ text, href, className }: LinkButtonProps) => {
  return (
    <Link href={href} className={`text-sm font-semibold leading-snug text-secondary-800 underline ${className || ''}`}>
      {text}
    </Link>
  );
};

export default LinkButton;
