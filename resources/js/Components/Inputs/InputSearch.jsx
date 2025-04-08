import InputMask from "./InputMask";
import { FaSearch } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function InputSearch({ loading, clickButton, ...props }) {
    return (
        <div className="w-full min-w-[200px]">
            <div className="relative">
                <InputMask
                    {...props} />
                <button
                    className="!absolute right-1 top-7 text-white rounded bg-gray-700 py-1.5 px-2.5 border border-transparent text-center text-lg text-gold-500 transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700"
                    type="button"
                    onClick={clickButton}
                >
                    {
                        !loading ? (<FaSearch />) : (<AiOutlineLoading3Quarters className="animate-spin" />)
                    }
                </button>
            </div>
        </div>
    );

}
