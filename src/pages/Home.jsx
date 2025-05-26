import { useState, useEffect } from "react";
import { AI, Coinbase, Decen, Hero, Meta, Walletconnect } from "../assets";
import { Modal } from "../components";
import { useNavigate } from "react-router-dom";
import { useStarknetkitConnectModal } from "starknetkit";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";

// Reusable section for features
const FeatureSection = ({ title, text, image, reverse = false }) => (
  <div
    className={`my-[2rem] md:my-[4rem] flex items-start justify-between gap-y-10 md:gap-y-0 ${reverse ? "flex-col-reverse md:flex-row" : "flex-col md:flex-row"
      }`}
  >
    <div className="w-full flex items-center justify-center">
      <img src={image} alt="" className="w-[75%] h-[280px] md:h-[350px]" />
    </div>
    <div className="w-full">
      <h3 className="bg-gradient-to-l from-[#1a2980] to-[#26d0ce] bg-clip-text text-transparent text-lg text-center md:text-left md:text-2xl font-semibold">
        {title}
      </h3>
      <p className="mt-3 text-sm md:text-lg">{text}</p>
    </div>
  </div>
);

const Home = () => {
  const { connect, connectors } = useConnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({ connectors });
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const formatAddress = (addr) =>
    addr ? `${addr.slice(0, 5)}...${addr.slice(-4)}` : "";

  // Redirect to courses page when wallet is connected
  useEffect(() => {
    if (isConnected && address && !isConnecting) {
      const timer = setTimeout(() => {
        navigate("/courses");
      }, 1000); // Small delay to show connection success

      return () => clearTimeout(timer);
    }
  }, [isConnected, address, navigate, isConnecting]);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const { connector } = await starknetkitConnectModal();
      if (connector) {
        await connect({ connector });
        // Navigation will be handled by useEffect
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    disconnect();
  };

  // Starknet wallet options (updated to reflect actual Starknet wallets)
  const walletOptions = [
    { id: 1, name: "Argent X", logo: Meta }, // You should replace with actual Argent X logo
    { id: 2, name: "Braavos", logo: Coinbase }, // You should replace with actual Braavos logo
    { id: 3, name: "Wallet Connect", logo: Walletconnect },
  ];

  return (
    <div className="w-full pb-[3rem]">
      <div className="linear py-4 md:h-full md:py-8">
        <div className="layout flex items-start justify-between gap-y-9 md:gap-y-0 flex-col md:flex-row">
          <div className="w-full">
            <h2 className="text-xl md:text-3xl leading-11 font-semibold md:leading-16 lg:text-4xl text-white">
              Learn Anything, Anytime, in <br /> Your Native Language!
            </h2>
            <p className="py-4 md:py-8 text-base md:text-lg lg:text-xl text-white">
              Empowering students globally with AI-driven real-time translation.
              Learn courses in your language, no barriers, just knowledge.
            </p>
            <div className="flex items-center mt-3 md:mt-0 md:justify-normal gap-x-6 ">
              <div>
                {!address && (
                  <button
                    className="bg-white rounded-3xl px-6 py-1.5 md:py-2 text-base md:text-lg cursor-pointer lg:text-xl text-black font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                    onClick={connectWallet}
                    disabled={isConnecting}
                  >
                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                  </button>
                )}

              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center mt-4 md:mt-0 md:justify-end">
            <img src={Hero} alt="" className="w-[75%] md:w-[62%]" />
          </div>
        </div>
      </div>

      <section className="my-[4rem] layout">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl my-5 font-bold">
          What makes us stand out
        </h2>

        <FeatureSection
          title="Decentralized Video Hosting on Blockchain"
          text="A blockchain-powered video hosting platform that enables educators to securely upload and share their content without relying on centralized servers. This ensures content ownership, transparency, and censorship resistance while providing learners with unrestricted access to high-quality educational materials."
          image={Decen}
        />

        <FeatureSection
          title="Automated Course Transcription & Native Language Translation"
          text="An AI-driven platform that transcribes course content into text and translates it into learners' native languages in real time. This ensures accessibility, inclusivity, and a seamless learning experience for students worldwide."
          image={AI}
          reverse
        />

        <FeatureSection
          title="Web3-Powered Course Completion Certificates"
          text="A decentralized certification system leveraging blockchain technology to issue verifiable, tamper-proof course completion certificates. This ensures learners receive secure, transparent, and globally recognized credentials."
          image={Decen}
        />
      </section>

      {/* Alternative: If you want to show wallet selection modal instead of direct connection */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h2 className="text-center text-xl md:text-2xl font-bold">EDUFLIX</h2>
          <p className="my-4 bg-gradient-to-l from-[#1a2980] to-[#26d0ce] bg-clip-text text-transparent text-base font-semibold">
            Innovative, Decentralized, Educational, Empowering, Secure
          </p>
          <h3 className="text-xl font-semibold">Choose Wallet</h3>
          <div className="mt-5 grid gap-2 grid-cols-2 md:grid-cols-3">
            {walletOptions.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow rounded-lg border border-[#dadada] cursor-pointer py-1.5 flex items-center justify-center flex-col hover:shadow-md transition-shadow"
                onClick={() => {
                  setIsModalOpen(false);
                  connectWallet();
                }}
              >
                <img src={item.logo} alt="icon" className="w-[35px]" />
                <h4 className="mt-0.5 text-sm font-semibold">{item.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;