import { Loader } from 'lucide-react';

const Loading = ({ color }) => {
    return (
        <div className="rounded-lg bg-[#252529] px-[4vw] py-[0.7rem]">
            <div className="animate-spin">
                <Loader fill={color} />
            </div>
        </div>
    );
};

export default Loading;
