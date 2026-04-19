"use client"
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";

const homeData = [
  {
    greeting: "Welcome!",
    intro: "I'm a web developer from Lagos, a city in Nigeria",
    img: "/img/civic.jpg",
    paragraph: "Over some years, understanding programming principles and practicality, a worthwhile journey with will to build products, advance in production environments, tools & resources for better resolutions, working use cases. With focus on JavaScript and its Next.js framework for research & development to deployment protocols"
  }
]

export default function Home() {
  return (
    <PageWrapper>
      {homeData.map((data) => (
        <div 
          key={data.greeting} 
          className="container mx-auto max-w-3xl p-8"
        >
          <div>
            <h3 className="text-gray-700 font-bold text-2xl py-4">{data.greeting}</h3>
            <p className="py-4 font-normal text-lg">{data.intro}</p>
          </div>
          
          <div 
            className="relative w-full h-56 md:h-84 py-4 overflow-hidden rounded-xl"
          >
            <Image
              width={750}
              height={250}
              src={data.img}
              alt="Image of Lagos Landmark"
              className="object-cover transition-transform duration-700 hover:scale-105"
              quality={100}
              loading="lazy"
              placeholder="blur"
              blurDataURL={data.img}
            />
          </div>
          
          <div 
            className="py-8"
          >
            <p className="leading-relaxed">
              {data.paragraph}
            </p>
          </div>
        </div>
      ))}
    </PageWrapper>
  );
}
