
interface AvatarProps {
  name?: string;
  size?: "sm" | "md" | "lg";
}

const Avatar = ({ name = "User", size = "md" }: AvatarProps) => {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const initial = name.trim().charAt(0).toUpperCase() || "U";

  return (
    <div
      aria-label={name}
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full bg-[#064e3b] font-semibold text-white ring-2 ring-[#d1fae5]`}
    >
      {initial}
    </div>
  );
};

export default Avatar;
