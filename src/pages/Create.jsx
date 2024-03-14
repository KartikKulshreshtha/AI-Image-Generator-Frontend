// import React from 'react'
import { useNavigate } from "react-router-dom";
import preview from "../assets/preview.png";
import { getRandomPrompts } from "../utils/index";
import FormsField from "../components/FormsField";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import Loader from "../components/Loader";
import { FaShareAlt } from "react-icons/fa";
import { useState, useRef } from "react";
const Create = () => {
  const navigate = useNavigate();
  const target = useRef(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);
  const [showMessage, setShowMessage] = useState(
    "No Generated Image Found, Please Generate your favorite image now!"
  );
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompts(form.description);
    console.log(randomPrompt, "Comming here");
    setForm({ ...form, description: randomPrompt });
  };

  const generateImage = async () => {
    if (form.description) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/dalle/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: form.description,
          }),
        });

        const data = await response.json();
        if (!data.success) {
          setShowMessage(
            `Image Not Found with your prompt "${form.description}"`
          );
        } else {
          setForm({ ...form, image: `data:image/jpeg;base64,${data.photo}` });
        }
      } catch (err) {
        // alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.description && form.image) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/post/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });
        const data = await response.json();
        console.log(data, "This is a json response")

        if (data.success) {
          navigate("/");
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (err) {
        console.log(err, "This isJSONS")
        // alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#0f172a] text-[32px]">
          Generate your favorite Image with your favorite prompt!
        </h1>

        <p className="mt-2 text-[#374151] text-[16px">
          Explore an enchanting array of captivating and visually mesmerizing
          images crafted by ImagiAi boundless creativity.
        </p>
      </div>

      <form className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormsField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex: Your name"
            value={form.name}
            handleChange={handleChange}
          />
          <FormsField
            labelName="Prompt"
            type="text"
            name="description"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.description}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.image ? (
              <img
                src={form.image}
                alt={form.description}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                ref={target}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            <Overlay
              target={target.current}
              show={showTooltip}
              placement="right"
            >
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  {showMessage}
                </Tooltip>
              )}
            </Overlay>

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the Community"}
            {!loading && (
              <FaShareAlt style={{ marginLeft: "9px", marginTop: "2px" }} />
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Create;
