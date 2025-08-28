"use client"

import { useState } from "react"

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    const newErrors = {}
    if (!formData.name) {
      newErrors.name = "Full Name is required"
    }
    if (!formData.email) {
      newErrors.email = "Email Address is required"
    }
    if (!formData.phone) {
      newErrors.phone = "Phone Number is required"
    }
    if (!formData.date) {
      newErrors.date = "Date is required"
    }
    if (!formData.time) {
      newErrors.time = "Time is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Submit form logic here
      console.log("Form submitted:", formData)
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
              errors.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
              errors.email ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
            errors.phone ? "border-red-300" : "border-gray-300"
          }`}
          placeholder="Enter your phone number"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
              errors.date ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Time *
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
              errors.time ? "border-red-300" : "border-gray-300"
            }`}
          >
            <option value="">Select time</option>
          </select>
          {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
        </div>

        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Guests
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
            className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
          ></select>
        </div>
      </div>

      <div>
        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
          Special Requests
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          rows={3}
          value={formData.specialRequests}
          onChange={handleInputChange}
          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
          placeholder="Any dietary restrictions, special occasions, or other requests..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
          isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Make Reservation"}
      </button>
    </form>
  )
}

export default ReservationForm
