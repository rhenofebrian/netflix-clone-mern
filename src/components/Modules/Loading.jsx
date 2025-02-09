const Loading = () => {
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <span className="loading loading-ring w-36"></span>
      <p className="text-center">Please wait..</p>
    </div>
  );
};

export default Loading;
