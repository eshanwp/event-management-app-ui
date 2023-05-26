import { FC } from "react";
import { heroImg } from "../../assets/images";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
     return (
          <div id="hero" className="section relative z-0 py-16 md:pt-32 md:pb-20 bg-gray-50">
               <div className="container xl:max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap flex-row -mx-4 justify-center">
                         <div className="flex-shrink max-w-full px-4 sm:px-12 lg:px-18 w-full sm:w-9/12 lg:w-1/2 self-center">
                              <img src={heroImg} className="w-full max-w-full h-auto" alt="creative agency" />
                         </div>
                         <div className="flex-shrink max-w-full px-4 w-full md:w-9/12 lg:w-1/2 self-center lg:pr-12">
                              <div className="text-center lg:text-left mt-6 lg:mt-0">
                                   <div className="mb-12">
                                        <h1 className="text-4xl leading-normal text-black font-bold mb-4">
                                             Event Management
                                             <br />
                                             <span
                                                  data-toggle="typed"
                                                  data-options='{"strings": ["Online Marketing", "Web Design", "Mobile Apps", "Brand Identity", "Social Content"]}'></span>
                                        </h1>
                                        <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">
                                             In publishing and graphic design, Lorem ipsum is a placeholder text
                                             commonly used to demonstrate the visual form of a document
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};
export default Home;
