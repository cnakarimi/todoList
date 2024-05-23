import { getCurrentDate } from "./utils";

const currentDate = getCurrentDate();

const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export default function Date() {
  return (
    <div>
      <div>{`${currentDate[0]}, ${
        currentDate[1] + nthNumber(+currentDate[1])
      }`}</div>
      <p className="text-base pt-2">3 Active Tasks</p>
    </div>
  );
}
