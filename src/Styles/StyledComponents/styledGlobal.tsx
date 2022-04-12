import tw from "tailwind-styled-components";

export const Card = tw.div`
flex 
flex-row
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
`;

export const CardCenter = tw.div`
flex 
flex-row
p-5
bg-white
block
mt-5
mr-2.5
ml-2.5
border-l-8
border-white
flex 
justify-center
}
`;

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

export const Tag = tw.a`
rounded-full 
text-gray-500 
bg-gray-200 
font-semibold 
text-sm flex 
align-center 
cursor-pointer 
active:bg-gray-300 
transition 
duration-300 
ease 
w-max 
m-4

`;

export const LanguageIcon = tw.img`
rounded-full
w-9
h-9
max-w-none
`;

export const ProfileImg = tw.img`
w-16
h-16
rounded-full
mr-6
`;

export const UnderlineLink = tw.a`
underline 
flex
items-center
px-3
py-2
`;
export const TagContainer = tw.div`
flex 
flex-wrap 
justify-center 
space-x-2 
items-end
`;

