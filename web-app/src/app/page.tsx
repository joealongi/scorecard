export default function Home() {
  return (
    <section>
      <h1 className="max-w-xl mx-auto text-3xl lg:text-6xl font-light subpixel-antialiased">
        Pin Point Score
      </h1>
      <h3 className="my-3 lg:my-6 max-w-xl mx-auto text-xl lg:text-3xl font-light subpixel-antialiased">
        Tee box to green, track your golf game with ease
      </h3>
      <p className="text-md lg:text-lg font-extralight subpixel-antialiased">
        Pin Point Score is a golf application through and through, designed to
        help you keep track of your golf game from tee box to green. Whether
        you&apos;re a seasoned golfer or just starting out, this app is your
        perfect companion on the course. With its user-friendly interface and
        powerful features, Pin Point Score makes it easy to record your scores,
        analyze your performance, and improve your game. Say goodbye to paper
        scorecards and hello to a smarter way to play golf!
      </p>
      <p className="copyright mt-8 text-xs">
        © {new Date().getFullYear()} Pin Point Score. All rights reserved.
      </p>
    </section>
  );
}
