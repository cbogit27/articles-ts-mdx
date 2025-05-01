import Image from "next/image";
import Img1 from "../../public/img/civic.jpg"

export default function Home() {
  return (
    <main className="p-8">
      <div className="container mx-auto max-w-3xl">
        <div>
        <h3 className="text-gray-700 font-bold text-2xl py-4">Welcome!</h3>
        <p className="py-4 font-normal text-lg">I&apos;m a web developer from Lagos, a city in Nigeria</p>
        </div>
        <div className="relative w-full h-56 md:h-84 py-4 overflow-hidden">
          <Image width={750} height={250} src={Img1} alt="Image of Lagos Landmark" className="object-cover" quality={100} placeholder="blur"/>
        </div>
        <div className="py-8">
        <p>
          Over some years, understanding programming principles and practicality, a worthwhile journey with will to build products, advance in production environments, tools & resources for better resolutions, working use cases. With focus on JavaScript and its Next.js framework for research & development to deployment protocols   
        </p>
        </div>
      </div>
    </main>
  );
}
