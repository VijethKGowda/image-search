import Head from "next/head";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchImages = ({ pageParam = 1, queryKey }) => {
  let query = queryKey[1] ? queryKey[1] : "";
  return axios.get(
    `https://pixabay.com/api/?key=30410372-daee06e723f97adcf44bc8542&page=${pageParam}&q=${query}&safesearch=true`
  );
};

const ImageDisplay = ({ images }) => {
  const router = useRouter();
  return (
    <>
      <div key={images.id} className="group">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 cursor-pointer">
          <a href={images.largeImageURL} target="_blank" rel="noreferrer">
            <Image
              src={images.webformatURL}
              alt={images.id}
              layout="fill"
              className="object-cover object-center hover:opacity-75"
            />
          </a>
        </div>
        <h3 className="mt-4 text-sm flex flex-wrap items-center gap-2 text-gray-700">
          Tags:
          {images.tags.split(",").map((tag, index) => (
            <span
              onClick={() => {
                router.push(`?query=${tag}`);
              }}
              className="bg-blue-500 px-3 py-1 text-xs rounded-2xl text-white flex items-center whitespace-nowrap cursor-pointer"
              key={index}
            >
              {tag.trim()}
            </span>
          ))}
        </h3>
      </div>
    </>
  );
};

export default function Home() {
  const { query } = useRouter();

  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery(["images", query.query], fetchImages, {
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length < Math.ceil(lastPage.data.totalHits / 20)
        ? allPages.length + 1
        : undefined;
    },
  });

  const allItems = useMemo(
    () => data?.pages?.flatMap((page) => page?.data?.hits || []),
    [data]
  );

  if (isLoading) {
    return <h2 className="w-full text-center mt-10">Loading...</h2>;
  }

  if (isError) {
    return <h2 className="w-full text-center mt-10">{error.message}</h2>;
  }

  return (
    <div>
      <Head>
        <title>Image search app</title>
        <meta name="description" content="Search your favorite images" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          className="py-8"
          dataLength={data.pages.length * 20}
          next={fetchNextPage}
          hasMore={Boolean(hasNextPage)}
        >
          {allItems.length ? (
            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {allItems.map((images) => {
                return <ImageDisplay key={images.id} images={images} />;
              })}
            </div>
          ) : (
            <h2 className="w-full text-center mt-10">No image found</h2>
          )}
        </InfiniteScroll>
        {isFetchingNextPage ? (
          <h2 className="w-full text-center mt-10">Loading...</h2>
        ) : allItems.length ? (
          <h2 className="w-full text-center mt-10">End of list</h2>
        ) : null}
      </main>
    </div>
  );
}
