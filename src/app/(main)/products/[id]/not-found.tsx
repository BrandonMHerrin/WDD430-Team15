import Link from 'next/link';
import { PiSmileySadLight } from "react-icons/pi";
 
export default function NotFound() {
  return (
        <div className="not-found">
          <PiSmileySadLight className='face'/>
          <h2 >Something went wrong!</h2>
          <p>Could not find the product.</p>
          <Link
            href="/products/"
            className='gback-btn'
          >
            Go Back
          </Link>
        </div>
      
  );
}