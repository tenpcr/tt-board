import { DateTime } from "luxon";

const monthsShort: Record<string, string[]> = {
  th: [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ],
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

const monthsFull: Record<string, string[]> = {
  th: [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getDate = (
  datetime: string | null,
  lang: "en" | "th" = "en",
  type: "short" | "dot" = "short"
): string => {
  if (datetime !== null) {
    const dt = DateTime.fromISO(datetime);
    const f = type === "dot" ? "LLL d. yyyy" : "LLL d, yyyy";

    if (lang === "th") {
      return `${dt.get("day")} ${
        type === "short"
          ? monthsShort[lang][dt.get("month") - 1]
          : monthsFull[lang][dt.get("month") - 1]
      } ${dt.toFormat("yyyy", { outputCalendar: "buddhist" })}`;
    }
    return dt.toFormat(f);
  } else {
    return "-";
  }
};

export const getTime = (time: string, lang: "en" | "th"): string => {
  let hours = Number(DateTime.fromISO(time).toFormat("HH"));

  if (lang === "en" && hours > 12) {
    hours = hours - 12;
  } else if (lang === "en" && hours === 0) {
    hours = 12;
  }

  return DateTime.fromISO(time).toFormat(
    `${hours}:mm ${lang === "en" ? "a" : ""}`
  );
};

export const getDateTime = (
  datetime: string | null,
  lang: "en" | "th" = "en",
  type: "short" | "dot" = "short"
): string => {
  if (datetime !== null) {
    return `${getDate(datetime, lang, type)} ${getTime(datetime, lang)}`;
  } else {
    return "-";
  }
};
