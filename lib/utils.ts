import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from 'mongoose'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const connectToDB = async () => {
  const connection = {} as any;

  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO as string);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error)
    throw new Error(error as any);
  }
};