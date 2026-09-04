"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ObjectItem } from "@/types/object";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export function useSocket(
  onObjectCreated?: (newObject: ObjectItem) => void,
  onObjectDeleted?: (deletedId: string) => void,
  onObjectLiked?: (data: { id: string; likesCount: number }) => void
) {
  // Conserver les références des callbacks pour éviter de recréer le socket
  const callbacksRef = useRef({ onObjectCreated, onObjectDeleted, onObjectLiked });

  useEffect(() => {
    callbacksRef.current = { onObjectCreated, onObjectDeleted, onObjectLiked };
  }, [onObjectCreated, onObjectDeleted, onObjectLiked]);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });

    socket.on("objectCreated", (newObject: ObjectItem) => {
      callbacksRef.current.onObjectCreated?.(newObject);
    });

    socket.on("objectDeleted", (deletedId: string) => {
      callbacksRef.current.onObjectDeleted?.(deletedId);
    });

    socket.on("objectLiked", (data: { id: string; likesCount: number }) => {
      callbacksRef.current.onObjectLiked?.(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}