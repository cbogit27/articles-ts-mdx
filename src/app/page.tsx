"use client"
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import { motion } from 'framer-motion';

const homeData = [
  {
    greeting: "Welcome!",
    intro: "I'm a web developer from Lagos, a city in Nigeria",
    img: "/img/civic.jpg",
    paragraph: "Over some years, understanding programming principles and practicality, a worthwhile journey with will to build products, advance in production environments, tools & resources for better resolutions, working use cases. With focus on JavaScript and its Next.js framework for research & development to deployment protocols"
  }
]

// Content section animation variants
const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      delay: custom * 0.2 + 0.3
    }
  })
}

// Image animation variants
const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 20,
      delay: 0.5
    }
  }
}

export default function Home() {
  return (
    <main>
      {homeData.map((data) => (
        <motion.div 
          key={data.greeting} 
          className="container mx-auto max-w-3xl p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <h3 className="text-gray-700 font-bold text-2xl py-4">{data.greeting}</h3>
            <p className="py-4 font-normal text-lg">{data.intro}</p>
          </motion.div>
          
          <motion.div 
            className="relative w-full h-56 md:h-84 py-4 overflow-hidden rounded-xl"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              width={750}
              height={250}
              src={data.img}
              alt="Image of Lagos Landmark"
              className="object-cover transition-transform duration-700 hover:scale-105"
              quality={100}
              placeholder="blur"
              blurDataURL={data.img}
            />
          </motion.div>
          
          <motion.div 
            className="py-8"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <p className="leading-relaxed">
              {data.paragraph}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </main>
  );
}