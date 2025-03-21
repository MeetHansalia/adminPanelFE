// components/BusImage.js
import Image from "next/image";

const BusImage = () => {
  return (
    <div className='relative h-screen w-full'>
      {/* Background Image */}
      <div className='h-1/4 bottom-0'>
        <Image
          src='/Rectangle.png' // Replace with your background image
          alt='Background'
          layout='fill'
          objectFit='cover'
          className='bottom-0 absolute'
        />
      </div>

      {/* Bus Image */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg'>
        <Image
          src='/bus.png' // Replace with your bus image
          alt='Bus'
          layout='responsive'
          width={1000} // Adjust width as needed
          height={600} // Adjust height as needed
          objectFit='contain'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>

      {/* Logo */}
      <div className='absolute top-8 left-8'>
        <Image
          src='/logo.png' // Replace with your logo image
          alt='Logo'
          width={150} // Adjust width as needed
          height={50} // Adjust height as needed
          objectFit='contain'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
    </div>
  );
};

export default BusImage;
