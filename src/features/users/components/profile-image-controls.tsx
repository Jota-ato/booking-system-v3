import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { getUserInitials } from "@/shared/utils/names";
import { Button } from "@/shared/components/ui/button";
import { Trash } from "lucide-react";

export function ProfileImageControls({
  userImage,
  userName,
}: {
  userImage: string | null;
  userName: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar className="size-25">
        <AvatarImage src={userImage!} />
        <AvatarFallback className="text-3xl">
          {getUserInitials(userName)}
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Change picture
        </Button>
        <Button
          aria-label="Delete profile picture"
          variant="outline"
          size="icon-sm"
        >
          <Trash className="size-4" />
        </Button>
      </div>
    </div>
  );
}
