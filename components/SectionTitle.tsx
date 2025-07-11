// *********************
// Role of the component: Section title that can be used on any page
// Name of the component: SectionTitle.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <SectionTitle />
// Input parameters: {title: string; path: string}
// Output: div containing h1 for page title and p for page location path 
// *********************

import React from 'react'

const SectionTitle = ({title, path} : {title: string; path: string}) => {
  return (
    <div className='h-[200px] border-b pt-12 border-mopao-grey bg-mopao-bg mb-2 max-sm:h-[160px] max-sm:pt-12'>
        <h1 className='section-title-title text-6xl text-center mb-6 max-md:text-6xl max-sm:text-4xl text-mopao-green max-sm:mb-2 font-roboto'>{ title }</h1>
        <p className='section-title-path text-lg text-center max-sm:text-lg text-mopao-text font-roboto'>{ path }</p>
    </div>
  )
}

export default SectionTitle