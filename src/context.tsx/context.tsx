"use client";
import { notify } from "@/components/toasify";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

interface NotesContextType {
  notes: any[];
  getNote: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<any[]>([]);
  const { user } = useUser();

  const getNote = async () => {
    if (!user?.id) {
      notify("User ID is not available, cannot fetch notes.", "error");
      return;
    }

    try {
      const response = await axios.get("/api/getNote", {
        params: { authorid: user.id },
      });
      setNotes(response.data || []);
    } catch (error) {
      notify("can't get notes", "error");
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getNote();
    }
  }, [user?.id]);

  return (
    <NotesContext.Provider value={{ notes, getNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
