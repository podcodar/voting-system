import Link from "next/link";
import ModalCreateElection from "./HomePage/ModalCreateElection";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-lg">
      <div className="flex container mx-auto p-4 content-between md:container md:mx-auto items-center justify-between">
        <Link href={"/"}>
          <h1 className="text-teal-500 font-bold">Voting System</h1>
        </Link>
        <ModalCreateElection />
      </div>
    </div>
  );
}
