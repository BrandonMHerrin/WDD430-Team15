import MainLayout from '@/app/(main)/layout';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import { PiSmileySadLight } from "react-icons/pi";
 
export default function NotFound() {
  return (
    
      <MainLayout>
        <div className="not-found">
          <PiSmileySadLight />
          <h2 >404 Not Found</h2>
          <p>Could not find the product.</p>
          <Link
            href="/products/"
          >
            Go Back
          </Link>
        </div>
      </MainLayout>
      
  );
}