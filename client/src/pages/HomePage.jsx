import Carousel from "../components/Carousel";
import BannerGrid from "../components/BannerGrid";
import ProductCarousel from "../components/ProductCarousel";


const slides = [
  { id: 1, image: "/banners/1.webp", alt: "Big Sale 1" },
  { id: 2, image: "/banners/2.webp", alt: "Big Sale 2" },
  { id: 3, image: "/banners/3.webp", alt: "Big Sale 3" },
  { id: 2, image: "/banners/6.webp", alt: "Big Sale 2" },
  { id: 3, image: "/banners/5.webp", alt: "Big Sale 3" },
];

export default function HomePage() {
  return (
    
    <div style={{ paddingTop:64, margin:0, marginTop:12 }}>
      <Carousel slides={slides} height={211} /> 
      <BannerGrid />
      <ProductCarousel />   
     
    </div>
    
  );
}
