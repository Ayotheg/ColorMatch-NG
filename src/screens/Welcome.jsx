import "../index.css"
import {Link} from "react-router-dom"
import { ArrowRight } from "lucide-react";


export default function Welcome() {
  return (
    <div className="flex-1 flex flex-col items-start justify-start relative overflow-hidden h-full min-h-[80vh]">
      <div className="bg-gradient-blob"></div>
      
      <div className="pillars-container">
        <div className="pillar pillar-left"></div>
        <div className="pillar pillar-middle"></div>
        <div className="pillar pillar-right"></div>
      </div>

      <h1 className="font-button text-gray-500 text-xs bg-green-300 rounded-lg p-1 font-bold px-2 absolute top-10 left-10 z-10">NIGERIAN CRAFTMANSHIP</h1>
      <h1 className="text-6xl font-bold absolute top-24 left-6 z-10">Pure<span className="text-primary font-title"> Tone.</span></h1>
      <p className="font-heading text-gray-600 absolute top-44 left-7 text-lg z-10 w-3/4 font-medium">Find your perfect paint color <br /> in seconds</p>


      <div className="square flex gap-35 relative z-10 mt-70 pl-8">
        <div className="square-item bg-white w-40 h-40 rounded-4xl"><h4 className="font-button font-normal absolute top-32 text-xs left-12 text-gray-400 ">CLAY EARTH</h4><div className="square-item bg-primary w-35 h-25 z-40 rounded-3xl relative top-5 left-2"></div></div>
        <div className="relative right-30 top-30">
        <div className="square-item bg-white w-40 h-40 rounded-4xl"><h4 className="font-button font-normal absolute top-32 text-xs left-18 text-gray-400">SAVANNAH GREEN</h4><div className="square-item bg-emerald-800  w-35 h-25 z-40 rounded-3xl relative top-5 left-2"></div></div>
          </div>
      </div>
      <Link to="" className="bg-primary text-white rounded-4xl px-28 flex py-4 fixed bottom-10 font-button left-6 font-medium">Match my Color <ArrowRight /></Link>
    </div>
  );
}
