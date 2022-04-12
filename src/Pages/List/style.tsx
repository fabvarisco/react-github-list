import tw from "tailwind-styled-components";



export const SearchButton = tw.button`
flex 
items-center 
justify-center 
px-4 
border
mr-2
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

export const TextName = tw.h4`
text-gray-400
`;


export const SearchContainer = tw.div`
container
flex
mx-auto`;

export const IconCol = tw.div`
flex-none`;
export const InfoCol = tw.div`
grow`;

export const ButtonCol = tw.div`
flex-none  self-center hidden sm:block`;

export const LoginText = tw.h3`
mb-2`;

export const DotsCol = tw.div`
flex-none 
self-center
sm:hidden
`;

export const DotsButton = tw.div`
absolute
activeButton
-mt-10 
-ml-8 
`;

export const DropdownButton = tw.div`
block 
px-4 
py-2 
text-gray-800 
hover:bg-indigo-500
cursor-pointer
`;

export const Dropdown = tw.div`
item
absolute
z-50
-ml-12
border
bg-white
rounded-lg p-2
`;

export const Pagination = tw.div`
flex
justify-center
m-8
`;
