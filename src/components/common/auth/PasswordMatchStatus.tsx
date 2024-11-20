import SmailXIcon from '@/components/common/Icons/Auth/SmailXIcon';
import SmailCheckIcon from '@/components/common/Icons/Auth/SmailCheckIcon';

interface PasswordMatchStatusProps {
  isMatching: boolean;
}

const PasswordMatchStatus: React.FC<PasswordMatchStatusProps> = ({ isMatching }) => {
  return (
    <div className="flex items-center text-xs">
      {isMatching ? (
        <>
          <p className="mr-1 text-secondary-700">비밀번호가 동일합니다.</p>
          <SmailCheckIcon />
        </>
      ) : (
        <>
          <p className="mr-1 text-red-700">비밀번호가 동일하지 않습니다.</p>
          <SmailXIcon />
        </>
      )}
    </div>
  );
};

export default PasswordMatchStatus;
