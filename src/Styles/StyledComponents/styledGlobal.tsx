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