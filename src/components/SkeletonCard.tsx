export const SkeletonCard = () => {
    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 animate-pulse h-[450px] flex flex-col">
            {/* Image Placeholder */}
            <div className="h-[340px] bg-gray-700 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skeleton-shimmer"></div>
            </div>

            {/* Content Placeholder */}
            <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>

                <div className="mt-auto flex justify-between items-center pt-2">
                    <div className="h-6 bg-gray-700 rounded w-20"></div>
                    <div className="h-8 bg-gray-700 rounded-full w-8"></div>
                </div>
            </div>
        </div>
    );
};
