import Link from 'next/link';
import { PiSmileySadLight } from "react-icons/pi";
 
export default function NotFound() {
  return (
    <main className="not-found">
      <PiSmileySadLight />
      <h2 >404 Not Found</h2>
      <p>Could not find the product.</p>
      <Link
        href="/products/"
      >
        Go Back
      </Link>
    </main>
  );
}