import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";

const SingleQuestion = ({ question }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="shadow ">
      <div
        className={`flex items-center justify-between p-4 lg:p-5 text-sm cursor-pointer rounded-lg shadow ${
          showAnswer ? "bg-[#333333]" : "bg-[#2c2c2c]  "
        } `}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <span className={`${showAnswer && "text-red-100"}`}>{question}</span>
        <span>
          {!showAnswer && (
            <button
              className={`${showAnswer && "text-red-100"} px-2 cursor-pointer`}
              onClick={() => setShowAnswer(true)}
            >
              <BsPlusLg />
            </button>
          )}
          {showAnswer && (
            <button
              onClick={() => setShowAnswer(false)}
              className={`${showAnswer && "text-red-100"} px-2 cursor-pointer`}
            >
              <LiaTimesSolid />
            </button>
          )}
        </span>
      </div>
      <article
        className={`${
          showAnswer && "mt-1 rounded-lg  border-gray-400 bg-[#2c2c2c] p-4"
        }`}
      >
        {showAnswer && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis earum
            inventore temporibus adipisci pariatur! Totam perferendis ut
            repellendus illo odio. Fuga eligendi vel tempora ut corrupti
            voluptatibus iusto, quod iure!
          </p>
        )}
      </article>
    </div>
  );
};

export default SingleQuestion;
