"use client";
import '@/styles/globals.css'


import React, { useState } from 'react'


const Home = () => {

    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState("");

    const generateResponse = async (evt) => {
        evt.preventDefault();
        
        try {
          setResponse("");
          console.log("Getting response from OpenAI...");
          setIsLoading(true)
  
          const response = await fetch("/api/route", {
            method: "POST",
            headers: {
                       "Content-Type": "application/json",
                      },
            body: JSON.stringify(prompt),
              });
      
          const data = await response.json();
          setResponse(data.text);
        }catch(err){
          console.error(err.stack);
        }finally{
          setIsLoading(false)};
    }
      
  return (
    <section 
        className="w-full flex-center flex-center flex-col"
    >
        <span className="green_gradient head_text text-center pt-20">
            JasperAI
        </span> 
        <br className="max-md:hidden" />
        <p className="desc text-center text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis praesentium magni adipisci maiores excepturi hic sit, aliquid ex culpa placeat necessitatibus dolore laudantium ad fugit. Asperiores, cupiditate consequuntur. Repellendus, veniam.
        </p>

        <form 
            action="" 
          //  onSubmit={generateResponse} 
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
            <div htmlFor="">
                <span className="font-satoshi font-semibold text-base text-gray-700">
                We'll summarize any lengthy text you enter for you.
                </span>

                <textarea
                    type="text" 
                    // value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="form_input" 
                    style={{width: "100%", height: "100px"}}
                    required
                    placeholder="send a message."
                    onKeyDown={e => e.key === 'Enter' ? generateResponse(): null}
                />
                <button 
                    className="px-5 py-1.5 mt-3 text-sm outline_btn rounded-full text-white"
                    type='submit'
                    onClick={generateResponse}
                    // disabled={!prompt}
                    >
                        summarize
                </button>
            </div>
        </form>
      <div 
          htmlFor=""
          className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism p-10'
          >
            <div >
                  <div>
                  {isLoading ? (
                    <div>Waiting for response ...</div>
                  ) : (
                    <div className='form_input'>
                          {response}
                    </div>
                  )}
                </div>
            </div>
      </div>
        
    </section>
  )

}

export default Home
