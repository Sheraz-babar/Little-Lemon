import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="hero-section bg-yellow-400 text-gray-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance">
              Little Lemon
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6">Chicago</h2>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
            <button className="bg-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-700 transition-colors w-full sm:w-auto">
              Reserve a Table
            </button>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-balance">
              Our Specialties
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src="/greek-salad-with-fresh-vegetables.png"
                  alt="Greek Salad"
                  className="w-full h-48 sm:h-56 lg:h-48 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Greek Salad</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
                    Fresh vegetables, olives, and feta cheese with our signature dressing.
                  </p>
                  <span className="text-green-600 font-bold text-lg sm:text-xl">$12.99</span>
                </div>
              </article>

              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src="/tomato-basil-bruschetta.png"
                  alt="Bruschetta"
                  className="w-full h-48 sm:h-56 lg:h-48 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Bruschetta</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
                    Grilled bread rubbed with garlic and topped with diced tomatoes.
                  </p>
                  <span className="text-green-600 font-bold text-lg sm:text-xl">$8.99</span>
                </div>
              </article>

              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
                <img
                  src="/lemon-dessert-cake-slice.png"
                  alt="Lemon Dessert"
                  className="w-full h-48 sm:h-56 lg:h-48 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Lemon Dessert</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
                    Traditional Greek lemon cake with a modern twist.
                  </p>
                  <span className="text-green-600 font-bold text-lg sm:text-xl">$6.99</span>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
