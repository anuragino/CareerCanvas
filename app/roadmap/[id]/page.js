'use client'
import React from 'react'
import { useState , useEffect} from 'react';
import { usePathname } from 'next/navigation'
import Navbar from '../../components/Navbar';
import parse from 'html-react-parser';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Skeleton } from "../../components/ui/skeleton";
const page = () => {
    const [data, setData] = useState("")
    const genAI = new GoogleGenerativeAI('AIzaSyCm0jblG8_om51wR9ERHs-pjaOBplRg-Bw');
    console.log(genAI);
    const pathname = usePathname();
    const splitted = pathname.split("/");
    const Branch = (splitted[splitted.length - 1].split("%20").join(' '));

    async function run() {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

        const prompt = `Provide an exhaustive and full proof roadmap in form of html code to become a ${Branch} in India in 2025. Make it very descriptive and lengthy. Provide details about the best coaching institutions, entrance exams to clear(if any), best colleges in India, scholarships offered by the institutes if any. Use tailwind CSS for styling etc. Use h2 tag for main headings and h4 tags for sub headings and heading. Strictly Give me only html code
        with relevant data. Do not give me any other information. Don't add any classname in body tag`;


        // const prompt = `Provide an exhaustive and full proof roadmap in form of html code to become a ${Branch} in India in 2025. Make it very descriptive and lengthy. Provide details about the best coaching institutions, entrance exams to clear(if any), best colleges in India, scholarships offered by the institutes if any. Use tailwind CSS for styling  add good styling so that user can engage with site and feel good. Do not give me any other information`;

        
        console.log("Function Runs");
        const result = await model.generateContent(prompt);
        const response = result.response;
        // console.log(response.candidates[0].content.parts[0].text);
        const text = response.candidates[0].content.parts[0].text;
        console.log(text)
        const splittedtext = text?.split("<body>")[1]?.split("</body>")[0];
        console.log(splittedtext);
        setData(splittedtext);
    }

    useEffect(() => {
        console.log("USE EFFECT RUNS")
        run();

    }, [])



    // const roadmap = localStorage.getItem(Branch)

    return (
        <>
            <Navbar />
            <div className='mt-4 mx-10 px-16'>
                {data?.length>0?<p>{parse(data)}</p>:
            
                <div className="flex flex-col justify-center items-center space-y-3 mt-36">
                    <Skeleton className="h-[250px] w-[500px] rounded-xl" />
                    <div className="space-y-2 ">
                        <Skeleton className="h-4 w-[500px]" />
                        <Skeleton className="h-4 w-[500px]" />
                    </div>
                </div>}
                
                
            </div>

        </>
    )
}

export default page