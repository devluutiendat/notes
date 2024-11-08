"use client";
import { useNotes } from "@/context.tsx/context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosSave } from "react-icons/io";
import { notify } from "./toasify";

interface ContentProps {
  detail: string;
  id: string;
}

export const Content: React.FC<ContentProps> = ({ detail, id }) => {
  const [content, setContent] = useState<string>(detail);
  const { getNote } = useNotes();
  useEffect(() => {
    setContent(detail);
  }, [detail]);

  const handleSave = async () => {
    try {
      await axios.put("/api/updateNote/", {
        id: id,
        detail: content,
      });
      getNote();
      notify("update success", "success");
    } catch (error) {
      notify("can't update", "error");
      console.log(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="m-2 w-3/4 relative">
      <textarea
        className="w-full h-full"
        value={content}
        onChange={handleChange}
      />
      <IoIosSave
        className="absolute top-4 right-4 text-2xl"
        onClick={() => handleSave()}
      />
    </div>
  );
};
