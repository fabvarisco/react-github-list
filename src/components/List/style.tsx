import tw from "tailwind-styled-components";

export const Button = tw.button`
bg-white
hover:bg-gray-100
text-gray-800
font-semibold
py-2
px-2
border
border-gray-400
rounded
shadow
mx-4
content-center
`;

export const TextField = tw.input`
focus:ring-indigo-500 
focus:border-indigo-500 
block
pl-7 
pr-12 sm:text-sm 
border-gray-300 
h-8
ml-2
w-full
border-none
`;

export const Icon = tw.img`
w-16
h-16
rounded-full
mr-6
`;

export const TextName = tw.h4`
text-gray-400
`;

export const Card = tw.div`
p-5
bg-white
block
mt-5
mr-2.5
ml-2.5
border-l-8
border-white
flex 
hover:border-l-8
hover:border-indigo-600
}
`