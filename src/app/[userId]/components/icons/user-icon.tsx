type UserCircleOutlineProps = {
  size: string;
};

export const UserIcon = ({ size }: UserCircleOutlineProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m0 0a9 9 0 0 0 5-1.5a4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5a9 9 0 0 0 5 1.5m3-11a3 3 0 1 1-6 0a3 3 0 0 1 6 0"
    />
  </svg>
);
