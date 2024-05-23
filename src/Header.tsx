import Date from "./Date";

export default function Header() {

  return (
    <div
      className="text-secondary lg:text-3xl w-full lg:h-28 bg-main
    flex items-center justify-between px-8 shadow-2xl	"
    >
      <Date />
      <p className=""> Todo List </p>
      <p>C</p>
    </div>
  );
}
