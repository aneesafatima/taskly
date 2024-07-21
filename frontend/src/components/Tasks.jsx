import React from "react";

function Tasks() {
  return (
    <div className="task  w-[650px] px-2 ">
      <h2 className="font-lato font-bold text-3xl mode-items m-6">
        Tackle Today, Triumph Tomorrow.
      </h2>
      <div className="flex h-screen space-x-2">

      <div className="w-1/3 h-full  p-1 rounded-xl border-[1.5px] border-border-color border-dashed">
    <div className="w-full h-10 bg-to-do-gradient rounded-xl text-[16px] font-roboto font-medium text-white text-center leading-10">To do(5)</div>
      <ul className="mt-2 space-y-2">
        <li className="w-full h-40 bg-border-color rounded-xl"></li>
      </ul>
      </div>
      <div className="w-1/3 h-full p-1 rounded-xl border-[1.5px] border-border-color border-dashed">
      <div className="w-full h-10 bg-progress-gradient rounded-xl text-[16px] font-roboto font-medium text-white text-center leading-10">Progress(3)</div>
      <ul className="mt-2 space-y-2">
        <li className="w-full h-40 bg-slate-400 rounded-xl"></li>
      </ul></div>
      <div className="w-1/3 h-full p-1 rounded-xl border-[1.5px] border-border-color border-dashed">
      <div className="w-full h-10 bg-completed-gradient rounded-xl text-[16px] font-roboto font-medium text-white text-center leading-10">Completed(1)</div>
      <ul className="mt-2 space-y-2">
        <li className="w-full h-40 bg-slate-400 rounded-xl "></li>
      </ul></div>
      </div>
    </div>
  );
}

export default Tasks;
