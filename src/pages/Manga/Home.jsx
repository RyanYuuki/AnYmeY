import Carousel from '../../components/Home/Carousel'
import AnimeTable from '../../components/Home/AnimeTable'
import TrendingCarousel from '../../components/Home/TrendingCarousel';

export default function MangaHome() {
  return (
    <>
    <Carousel isManga={true} />
    <TrendingCarousel/>
    <AnimeTable/>
    </>
  )
}
