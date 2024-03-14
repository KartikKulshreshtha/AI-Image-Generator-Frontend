import { FaStar } from "react-icons/fa";
const FormsField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-white flex"
          style={{"backgroundColor": "rgb(2,0,36)","background": "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 53%, rgba(37,89,99,1) 94%)"}}
        >
          Surprise me <FaStar style={{marginLeft: "5px", color: "#fff300", marginTop: "0.5px"}}/>
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormsField;
