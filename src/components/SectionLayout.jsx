const SectionLayout = ({ children }) => {
  return (
    <section className="relative bg-black text-white w-full">
      <div className="grid sm:grid-cols-2 max-w-7xl mx-auto justify-center items-center py-12 gap-8 text-center sm:text-left">
        {children}
      </div>
      <div className="bg-stone-900 w-full absolute top-0 left-0 h-1"></div>
    </section>
  );
};

export default SectionLayout;
