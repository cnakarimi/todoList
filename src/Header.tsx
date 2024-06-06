import Date from "./Date";

export default function Header({ quantity }) {
  return (
    <div
      className="text-third lg:text-3xl w-full lg:h-28 list
    flex items-center justify-between px-8 shadow-2xl	"
    >
      <Date quantity={quantity} />
      <p className=""> Todo List </p>
      <p>C</p>
    </div>
  );
}
