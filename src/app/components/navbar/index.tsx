export function Navbar() {
    return (
    <div className="w-[100] px-6 flex justify-between p-[10px] mb-[10px] bg-[#fff] h-[70px] mt-0">
      <div className="flex">
        <a
          href="#"
          className="content-center"
          title="Sing Out"
          // onClick={() => {}}
        ></a>
        <div className="content-center mx-2">
          <h1 className="font-bold">Arithmetic Calculator</h1>
        </div>
      </div>

      <div className="relative">
        <a
          className="bg-white block flex hover:text-gray-500"
         // onClick={() => {}}
        >
          <p className="content-center mr-2  ">
            Hi! <strong>user</strong>
          </p>
          
        </a>
      </div>
    </div>
  );
}
