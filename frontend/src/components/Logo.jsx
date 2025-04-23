import { useNavigate } from "react-router-dom";

export default function Logo() {
    const navigate = useNavigate();

    return (
        <div 
            className="w-[220px] h-screen fixed left-0 top-0 flex items-center justify-center bg-white z-10 cursor-pointer"
            onClick={() => navigate("/")}
        >
            <div className="rotate-[-90deg] origin-center">
                <h1 className="text-[120px] sm:text-[160px] lg:text-[200px] font-bold">
                    <span className="text-[30px] sm:text-[100px] lg:text-[200px] font-bold text-black mr-2">
                        e
                    </span>
                    <span className="text-[#065570]">LP</span>
                    <span className="text-black">fənt</span>
                </h1>
            </div>
        </div>
    )
}
