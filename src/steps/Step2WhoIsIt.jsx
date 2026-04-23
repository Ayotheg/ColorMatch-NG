import { useEffect, useState } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../components/Button";
import Data from "../data/map";

function Step2WhoIsIt() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

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
        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-200">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User" 
            className="w-full h-full object-cover" 
          />
        </div>
      ),
    });
  }, [setNavbar, navigate]);

  return (
    <div className="flex-1 flex flex-col relative px-6 pt-4 pb-32">
      <div className="flex-1">
        <h1 className="text-4xl font-bold font-button">Who is this room for?</h1>
        <p className="font-body text-base text-gray-500 py-4">We'll tailor your paint durability and finish recommendations based on the inhabitants.</p>
        
        <div className="space-y-3 mt-6">
          {Data.map((item, index) => (
            <Card 
              key={index}
              title={item.title}
              body={item.body}
              img={item.img}
              isSelected={selectedType === index}
              onSelect={() => setSelectedType(index)}
            />
          ))}
        </div>
      </div>
      
      <Button to="/step3-color-in-mind" label="Continue" fixed />
    </div>
  );
}

function Card({title, body, img, isSelected, onSelect}) {
  return (
    <div 
      onClick={onSelect}
      className={`flex gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected 
          ? 'border-primary bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="shrink-0 w-24 h-24">
        <img 
          src={img} 
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{body}</p>
      </div>
    </div>
  );
}

export default Step2WhoIsIt;
