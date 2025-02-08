export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="relative isolate pt-14 xl:pt-24">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      <div className="max-w-7xl w-full flex justify-center mx-auto px-3 xs:px-4 sm:px-6 pb-16 pt-28 lg:pb-20 lg:pt-24">
        <h1>About Page</h1>
      </div>
    </section>
  );
}
