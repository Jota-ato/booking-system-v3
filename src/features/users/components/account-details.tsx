export function AccountDetails({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  return (
    <div className="flex-1 flex flex-col gap-2 md:border-l border-border md:pl-6">
      <div className="flex flex-col items-start gap-2">
        <span>Name</span>
        <span className="w-full px-4 py-2 border border-border rounded-md">
          {userName}
        </span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span>Email</span>
        <span className="w-full px-4 py-2 border border-border rounded-md">
          {userEmail}
        </span>
      </div>
    </div>
  );
}
