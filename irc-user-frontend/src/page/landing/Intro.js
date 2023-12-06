import React from 'react'
import image from './images/icons8-flight-64.png'
import { Box, Button, Typography } from '@mui/material'

const Intro = () => {
	return (
		// bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]
		// dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]
		<section className="flex flex-col justify-center bg-blue-50 h-[calc(100vh-60px)]">
			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10">
				<a
					href="#"
					className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full"
				>
					<span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
						New
					</span>{" "}
					<span className="text-sm font-medium">
						Download your Compliance Calendar
					</span>
					<svg
						className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 6 10"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="m1 9 4-4-4-4"
						/>
					</svg>
				</a>
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
					Real Time Compliance Management
				</h1>
				<p className="mb-10 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
					Regulators, Compliance, Due Dates, Applicability thresholds, notifications, CRM, automations, integrations, regular updates, integrated dashboards, all in a single frame - Just a Click Away
				</p>

				{/* button */}
				<div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
					<a
						href="/login"
						className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
					>
						Get started
						<svg
							className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</a>
					<a
						href="#about"
						className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
					>
						Learn more
					</a>
				</div>
			</div>
		</section>

		// <Box sx={{ backgroundColor: '#e8f5fd' }}>
		//     <Box sx={{ padding: '50px', maxWidth: '500px' }}>
		//         <Typography sx={{ fontSize: '2rem', fontWeight: '400' }} gutterBottom >We empower you to deliver the best</Typography>
		//         <Typography variant='h2' sx={{ fontSize: '2.8rem' }} gutterBottom >Real Time Compliance Management</Typography>
		//         <Typography sx={{ fontSize: '1.2rem' }} gutterBottom >Regulators, Compliance, Due Dates, Applicability thresholds, notifications, CRM, automations, integrations, regular updates, integrated dashboards, all in a single frame - Just a Click Away</Typography>
		//         <Box sx={{
		//             margin: '20px 0', display: {
		//                 xs: 'column',
		//                 md: 'row'
		//             }
		//         }} >
		//             <Button variant='contained' sx={{ margin: '10px 0px', borderRadius: 5, padding: '10px 20px', backgroundColor: '#0034ac' }} >
		//                 Download your Compliance Calendar
		//             </Button>
		//             <Button variant='outlined' sx={{ margin: '10px 0px', borderRadius: 5, padding: '10px 20px', color: '#0034ac', border: '1px solid #1c00ac' }} >
		//                 Scedule a Demo
		//             </Button>
		//         </Box>
		//     </Box>
		// </Box>
	)
}

export default Intro
