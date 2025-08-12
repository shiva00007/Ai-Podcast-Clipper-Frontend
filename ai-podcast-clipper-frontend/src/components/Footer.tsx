import { Card } from "./ui/card";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <Card className="mx-auto max-w-7xl border-none bg-black px-6 shadow-none sm:px-8 lg:px-12">
        {/* Footer Links */}
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-4 sm:text-left">
          {/* Features */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#feature1" className="hover:text-white">
                  AI-Powered Editing
                </Link>
              </li>
              <li>
                <Link href="#feature2" className="hover:text-white">
                  Auto Subtitles
                </Link>
              </li>
              <li>
                <Link href="#feature3" className="hover:text-white">
                  Smart Cropping
                </Link>
              </li>
            </ul>
          </div>

          {/* How it Works */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              How it Works
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#step1" className="hover:text-white">
                  Upload Video
                </Link>
              </li>
              <li>
                <Link href="#step2" className="hover:text-white">
                  AI Processes Clips
                </Link>
              </li>
              <li>
                <Link href="#step3" className="hover:text-white">
                  Download & Share
                </Link>
              </li>
            </ul>
          </div>

          {/* Testimonials */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Testimonials
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#testimonial1" className="hover:text-white">
                  Customer Stories
                </Link>
              </li>
              <li>
                <Link href="#testimonial2" className="hover:text-white">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                Email:{" "}
                <a href="mailto:hello@example.com" className="hover:text-white">
                  hello@example.com
                </a>
              </li>
              <li>
                Twitter:{" "}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Twiiter
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Linkdin
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PodcastClipper. All rights reserved.
        </div>
      </Card>
    </footer>
  );
}
