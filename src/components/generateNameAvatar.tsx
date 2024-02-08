export const GenerateNameAvatar = ({ email }: { email: string }) => {
  return (
    <div className="bg-neutral-300 rounded-full w-[30px] h-[30px] flex justify-center items-center text-white">
      <p>{email.slice(0, 1).toUpperCase()}</p>
    </div>
  );
};
