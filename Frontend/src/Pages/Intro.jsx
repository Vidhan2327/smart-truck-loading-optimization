import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";




const images = [
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=1600&q=80",
];
const features = [
  {
    title: "🚚 Smart Truck Matching",
    desc: "Our system intelligently analyzes shipment size, destination, and delivery timelines to automatically match your shipment with the most suitable available truck. This eliminates manual searching and speeds up booking decisions.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "📦 Optimized Load Utilization",
    desc: "By maximizing truck space usage, the platform ensures you don’t pay for unused capacity. Optimized loading leads to reduced transportation costs and better operational efficiency.",
    image: "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Real-Time Shipment Tracking",
    desc: "Track your shipment at every stage—from pickup to delivery—with live status updates that improve transparency, planning, and reliability.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cost Transparency & Savings",
    desc: "View estimated transportation costs before booking and analyze total savings after delivery. This enables smarter, data-driven logistics decisions.",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "🌱 CO₂ Emission Reduction",
    desc: "Optimized truck loading reduces unnecessary trips and fuel usage. The platform clearly shows carbon emission savings for every completed shipment.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
  },
];




export default function Intro() {
  const navigate = useNavigate();

  {/* For images */ }
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4s

    return () => clearInterval(interval);
  }, []);

  {/* For Features */ }
  // const [featureIndex, setFeatureIndex] = useState(0);
  // const featureInterval = useRef(null);

  // const startFeatureSlider = () => {
  //   featureInterval.current = setInterval(() => {
  //     setFeatureIndex((prev) => (prev + 1) % features.length);
  //   }, 4000);
  // };

  // const stopFeatureSlider = () => {
  //   clearInterval(featureInterval.current);
  // };

  // useEffect(() => {
  //   startFeatureSlider();
  //   return stopFeatureSlider;
  // }, []);

  const [active, setActive] = useState(0);
  const featureIntervalRef = useRef(null);

  const start = () => {
    featureIntervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % features.length);
    }, 4000); // 4 seconds
  };

  const stop = () => {
    clearInterval(featureIntervalRef.current);
  };

  useEffect(() => {
    start();
    return stop;
  }, []);

  // for upp 
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Scroll to top"
            className="
        fixed bottom-10 right-10 z-50
        bg-orange-500 hover:bg-orange-600
        text-white
        w-14 h-14 md:w-16 md:h-16
        rounded-full
        shadow-2xl
        flex items-center justify-center
        text-2xl md:text-3xl
        transition-transform
        hover:scale-110
      "
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>


      {/* Header */}
      {/* <header className="fixed z-50 top-0 w-full bg-white/80 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center justify-between px-6 py-4 text-stone-700">
          <Link to="/" className="text-xl font-bold justify-self-start">
            LoadSmart
          </Link>

          // <nav className="flex gap-8 justify-center text-sm font-medium">
          //   <a href="#top" className="hover:text-orange-400 scroll-smooth">Home</a>
          //   <a href="#" className="hover:text-orange-400">Features</a>
          //   <a href="#" className="hover:text-orange-400">Contact</a>
          // </nav>
        </div>
      </header> */}



      <div id="top" className="relative h-screen w-full">
        {/* Background Images */}
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000  ${i === index ? "opacity-100" : "opacity-0"
              }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Smart Truck Loading
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-gray-200 mb-8">
            Optimize shipments, maximize truck utilization, and reduce logistics
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-black transition"
            >
              Register
            </button>
          </div>
        </div>
      </div>





      {/* <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <div
          onMouseEnter={stop}
          onMouseLeave={start}
          className="flex gap-6 w-full max-w-7xl"
        >
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex-1 rounded-3xl overflow-hidden shadow-xl"
          >

            <img
              src={features[active].image}
              alt={features[active].title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60" />


            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {features[active].title}
              </h2>

              <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-gray-200">
                {features[active].desc}
              </p>
            </div>
          </motion.div>



          <div className="flex flex-col gap-4">
            {features.map((f, i) => {
              if (i === active) return null;

              return (
                <motion.div
                  key={i}
                  onClick={() => setActive(i)}
                  whileHover={{ scale: 1.05 }}
                  className="h-[130px] w-[90px] rounded-2xl overflow-hidden cursor-pointer shadow-md bg-black"
                >
                  <img
                    src={f.image}
                    alt={f.title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6"> */}
      {/* <section className="relative min-h-screen flex items-center justify-center bg-gray-100 px-6"> */}
      <section className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-orange-100 via-yellow-50 to-sky-100 px-6">


        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-96 w-96 bg-orange-300/30 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-24 h-96 w-96 bg-blue-300/30 rounded-full blur-3xl" />
        </div>


        <div
          onMouseEnter={stop}
          onMouseLeave={start}
          className="w-full max-w-7xl"
        >
          <h1 className="mb-6 text-3xl md:text-5xl font-extrabold text-gray-800 text-center ">
            Features
          </h1>
          <motion.div
            className="relative h-[480px] rounded-3xl overflow-hidden shadow-xl group"

            key={active}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          // className="relative h-[480px] rounded-3xl overflow-hidden shadow-xl"
          >

            {/* Background Image */}
            <img
              src={features[active].image}
              alt={features[active].title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* LEFT ARROW */}
            <button
              aria-label="Previous feature"
              onClick={() => {
                stop();
                setActive((prev) =>
                  prev === 0 ? features.length - 1 : prev - 1
                );
                start();
              }}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-20
             opacity-0 group-hover:opacity-100
             bg-black/50 hover:bg-black/70 text-white
             p-4 rounded-full transition-opacity duration-300"
            >
              &#8592;
            </button>


            {/* RIGHT ARROW */}
            <button
              aria-label="Next feature"
              onClick={() => {
                stop();
                setActive((prev) => (prev + 1) % features.length);
                start();
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-20
             opacity-0 group-hover:opacity-100
             bg-black/50 hover:bg-black/70 text-white
             p-4 rounded-full transition-opacity duration-300"
            >
              &#8594;
            </button>


            {/* CENTERED TEXT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 text-white z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {features[active].title}
              </h2>

              <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-gray-200">
                {features[active].desc}
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* <section className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
              About LoadSmart
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Logistics today faces challenges such as underutilized trucks, empty return
              trips, and poor coordination between warehouses and transport providers.
              These inefficiencies increase costs and negatively impact the environment.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              LoadSmart is built to solve these problems using intelligent matching and
              data-driven optimization. By connecting shipments with the most suitable
              trucks, we help businesses reduce costs and improve operational efficiency.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Our vision is to create a smarter and more sustainable logistics ecosystem
              where every trip adds value, emissions are reduced, and resources are used
              efficiently.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
              alt="Logistics optimization"
              className="h-[420px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 text-white">
              <h3 className="text-3xl font-bold mb-4">
                Smarter Logistics. Real Impact.
              </h3>
              <p className="text-lg text-gray-200">
                Built for warehouses, truck dealers, and logistics teams.
              </p>
            </div>
          </div>

        </div>
      </section> */}

      <section className="bg-gray-900 text-white px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT: BRAND */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">
              LoadSmart
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Smart logistics platform focused on optimizing truck utilization,
              reducing costs, and enabling sustainable transportation.
            </p>
          </div>

          {/* RIGHT: CONTACT INFO */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact Us
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>📍 India</li>
              <li>📧 support@loadsmart.com</li>
              <li>📞 +91 74250 XXXXX</li>
            </ul>
          </div>

        </div>

        {/* FOOTER BOTTOM */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} LoadSmart. All rights reserved.
        </div>
      </section>





    </>
  );
}