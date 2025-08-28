export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Little Lemon</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              A family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4">Contact Info</h4>
            <address className="text-gray-300 not-italic text-sm sm:text-base space-y-1">
              <p>123 Mediterranean Ave</p>
              <p>Chicago, IL 60601</p>
              <p className="mt-2">Phone: (312) 555-0123</p>
              <p>Email: info@littlelemon.com</p>
            </address>
          </div>

          <div className="sm:col-start-1 lg:col-start-3">
            <h4 className="text-lg sm:text-xl font-semibold mb-4">Hours</h4>
            <div className="text-gray-300 text-sm sm:text-base space-y-1">
              <p>Monday - Thursday: 11am - 10pm</p>
              <p>Friday - Saturday: 11am - 11pm</p>
              <p>Sunday: 12pm - 9pm</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 sm:pt-8 text-center text-gray-300">
          <p className="text-sm sm:text-base">&copy; 2024 Little Lemon Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
