import { useNotes } from "@/context.tsx/context";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";

export const AddFolder: React.FC<{
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setAdd }) => {
  const [newNote, setNewNote] = useState<string>("");
  const { user } = useUser();
  const { getNote } = useNotes();
  const handleAddFolder = async () => {
    await axios.post("/api/postNote/", {
      name: newNote,
      authorid: user?.id,
    });

    getNote();
    setAdd(false);
    setNewNote("");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <p className="font-semibold text-lg mb-4">Add New Folder</p>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Folder name"
          className="border p-2 rounded-md w-full mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={() => setAdd(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAddFolder}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
          >
            Add Folder
          </button>
        </div>
      </div>
    </div>
  );
};
