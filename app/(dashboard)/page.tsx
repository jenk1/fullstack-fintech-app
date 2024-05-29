import { UserButton} from "@clerk/nextjs";
import {User} from "lucide-react";

export default function Home() {
  return (
      <div>
        <UserButton afterSignOutUrl="/" />
        <p>This is an authenticated route</p>
      </div>
  );
}
