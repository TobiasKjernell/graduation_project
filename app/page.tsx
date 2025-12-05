import LandingBlogGrid from "@/components/LandingBlogGrid";
import ScrollContainer from "@/components/ScrollContainer";

export default function Home() {
  return (
    <div className="psp-linear-background text-white">
      <ScrollContainer>
          <LandingBlogGrid />
      </ScrollContainer>
    </div>
  );
} 
