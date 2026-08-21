export function AccountDetails({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  return (
    <div className="flex-1 flex flex-col gap-5 md:border-l border-border md:pl-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-medium text-sm">Name</span>
        <span className="w-full h-8 px-2.5 py-1 border border-border rounded-md text-base">
          {userName}
        </span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-medium text-sm">Email</span>
        <span className="w-full h-8 px-2.5 py-1 border border-border rounded-md text-base">
          {userEmail}
        </span>
      </div>
    </div>
  );
}
