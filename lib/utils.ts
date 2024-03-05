import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
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

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => delete currentUrl[key]);

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });

  return badgeCounts;
};
