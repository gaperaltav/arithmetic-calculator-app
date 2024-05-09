import AdditionForm from "./components/additionForm";
import { Navbar } from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative w-64">
        <label htmlFor="operations">Operations:</label>
        <select
          id="operations"
          className="ml-5 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>- Select Operation -</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
      <main className="w-100">
        <AdditionForm />
      </main>
    </>
  );
}
