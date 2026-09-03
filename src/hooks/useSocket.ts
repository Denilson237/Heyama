"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { ObjectItem } from "@/types/object";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export function useSocket(
  onObjectCreated?: (newObject: ObjectItem) => void,
  onObjectDeleted?: (deletedId: string) => void,
  onObjectLiked?: (data: { id: string; likesCount: number }) => void
) {
  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("objectCreated", (newObject: ObjectItem) => {
      if (onObjectCreated) onObjectCreated(newObject);
    });

    socket.on("objectDeleted", (deletedId: string) => {
      if (onObjectDeleted) onObjectDeleted(deletedId);
    });

    socket.on("objectLiked", (data: { id: string; likesCount: number }) => {
      if (onObjectLiked) onObjectLiked(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [onObjectCreated, onObjectDeleted, onObjectLiked]);
}