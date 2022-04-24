import Link from "next/link";

const Footer = () => (
  <footer className="px-3 md:px-16 pt-6 bg-gray-100">
    <div className="container mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <section>
        <div>
          <h3 className="font-bold mb-3">Support</h3>
        </div>
        <ul className="space-y-3 text-[15px]">
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Help Center</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Safety information</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Cancellation options</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Our COVID-19 Response</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">
                Supporting people with disabilities
              </a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Report a neighborhood concern</a>
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <div>
          <h3 className="font-bold mb-3">About</h3>
        </div>
        <ul className="space-y-3 text-[15px]">
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Newsroom</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Learn about new features</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Letter from our founders</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Careers</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Investors</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Airbnb Luxe</a>
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <div>
          <h3 className="font-bold mb-3">Hosting</h3>
        </div>
        <ul className="space-y-3 text-[15px]">
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Try hosting</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">AirCover: protection for Hosts</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Explore hosting resources</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Visit our community forum</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">How to host responsibly</a>
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <div>
          <h3 className="font-bold mb-3">Community</h3>
        </div>
        <ul className="space-y-3 text-[15px]">
          <li>
            <Link href={"#"}>
              <a className="hover:underline">
                Airbnb.org: disaster relief housing
              </a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Support Afghan refugees</a>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <a className="hover:underline">Combating discrimination</a>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  </footer>
);

export default Footer;
