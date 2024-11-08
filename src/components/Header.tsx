import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

export const Head = () => {
  const { user } = useUser();
  return (
    <div className="w-full h-auto">
      <p className="text-4xl text-center">Note App</p>
      <div className="flex flex-row-reverse items-center gap-4">
        <UserButton />
        <p>
          {user?.firstName} {user?.lastName}
        </p>
      </div>
    </div>
  );
};
