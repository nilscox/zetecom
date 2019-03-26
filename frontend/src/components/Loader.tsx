import React from 'react';

const Loader = ({ size = 'big' }: { size?: 'small' | 'medium' | 'big' }) => {
 const r = {
   small: 8,
   medium: 18,
   big: 24,
 }[size];

 const h = {
   small: 30,
   medium: 90,
   big: 140,
 }[size];

 return (
   <div style={{ height: h, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
     <svg width={r * 2 + 2} height={r * 2 + 2} viewBox={`0 0 ${r * 2 + 2} ${r * 2 + 2}`} xmlns="http://www.w3.org/2000/svg" stroke="#999">
       <g fill="none" fillRule="evenodd">
         <g transform="translate(1 1)" strokeWidth="2">
           <circle strokeOpacity=".7" cx={r} cy={r} r={r} />
           <path d={`M ${2 * r} ${r} c 0 ${-r / 2} ${-r / 2} ${-r} ${-r} ${-r}`}>
             <animateTransform
               attributeName="transform"
               type="rotate"
               from={`0 ${r} ${r}`}
               to={`360 ${r} ${r}`}
               dur="0.8s"
               repeatCount="indefinite"
             />
           </path>
         </g>
       </g>
     </svg>
   </div>
 );
};

export { Loader };