
export default function GlowingEyes() {
    return (
        <>
            <div className="relative flex flex-col items-center justify-center">
                {/* Glowing Eyes */}
                <div className="absolute top-1/2 flex gap-2">
                    <div
                        className="
      w-5.5 h-1 rounded-full transform rotate-6
      bg-amber-300
      animate-pulse border border-amber-400 blur-xs
      shadow-[0_0_8px_#6ee7b7,0_0_18px_#34d399,0_0_35px_#10b981,0_0_60px_#09e69c]
    "
                    />
                    <div
                        className="
      w-5.5 h-1 rounded-full transform -rotate-6
      bg-amber-300
      animate-pulse border border-amber-400 blur-xs
      shadow-[0_0_8px_#6ee7b7,0_0_18px_#34d399,0_0_35px_#10b981,0_0_60px_#09e69c]
    "
                    />
                </div>

                {/* Silhouette Body (The Aura Figure) */}
                <div className="relative w-16 h-24 opacity-80 mb-5 ">
                    {/* Head */}
                </div>

                {/* Aura Pulse Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-amber-400/50 animate-pulse blur-xl" />
                    <div className="absolute w-24 h-24 rounded-full border border-amber-400/20 animate-pulse blur-xl" />
                    <div className="absolute w-29 h-29 rounded-full border border-amber-400/50 animate-pulse blur-xl" />
                </div>
            </div>
        </>
    )
}