import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { RegContext, UserReg } from "../context/RegContext";
import { UserAuth } from "../context/AuthContent";
import { Link, useNavigate } from "react-router-dom";
import planList from "../utils/planList";
import { FaCircleCheck } from "react-icons/fa6";
import { MdChevronRight, MdLocalMovies } from "react-icons/md";
import CardIcons from "../components/CardIcons";
import { GoCreditCard, GoQuestion } from "react-icons/go";
import PasswordInput from "../components/PasswordInput";
import { GiPopcorn } from "react-icons/gi";

const Registration = () => {
  const [count, setCount] = useState(0);
  const [selectPlan, setSelectPlan] = useState(planList.premium);
  const [fullName, setFullName] = useState("");
  const regRef = useRef();
  const { user, emailExisting, logIn, signUp, error } = UserAuth();
  const {
    setRegisterPayment,
    email,
    setCardDetails,
    setPassword,
    password,
    cardDetails,
    saveCardDetails,
  } = useContext(RegContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!email) {
      navigate("/");
    }
  });

  useEffect(() => {
    setRegisterPayment(true);

    const children = regRef.current.children;
    for (let i = 0; i < children.length - 1; i++) {
      children[i].classList.add("hidden");
    }
    children[count].classList.remove("hidden");

    const login = async () => {
      if (emailExisting && count === 1) {
        await logIn(email, password);

        if (user?.email !== email && error && count > 0) {
          setCount(0);
          console.log(error, "this is the error");
        }
      }

      if (!emailExisting && count === 2) {
        await signUp(email, password, fullName);
        if (user?.email !== email && error && count === 2) {
          setCount(1);
          console.log(error, "this is the error");
        }
      }
    };

    if (count === 5) {
      setRegisterPayment(false);
      saveCardDetails(user);

      navigate("/home");
    }

    login();
  }, [count, emailExisting]);

  return (
    <div className="bg-white w-full h-screen pt-20">
      <div
        ref={regRef}
        className="flex items-center justify-center flex-col gap-5 registration"
      >
        <div className="">
          {!emailExisting ? (
            <div className="flex flex-col items-center justify-center md:w-[70%] mx-auto w-[80%] ">
              <div className="flex py-4">
                <img src="/public/monitor-2.svg" alt="" className="w-8" />
                <img src="/public/speaker.svg" alt="" className="w-6" />
              </div>
              <div className="text-center">
                <span className="text-[10px] text-gray-600">STEP 1 OF 3</span>
                <h4 className="font-bold text-base tracking-wide leading-5 pb-3">
                  Finish setting up yor account
                </h4>
                <p className="text-xs tracking-wide leading-4">
                  Netflix is personalized for you
                </p>
                <p className="text-xs tracking-wide leading-4">
                  Create a password to watch on any device at any time
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              {error && (
                <p className="text-xs py-3 uppercase tracking-wide text-red-500">
                  {error.code}
                </p>
              )}
              <span className="text-[10px] text-gray-600 py-1">
                STEP 1 of 3
              </span>
              <div className="text-left md:w-[70%] w-[80%] ">
                <h4 className="font-bold text-base tracking-wide leading-5 pb-2">
                  Welcome back! <br /> Joining Netflix is easy
                </h4>
                <p className="text-xs tracking-wide leading-4 pb-3">
                  Enter your password and you'll be watching in no time
                </p>

                <p className="pb-2">
                  <span className="text-sm block">Email</span>{" "}
                  <span className="text-xs block">{email}</span>
                </p>
                <form action="">
                  <PasswordInput
                    setPassword={setPassword}
                    placeholder="Add a password"
                  />

                  <div className="text-left text-xs text-green-800">
                    <button>Forgot your password?</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="">
          {!emailExisting ? (
            !user?.email ? (
              <div className="flex flex-col items-center justify-center">
                {error && (
                  <p className="text-xs py-3 uppercase tracking-wide text-red-500">
                    {error.code}
                  </p>
                )}

                <span className="text-[10px] text-gray-600">STEP 2 of 3</span>
                <div className="text-left md:w-[70%] w-[80%] ">
                  <h4 className="font-bold text-base tracking-wide leading-5 pb-1">
                    Create a password to start your membership
                  </h4>
                  <p className="text-xs tracking-wide leading-4">
                    Just a few more steps and you're done!
                  </p>
                  <p className="text-xs tracking-wide leading-4 pb-3">
                    We hate paperwork, too
                  </p>
                  <p className="pb-2">
                    <span className="text-sm block">Email</span>{" "}
                    <span className="text-xs block">{email}</span>
                  </p>
                  <form action="">
                    <input
                      type="text"
                      placeholder="Add your full name"
                      autoComplete="full name"
                      className="px-3 py-2 mb-2 bg-transparent border-1 border-gray-300 rounded text-sm w-full"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <PasswordInput
                      setPassword={setPassword}
                      placeholder="Add a password"
                    />

                    <div className="flex justify-center items-center text-sm text-gray-800">
                      <p className="text-xs flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Please do not email me Netflix special offers
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center md:w-[70%] mx-auto w-[80%] ">
                <div className="flex py-4">
                  <MdLocalMovies className="text-2xl text-red-600" />
                  <GiPopcorn className="text-2xl text-yellow-600" />
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-gray-600">STEP 1 OF 3</span>
                  <h4 className="font-bold text-base tracking-wide leading-5 pb-3">
                    All your movies in one place
                  </h4>
                  <p className="text-xs tracking-wide leading-4">
                    Watch anywhere with seamless streaming across phones,
                    tablets, laptops, and more
                  </p>
                  {/* <p className="text-xs tracking-wide leading-4">
                    Create a password to watch on any device at any time
                  </p> */}
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center w-[80%] mx-auto">
              <div className="flex py-4">
                <img
                  src="/public/check-circle-small.svg"
                  alt=""
                  className="w-15"
                />
              </div>
              <div className="text-center">
                <span className="text-[10px] text-gray-600 py-1">
                  STEP 2 OF 3
                </span>
                <h4 className="font-bold text-base tracking-wide leading-5 pb-3">
                  Choose your plan
                </h4>
                <ul className="list-none py-1 w-full flex flex-col gap-3 ">
                  <li className="text-xs leading-0">
                    <img
                      src="/public/check.svg"
                      alt=""
                      className="w-8 inline"
                    />
                    <span>No commitments, cancel anytime</span>
                  </li>
                  <li className="text-xs leading-0">
                    <img
                      src="/public/check.svg"
                      alt=""
                      className="w-8 inline"
                    />
                    <span className="text-left">
                      Everything on Netflix for one low price
                    </span>
                  </li>
                  <li className="text-xs leading-0">
                    <img
                      src="/public/check.svg"
                      alt=""
                      className="w-8 inline"
                    />
                    <span>No ads and no extra fees. Ever</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="w-[80%] md:w-[70%] m-auto">
            <span className="text-[10px] text-gray-600">STEP 2 OF 3</span>
            <h4 className="font-bold text-base tracking-wider leading-5 pb-1">
              Choose the plan that's right for you
            </h4>
            <div className="plans flex items-end justify-center gap-1 md:gap-5 lg:gap-10 pb-3">
              {Object.entries(planList).map(([key, value]) => (
                <div
                  key={key}
                  onClick={() => {
                    setSelectPlan(value);
                    setCardDetails({
                      ...cardDetails,
                      ["plan"]: selectPlan,
                    });
                  }}
                  className={`flex-1 border-1 rounded border-gray-200   cursor-pointer shadow relative ${
                    selectPlan.selected === value.selected &&
                    `bg-gradient-to-br  from-pink-900 from-40% to-blue-500 text-black`
                  } ${
                    value.selected !== "Premium" ? "mt-6 h-[60px]" : " h-[80px]"
                  }`}
                >
                  {value.selected === "Premium" && (
                    <span
                      className={`block font-bold text-[8px] p-1 border-b  ${
                        selectPlan.selected === value.selected
                          ? `bg-gradient-to-br to-[${value.bg}] border-neutral-400`
                          : `border-gray-300`
                      }`}
                    >
                      Most Popular
                    </span>
                  )}

                  <span className="block font-bold text-[8px] pt-2 px-2 pb-1">
                    {value.selected}
                  </span>
                  <span className="block text-[8px] px-2">{value.pixel}</span>
                  {selectPlan.selected === value.selected && (
                    <FaCircleCheck className="w-[13px] absolute right-2 bottom-2" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col pb-5">
              {Object.entries(selectPlan)
                .slice(0, -2)
                .map(([key, value]) => (
                  <div
                    key={key}
                    className=" py-2 flex justify-between items-start text-xs text-gray-600 border-b border-gray-300 "
                  >
                    <div>{key}</div>
                    <div className="text-gray-900">{value}</div>
                  </div>
                ))}
            </div>

            <div className="text-xs text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Similique ullam quia quo distinctio voluptas animi sequi. Dolorem
              labore error minima vitae nihil impedit, fugiat itaque
              perspiciatis recusandae, soluta earum repudiandae.{" "}
              <Link className="text-blue-600">Term of Use</Link> Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Maxime voluptatem
              suscipit unde saepe nemo est consequuntur, placeat et magnam,
              maiores exercitationem eius repellat dolorum aliquid aperiam quos
              quis perspiciatis dolor.
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex flex-col items-center justify-center w-[80%] mx-auto">
            <div className="flex py-4">
              <img
                src="/public/padlock-round-arrow.svg"
                alt=""
                className="w-11"
              />
            </div>
            <div className="text-center">
              <span className="text-[10px] text-gray-600 py-1">
                STEP 3 OF 3
              </span>
              <h4 className="font-bold text-base tracking-wide leading-5 pb-3">
                Choose how to pay
              </h4>
              <div className="text-center">
                <p className="text-xs tracking-wide leading-4 pb-2">
                  Your payment is encrypted and you can change how you pay
                  anytime.
                </p>
                <p className="text-xs tracking-wide leading-4 font-bold">
                  Secure for peace of mind
                </p>
                <p className="text-xs tracking-wide leading-4 font-bold">
                  Cancel easily online
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex flex-col items-start justify-center md:w-[47%] w-[80%] mx-auto ">
            <span className="text-[10px] text-gray-600 py-1 text-left">
              STEP 3 of 3
            </span>
            <div className="text-left w-full">
              <h4 className="font-bold text-base tracking-wide leading-5 pb-2">
                Set up your credit or debit card
              </h4>
              <CardIcons />

              <form action="" className="flex flex-col gap-2">
                <div className="flex items-center justify-center border-1 border-gray-300 rounded py-1">
                  <input
                    type="text"
                    name="card number"
                    placeholder="Card number"
                    autoComplete="card number"
                    inputMode="numeric"
                    maxLength="19"
                    className="px-3 py-2 bg-transparent focus:border-none focus:outline-none text-xs w-full"
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <GoCreditCard className="mx-4 w-6 " />
                </div>

                <div className="flex items-center justify-between py-1 gap-2">
                  <input
                    type="text"
                    name="expiration date"
                    placeholder="MM/YY"
                    autoComplete="mm/yy"
                    inputMode="numeric"
                    maxLength="5"
                    className="p-3 bg-transparent focus:outline-none text-xs border-1 border-gray-300 rounded w-full"
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />

                  <span className="flex items-center justify-center border-1 border-gray-300 rounded ">
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      autoComplete="cc-csc"
                      inputMode="numeric"
                      maxLength="3"
                      className="p-3 bg-transparent focus:border-none focus:outline-none text-xs w-full "
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                    <GoQuestion className="mx-4 w-6 " />
                  </span>
                </div>

                <div>
                  <input
                    type="text"
                    name="name on card"
                    placeholder="Name on card"
                    autoComplete="cc-name"
                    className="p-3  mb-2 bg-transparent border-1 border-gray-300 rounded text-xs w-full focus:outline-none "
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        [e.target.name]: e.target.value.toUpperCase(),
                      })
                    }
                  />
                </div>

                <div className="flex justify-between items-center py-1 px-3 bg-gray-200 rounded my-1">
                  <div className="text-[13px] flex flex-col justify-center items-start">
                    <span className="font-bold">
                      {selectPlan["Monthly price"]}/month
                    </span>
                    <span>{selectPlan.selected}</span>
                  </div>
                  <div
                    className="text-blue-700 text-[14px] cursor-pointer
                  "
                    onClick={() => setCount(count - 2)}
                  >
                    Change
                  </div>
                </div>
              </form>

              <div className="text-xs text-gray-500 pt-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Similique ullam quia quo distinctio voluptas animi sequi.
                <p className="pt-3 pb-1">
                  Dolorem labore error minima vitae nihil impedit, fugiat itaque
                  perspiciatis recusandae, soluta earum repudiandae.{" "}
                  <Link className="text-blue-600">Term of Use</Link> Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Maxime voluptatem
                  suscipit unde saepe nemo est consequuntur, placeat et magnam,
                  maiores exercitationem eius repellat dolorum aliquid aperiam
                  quos quis perspiciatis dolor.
                </p>
                <p className="text-base">
                  <input
                    type="checkbox"
                    name="term-of-use"
                    id="term-of-use"
                    className="border-gray-300 outline-gray-300  me-1"
                  />
                  I agree
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center cursor-pointer">
          <div
            className={`${count !== 4 ? "md:w-[33%]" : "md:w-[47%]"} w-[80%]`}
            onClick={() => setCount(count + 1)}
          >
            {count !== 3 ? (
              <button className=" py-3 w-full rounded font-bold text-white  bg-red-600 my-2 cursor-pointer">
                {count !== 4 ? <>Next</> : <>Start Membership</>}
              </button>
            ) : (
              <>
                <p className="text-right">
                  <span className="text-xs pe-[2px]">End-to-end encrypted</span>
                  <img
                    src="/public/padlock.svg"
                    alt=""
                    className="w-3 inline "
                  />
                </p>

                <div className="flex justify-between items-center border-2 rounded border-gray-300 px-2 py-1 w-full">
                  <div className="flex items-center gap-1">
                    <span className="md:text-xs text-[8px] text-gray-600">
                      Credit or Debit Card
                    </span>

                    <CardIcons />
                  </div>
                  <MdChevronRight className="font-normal md:text-3xl text-xl" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
