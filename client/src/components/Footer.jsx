import React from 'react'

function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8 fixed bottom-0 w-full">
        <div className="flex justify-center">
          <p className="text-lg">Scholar Shop</p>
        </div>
        <div className="flex justify-between px-4 mt-4">
          <div className="flex flex-col">
            <p>Privacy Policy</p>
            <p>Terms and Conditions</p>
            <p>About</p>
          </div>
          <div className="flex items-center w-1/2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-700 text-white px-3 py-1 rounded"
            />
            <button className="ml-2 bg-blue-500 text-white px-4 py-1 rounded">Subscribe</button>
          </div>
          <div className="flex flex-col">
            <p>Become Partner</p>
            <p>Refund Policy</p>
            <p>Contact</p>
          </div>
        </div>
      </footer>
    );
  }
  

export default Footer
