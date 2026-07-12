
export default function Header() {
    return(
        <>
        <header className="w-full flex flex-wrap justify-between items-end border-b border-amber-600 pb-4 gap-2 my-4">
          <div className='w-full text-center'>
            <h1 className="text-lg w-full drop-shadow-[0_0_5px_rgba(6,182,10,0.5)] uppercase text-amber-600 font-semibold">Muscle Manifestation System</h1>
            <p className="text-cyan-500 text-xs uppercase tracking-widest mt-1">Measure Muscle inch by inch</p>
          </div>
        </header>
        <div className=" w-full text-center">
          <h1 className="text-md md:text-xl font-black uppercase text-emerald-100">
            Welcome
            {/* Welcome <br /> {stats.name || 'Initiate'} */}
          </h1>
          <p className="text-[10px] text-amber-400 uppercase tracking-widest">
            System active for your physical registry. 
            <a href='/info' className='cursor-pointor text-white text-xs text-right hover:underline ml-1'>Info</a>
          </p>
          
        </div>
        </>
    );
}