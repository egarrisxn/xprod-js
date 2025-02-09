export const getUrlMetadata = async (url) => {
  const fallbackFaviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`;
  try {
    const response = await fetch(`/metadata`, {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    const { title, favicon } = await response.json();
    return { title, favicon };
  } catch (error) {
    console.error(error);
    return { title: url, favicon: fallbackFaviconUrl };
  }
};

export const calculateStreak = (completedDays) => {
  if (!completedDays.length) return 0;
  const sortedDays = [...completedDays].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  let streak = 0;
  let prevDate = new Date(sortedDays[0]);
  for (const day of sortedDays) {
    const currentDate = new Date(day);
    const difference =
      (prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
    if (difference === 1) {
      streak++;
    } else if (difference > 1) {
      break;
    }
    prevDate = currentDate;
  }
  return streak + 1;
};

export const groupDaysByMonth = (days) => {
  const grouped = {};
  days.forEach((day) => {
    const month = new Date(day).toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });
    if (!grouped[month]) {
      grouped[month] = [];
    }
    grouped[month].push(day);
  });
  return grouped;
};

export const getLast365Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const dayName = day.toLocaleString("en-US", { weekday: "short" });
    const monthName = day.toLocaleString("en-US", { month: "short" });
    days.push(
      `${dayName}, ${day.getDate()} ${monthName}, ${day.getFullYear()}`
    );
  }
  return days;
};

// export const getPreviousDay = (date) => {
//   const currentDate = new Date(date);
//   currentDate.setDate(currentDate.getDate() - 1);
//   return currentDate.toISOString().split("T")[0];
// };
