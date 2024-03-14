/* eslint-disable react/no-unescaped-entities */
// import React from 'react'
import { useState, useEffect } from "react";
import Cards from "../components/Cards";
import FormsField from "../components/FormsField";
import Loader from "../components/Loader";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <Cards key={post._id} {...post} />);
    }

    return (
      <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">
        {title}
      </h2>
    );
  };
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://ai-image-generator-backend-p94i.onrender.com/api/post/getAllPosts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setAllPosts(result.message.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    console.log(allPosts, searchText);
    if (searchText.length > 1) {
      setSearchTimeout(
        setTimeout(() => {
          const searchResult = allPosts.filter(
            (item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase()) ||
              item.description.toLowerCase().includes(searchText.toLowerCase())
          );
          setSearchedResults(searchResult);
        }, 500)
      );
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-[#0f172a] text-[32px]">
            The Community Showcase
          </h1>

          <p className="mt-2 text-[#374151] text-[16px">
            Explore an enchanting array of captivating and visually mesmerizing
            images crafted by ImagiAi's boundless creativity.{" "}
          </p>
        </div>

        <div className="mt-16">
          <FormsField
            labelName="Search any images...."
            type="text"
            name="text"
            placeholder="Search something..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#475569] text-xl mb-3">
                  Showing results for{" "}
                  <span className="text-[#0f172a]">{searchText}</span>
                </h2>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No search results found"
                  />
                ) : (
                  <RenderCards data={allPosts} title="No Posts found" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
