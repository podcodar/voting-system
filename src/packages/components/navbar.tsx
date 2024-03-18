import Button from "./Button";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="flex container mx-auto p-4 content-between space-x-10 md:container md:mx-auto">
        <h1 className="text-teal-500 font-bold">Voting System</h1>

        <Button>Create Election</Button>
      </div>
    </div>
  );
}
