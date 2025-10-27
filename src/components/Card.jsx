export default function Card({title,children,className=''}){
  return(<div className={`animate-fade border border-cyan-200 rounded-2xl bg-white/90 backdrop-blur p-6 shadow-md hover:shadow-lg transition-all ${className}`}>
    {title && <h2 className='text-xl font-semibold text-cyan-800 mb-3'>{title}</h2>}{children}
  </div>)
}