const SpinnerLoader = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-teal-500"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.3932 38.0383 97.8624 35.9116 97.8624 33.5539C97.8624 29.8398 94.8624 26.8398 91.1483 26.8398C87.4342 26.8398 84.4342 29.8398 84.4342 33.5539C84.4342 35.9116 85.9034 38.0383 88.3291 39.0409L93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;