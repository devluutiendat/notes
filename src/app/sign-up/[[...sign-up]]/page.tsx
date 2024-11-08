import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  return (
    <div className="flex justify-center">
      <SignUp />
    </div>
  );
}
