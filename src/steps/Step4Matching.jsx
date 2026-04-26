import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share, Circle, Sparkle,LayoutGrid , Sparkles, Waves} from "lucide-react";
import Button from "../components/Button";

export default function Step4Matching() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();

  useEffect(() => {
    setNavbar({
      left: (
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
      ),
      center: (
        <div className="flex items-center gap-1">
          <span className="font-title font-bold text-primary text-sm tracking-tight">ColorMatch</span>
          <span className="font-title font-bold text-primary text-sm tracking-tight">NG</span>
        </div>
      ),
      right: (
        <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors">
          <Share size={18} className="text-gray-700" />
        </button>
      ),
    });
  }, [setNavbar, navigate]);

  return (
    <div className="flex-1 flex flex-col relative px-6 pt-4 pb-32">
      <div className="flex-1">
        <h1 className="text-5xl font-heading font-semibold px-1">What type of <br /> <span className="text-primary font-title">paint finish</span> do <br /> you want ?</h1>
      <p className="text-gray-500 text-base py-4 px-2">Choose the texture and sheen that bests <br />
         fits your environment and lifestyle</p>
      </div>

      <div className="card py-5">
      <div className="button-list bg-white px-5 py-2  leading-6 font-button rounded-4xl text-left ">
        <div className="select block align-left relative bottom-2">
           <span className="text-primary relative left-72 top-5"><Circle /></span>
              <h1 className="font-bold mb-1 text-xl flex gap-2"> <span className="text-amber-900"><Waves /></span>Emulsion </h1>
                <h2 className="font-medium font-heading text-amber-900">Standard/Matte Finish</h2>
                   <p className="font-body text-gray-500 text-sm mb-2 mt-1">Perfect for living rooms and bedrooms. <br /> Hides walls imperfection beautifully</p>
                    </div>
                       </div>
                        </div>
      <div className="card-2 py-5 relative left-1 pl-2">
      <div className="button-list bg-gray-200 px-5 py-2  leading-6 font-button rounded-4xl text-left ">
        <div className="select block align-left relative bottom-2">
           <span className="text-primary relative left-72 top-5"><Circle /></span>
              <h1 className="font-bold mb-1 text-xl flex gap-2"><span className="text-emerald-700"><Sparkles /></span>Satin </h1>
                <h2 className="font-medium font-heading text-emerald-700">Smooth/Wipeable</h2>
                   <p className="font-body text-gray-500 text-sm mb-2 mt-1">Durability with a soft glow. Great for kitchens  <br />and high traffic corridors</p>
                </div>
                   </div>
                     </div>
      <div className="card-3 py-5 pr-2">
      <div className="button-list bg-white px-5 py-2  leading-6 font-button rounded-4xl text-left ">
        <div className="select block align-left relative bottom-2">
           <span className="text-primary relative left-72 top-5"><Circle /></span>
              <h1 className="font-bold mb-1 text-xl flex gap-2"><span className="text-stone-800"><LayoutGrid /></span>Texcoat </h1>
                <h2 className="font-medium font-heading text-stone-800">Textured Outdoor</h2>
                   <p className="font-body text-gray-500 text-sm mb-2 mt-1">Rugged and weather-resistant. Ideal for Nigerian exterior facades</p>
                    </div> 
                       </div>
                          </div>
              <div className="card-4 py-5 pl-2" >
              <div className="button-list bg-gray-200 px-5 py-2  leading-6 font-button rounded-4xl text-left ">
                <div className="select block align-left relative bottom-2">
                  <span className="text-primary relative left-72 top-5"><Circle /></span>
                      <h1 className="font-bold mb-1 text-xl flex gap-2"><span className=" text-blue-600"><Sparkle /></span>Gloss </h1>
                        <h2 className="font-medium font-heading text-blue-600">Shiny / Bold</h2>
                          <p className="font-body text-gray-500 text-sm mb-2 mt-1">High-reflectivity finish. Best for wood, metal, and feature details.</p>
                           </div>
                               </div>
                                  </div>
      
      <Button to="/step5-paint-type" label="Continue" fixed />
    </div>
  );
}
