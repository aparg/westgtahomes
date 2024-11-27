import React from "react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Kurpa Patel",
      date: "Jan 24, 2024",
      rating: 5,
      content:
        "Exceptional Realtor - 5 Stars! I recently had the pleasure of working with Sam Valji from Bay Street Group. I am grateful for the outstanding service I received. From the beginning to the end, Sam demonstrated a level of professionalism and expertise that truly sets him apart. In addition to his professional qualities, Sam is personable and approachable. We are happy with our home purchase, thanks to Sam’s guidance. I wholeheartedly recommend Sam Valji and his team to anyone in search of good realtor. Thank you Sam, for your exceptional service and commitment to your clients.",
    },
    {
      id: 2,
      name: "David H",
      date: "Jun 13, 2023",
      rating: 5,
      content:
        "I worked with Sam on a time-sensitive purchase. I found him to be highly professional in all interactions. I appreciated his prompt responses, and follow up to my concerns. To this end, I found Sam to be genuinely interested in helping me out, which is quite refreshing. This was apparent when he went above and beyond to follow up and offer connections/further assistance after the business transaction was complete. I would certainly recommend him to a family member, and would be pleased to work with him again. Thanks for your help Sam!",
    },
    {
      id: 3,
      name: "Mithushaa Berinpalingam",
      date: "Apr 27, 2023",
      rating: 5,
      content:
        "We worked with Sam to buy our first home and he made the entire experience seamless. He is very professional, knowledgeable and very hardworking. He was transparent with us throughout the whole process and ensured our requirements were met. He is very genuine and made us feel comfortable when making decisions. We are grateful for Sam for helping us secure our first home and we would highly recommend him to anyone requiring real estate related services!",
    },
    {
      id: 4,
      name: "Pooja Patel",
      date: "Mar 17, 2023",
      rating: 5,
      content:
        "Sam is not only a great broker but also a warm and friendly person. He remained in touch with us and never tried to rush us into decision making although we were not ready to buy a property and eventually we ended up buying our first home through him. He went above and beyond to ensure we got the very house of our dreams. He is prompt with communication and well connected with relevant professionals. Extremely grateful to work with him!",
    },
  ];

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <span key={index} className="text-yellow-400">
        ★
      </span>
    ));
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4">
        What our customers say
      </h2>
      <p className="text-gray-600 text-center mb-12">
        Don't just take our word for it - hear from some of our satisfied
        customers
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-gray-500 text-sm">{review.date}</p>
              </div>
            </div>
            <div className="mb-4">{renderStars(review.rating)}</div>
            <p className="text-gray-600 text-sm">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
