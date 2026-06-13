import HeroSection from "@/components/sections/HeroSection";
import Timeline from "@/components/sections/Timeline";
import LoveGarden from "@/components/sections/LoveGarden";
import TwentyReasons from "@/components/sections/TwentyReasons";
import LoveLetter from "@/components/sections/LoveLetter";
import MemoryBook from "@/components/sections/MemoryBook";
import WishTree from "@/components/sections/WishTree";
import BirthdayWish from "@/components/sections/BirthdayWish";
import EpicFinale from "@/components/sections/EpicFinale";
import SectionTransition from "@/components/ui/SectionTransition";

export default function Home() {
  return (
    <main className="relative w-full flex flex-col items-center overflow-hidden">
      <HeroSection />

      <SectionTransition variant="purple" />

      <Timeline />

      <SectionTransition variant="gold" />

      <LoveGarden />

      <SectionTransition variant="default" />

      <TwentyReasons />

      <SectionTransition variant="purple" />

      <LoveLetter />

      <SectionTransition variant="gold" />

      <MemoryBook />

      <SectionTransition variant="default" />

      <WishTree />

      <SectionTransition variant="purple" />

      <BirthdayWish />

      <SectionTransition variant="gold" />

      <EpicFinale />
    </main>
  );
}
