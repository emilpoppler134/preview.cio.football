import clsx from "clsx";
import { motion } from "framer-motion";
import { FC, useRef, useState } from "react";
import { API_ADDRESS } from "../config";
import { useVisitorTracking } from "../hooks/useVisitorTracking";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";
const EMAIL_ERROR_MESSAGE = "Please enter a valid email address.";

const LandingPage: FC = () => {
  useVisitorTracking();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    if (!EMAIL_REGEX.test(value || "")) {
      setError(EMAIL_ERROR_MESSAGE);
      return;
    }
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.trim();
    setValue(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();

      if (!EMAIL_REGEX.test(value || "")) {
        setError(EMAIL_ERROR_MESSAGE);
        return;
      }
      handleSubmit(value);
    }
  };

  const handleSubmit = async (email: string) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_ADDRESS}/email/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error);
        setLoading(false);
        return;
      }

      setError(null);
      setLoading(false);

      setValue("");
      setSuccess(true);
    } catch {
      setError(DEFAULT_ERROR_MESSAGE);
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-full grid-cols-1 grid-rows-[0.5fr_auto_1fr] bg-black">
      <header className="wrapper pt-6 sm:pt-10 z-10">
        <div className="flex items-center justify-between max-w-lg">
          <span>
            <span className="sr-only">CiO</span>
            <img alt="" src="/logo.png" className="h-14 w-auto rounded-full" />
          </span>
        </div>
      </header>
      <main className="wrapper py-24 sm:py-32 z-10">
        <div className="w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              ease: "easeOut",
              duration: 1,
            }}
          >
            <div className="mb-4 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
              <span className="text-sm font-medium text-slate-300 tracking-wider uppercase">
                WEBSITE
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
            transition={{
              ease: "easeOut",
              duration: 0.5,
            }}
          >
            <h1
              className={clsx(
                "text-5xl md:text-8xl md:leading-normal leading-normal font-bold mb-6 text-balance bg-gradient-to-r from-[#367dff] via-[#6095d0] to-[#a6ff30] bg-clip-text text-transparent drop-shadow-md",
              )}
            >
              Coming soon
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
            transition={{
              ease: "easeOut",
              duration: 0.5,
            }}
          >
            <span className="block text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 font-light text-balance max-w-md">
              {!success ? (
                <>
                  Get notified when we launch something{" "}
                  <span className="text-secondary-400 font-medium">
                    extraordinary
                  </span>
                </>
              ) : (
                <>
                  Check your
                  <br />
                  <span className="text-secondary-400 font-medium">inbox!</span>
                </>
              )}
            </span>
          </motion.div>
          {!success ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full"
              transition={{
                ease: "easeOut",
                duration: 0.5,
                delay: 0.1,
              }}
            >
              {/* Text input */}
              <div className="w-full max-w-md mx-auto">
                <div
                  className={clsx(
                    "flex items-center rounded-xl border mb-1.5",
                    "transition-[border-color,box-shadow] duration-200 ease-in-out",
                    "bg-slate-800/50 backdrop-blur-sm",
                    {
                      "[&:has(:focus-visible)]:border-focus-inner [&:has(:focus-visible)]:shadow-focus-outer":
                        !error,
                    },
                    !error
                      ? "border-slate-600/50"
                      : "border-red-500 shadow-invalid-outer",
                  )}
                >
                  <input
                    ref={inputRef}
                    type="email"
                    name="email"
                    id="email"
                    value={value}
                    placeholder="Enter your email address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoCapitalize="off"
                    autoComplete="email"
                    autoCorrect="false"
                    autoFocus={false}
                    spellCheck="false"
                    tabIndex={0}
                    className={clsx([
                      "appearance-none border-none focus:ring-0",
                      "text-white placeholder:text-slate-400",
                      "rounded-xl bg-transparent",
                      "flex-1 min-w-[240px] py-3 px-[16px]",
                      "text-inherit",
                      "transition-[padding] duration-200 ease-in-out",
                    ])}
                  />

                  <div className="flex items-center justify-center pr-1">
                    <button
                      type="button"
                      onClick={() => handleSubmit(value)}
                      className="relative group flex p-[11px] [&>*]:pointer-events-none h-10 w-10 bg-secondary-400 hover:bg-secondary-300 text-slate-900 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      {!loading ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 640"
                          className="size-5 text-black group-hover:text-black/75 transition-colors duration-100 ease-linear"
                        >
                          <path d="M322.5 351.7L523.4 150.9L391 520.3L322.5 351.7zM489.4 117L288.6 317.8L120 249.3L489.4 117zM70.1 280.8L275.9 364.4L359.5 570.2C364.8 583.3 377.6 591.9 391.8 591.9C406.5 591.9 419.6 582.7 424.6 568.8L602.6 72C606.1 62.2 603.6 51.4 596.3 44C589 36.6 578.1 34.2 568.3 37.7L71.4 215.7C57.5 220.7 48.3 233.8 48.3 248.5C48.3 262.7 56.9 275.5 70 280.8z" />
                        </svg>
                      ) : (
                        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex items-center justify-center pointer-events-none">
                          <span className="border-4 border-solid border-black border-t-transparent rounded-full opacity-25 animate-spin size-5"></span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
                {error ? (
                  <span className="block text-base font-medium text-red-400">
                    {error}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-x-1 text-base font-medium text-slate-300/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                      />
                    </svg>

                    <span>There is something waiting for you</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </motion.div>
          ) : (
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          )}
        </div>
      </main>
      <footer className="self-end z-10 w-full bg-transparent">
        <div className="py-10">
          <nav className="wrapper flex items-center justify-between gap-x-4">
            <div className="grid grid-cols-3 sm:flex gap-x-2 w-full">
              <a
                href="https://www.instagram.com/cio.football"
                className="p-1 text-sm/6 font-medium text-slate-300 hover:text-white transition-colors duration-100 ease-in-out"
              >
                <div className="flex items-center gap-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    aria-hidden="true"
                    className="h-6 w-6 fill-current"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                  <span>cio.football</span>
                </div>
              </a>
              <a
                href="https://www.facebook.com/cio.football/"
                className="p-1 text-sm/6 font-medium text-slate-300 hover:text-white transition-colors duration-100 ease-in-out"
              >
                <div className="flex items-center gap-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    aria-hidden="true"
                    className="h-6 w-6 fill-current"
                  >
                    <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L258.2 544L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96z" />
                  </svg>
                  <span>cio.football</span>
                </div>
              </a>
              <a
                href="https://www.tiktok.com/@cio.football"
                className="p-1 text-sm/6 font-medium text-slate-300 hover:text-white transition-colors duration-100 ease-in-out"
              >
                <div className="flex items-center gap-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    aria-hidden="true"
                    className="h-6 w-6 fill-current"
                  >
                    <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
                  </svg>
                  <span>cio.football</span>
                </div>
              </a>
            </div>
          </nav>
        </div>
      </footer>
      <div className="absolute size-full">
        <img
          src="/background.jpeg"
          className="inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 brightness-50" />
      </div>
    </div>
  );
};

export default LandingPage;
