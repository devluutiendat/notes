"use client";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import React, { useState } from "react";
import { Content } from "./Content";
import { AddFolder } from "./AddFolder";
import { useNotes } from "@/context.tsx/context";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { notify } from "./toasify";

export const Main = () => {
  const [select, setselect] = useState<number>(0);
  const [add, setAdd] = useState<boolean>(false);
  const { notes, getNote } = useNotes();

  const handlerDeete = async (idNote: string) => {
    try {
      await axios.delete("/api/deleteNote", {
        params: {
          id: idNote,
        },
      });
      getNote();
      notify("delete success", "success");
    } catch (error) {
      notify("can't delete note", "error");
      console.log(error);
    }
  };
  return (
    <div className="border border-b shadow-md w-full h-auto flex">
      <div className="w-1/4 bg-cyan-700 h-auto p-3 rounded-lg">
        <h2 className="text-white font-semibold mb-4 flex items-center">
          Folders
          <MdOutlineCreateNewFolder
            onClick={() => setAdd(true)}
            className="ml-auto text-white p-1 rounded-full hover:bg-cyan-600 text-4xl"
          />
        </h2>
        <div className="space-y-1">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg cursor-pointer text-left flex justify-between
              ${
                select === index
                  ? "bg-amber-300 text-black"
                  : "bg-white text-black"
              }`}
              onClick={() => setselect(index)}
            >
              <p>{note.name}</p>
              <FaTrashAlt onClick={() => handlerDeete(note._id)} />
            </div>
          ))}
        </div>
      </div>
      {select >= 0 && select < notes.length && notes[select] && (
        <Content
          key={notes[select]._id}
          detail={notes[select].detail}
          id={notes[select]._id}
        />
      )}

      {add && <AddFolder setAdd={setAdd} />}
    </div>
  );
};
