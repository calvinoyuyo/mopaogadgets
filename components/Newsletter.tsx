// *********************
// Role of the component: Signup to the newsletter component by leaving email adress
// Name of the component: Newsletter.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Newsletter />
// Input parameters: no input parameters
// Output: Section with the email input and some text
// *********************

import React from 'react'

const Newsletter = () => {
  return (
    <div className="bg-white py-5 sm:py-24 lg:py-20">
    <div className="mx-auto grid justify-items-center max-w-screen-2xl grid-cols-1 gap-8 px-6 lg:grid-cols-12 lg:gap-6 lg:px-8">
      <div className="max-w-xl text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:col-span-7">
        <h2 className="inline sm:block lg:inline xl:block max-sm:text-lg">Want product news and updates?</h2>{' '}
        <p className="inline sm:block lg:inline xl:block max-sm:text-lg">Sign up for our newsletter.</p>
      </div>
      
      <div className="w-full max-w-md lg:col-span-5 lg:pt-2">
        <form className="flex gap-x-4">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Newsletter