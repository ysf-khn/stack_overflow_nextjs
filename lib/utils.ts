import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  let output = null;
  let count = 0;
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();

  // Define units and their corresponding milliseconds
  const units = [
    { name: "year", ms: 31536000000 },
    { name: "month", ms: 2628000000 },
    { name: "week", ms: 604800000 },
    { name: "day", ms: 86400000 },
    { name: "hour", ms: 3600000 },
    { name: "minute", ms: 60000 },
    { name: "second", ms: 1000 },
  ];

  // Find the largest unit that fits the time difference
  const unit = units.find((u) => diff >= u.ms);

  if (unit) {
    // Calculate the number of units
    count = Math.floor(diff / unit!.ms);

    // Create the output string
    output = `${count} ${unit!.name}${count > 1 ? "s" : ""}`;
  }
  // Handle situations where time difference is very small
  else if (count === 0 && diff > 0) {
    return "Just now";
  }

  return output + " ago";
};

export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
};

export const formatDate = (date: Date): string => {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Format and join
  return `${month} ${year}`;
};
