import React from 'react'

const data = [
  // {
  //     title: 'Essential',
  //     price: '1650',
  //     discount: '10% Discount when Billed Annually INR 5 per eSign',
  //     list: ['1 user', '10 documents signed per month', 'Upload and Sign', 'Document Store', 'Profile Management', 'Reminders and Notifications', 'Activity Logs', 'Google Drive/Dropbox Integration']

  // },
  {
    title: 'Essential',
    price: '1650',
    discount: '10% Discount when Billed Annually INR 5 per eSign',
    list: ['1 user', '10 documents signed per month', 'Upload and Sign', 'Document Store', 'Profile Management', 'Reminders and Notifications', 'Activity Logs', 'Google Drive/Dropbox Integration']

  },
  {
    title: 'Essential',
    price: '1650',
    discount: '10% Discount when Billed Annually INR 5 per eSign',
    list: ['1 user', '10 documents signed per month', 'Upload and Sign', 'Document Store', 'Profile Management', 'Reminders and Notifications', 'Activity Logs', 'Google Drive/Dropbox Integration']

  },
  {
    title: 'Essential',
    price: '1650',
    discount: '10% Discount when Billed Annually INR 5 per eSign',
    list: ['1 user', '10 documents signed per month', 'Upload and Sign', 'Document Store', 'Profile Management', 'Reminders and Notifications', 'Activity Logs', 'Google Drive/Dropbox Integration']

  }
]
const Pricing = () => {

  const [alignment, setAlignment] = React.useState('left');
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <section id="pricing" className="bg-blue-50">
      <div className="py-24 px-4 mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl">
            Here at Instade we focus on markets where technology, innovation, and
            capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* Pricing Card */}
          {
            data?.map(e =>
              <div className="flex flex-col p-10 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow-md">
                <h3 className="mb-4 text-2xl font-semibold">{e?.title}</h3>
                <p className="mb-2 font-light text-gray-500 sm:text-lg">
                  Best option for personal use &amp; for your next project.
                </p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mb-4 mr-2 text-5xl font-extrabold">₹{e?.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                {/* List */}
                <ul role="list" className="mb-9 space-y-4 text-left">
                  {
                    e?.list?.map(data =>
                      <li className="flex items-center space-x-3">
                        {/* Icon */}
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-black">{data}</span>
                      </li>
                    )
                  }
                </ul>
                <a href="#" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Get started
                </a>
              </div>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default Pricing
