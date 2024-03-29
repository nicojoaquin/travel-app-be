import Review from '../models/review.js';

export const addReview = async reviewData => {
  console.log('reviewData: ', reviewData);
  const { placeId, user } = reviewData;

  // Check if the user has already made a review for the same placeId
  const existingReview = await Review.findOne({ placeId, user });

  if (existingReview) {
    // Update the existing review
    existingReview.review = reviewData.review;
    existingReview.rating = reviewData.rating;
    existingReview.update = new Date();
    await existingReview.save();
    return existingReview;
  } else {
    // Create a new review
    const newReview = new Review(reviewData);
    await newReview.save();
    return newReview;
  }
};

export const deleteReview = async reviewId => {
  const result = await Review.findByIdAndDelete(reviewId);
  return result;
};

export const getReviews = async () => {
  const reviews = await Review.find();
  return reviews;
};

export const getReviewsByUser = async userId => {
  const reviews = await Review.find({ user: userId });
  return reviews;
};

// Update the getReviewsByPlaceId function
export const getReviewsByPlaceId = async placeId => {
  try {
    const reviews = await Review.find({ placeId: placeId })
      .populate({
        path: 'user',
        select: 'username profile',
      })
      .exec();

    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error; // Rethrow the error for handling in the calling function or component
  }
};

export const getReviewsLengthByPlaceId = async placeId => {
  try {
    const reviews = await Review.find({ placeId: placeId });
    console.log('rev length', reviews.length);
    return reviews.length;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error; // Rethrow the error for handling in the calling function or component
  }
};

export const getReviewById = async reviewId => {
  const review = await Review.findById(reviewId);
  return review;
};

export const updateReview = async (reviewId, updatedData) => {
  return Review.findByIdAndUpdate(reviewId, updatedData, { new: true });
};

export const calculateAverageRating = async placeId => {
  try {
    const reviews = await Review.find({ placeId });
    const totalRatings = reviews.reduce(
      (sum, review) => sum + parseInt(review.rating, 10),
      0,
    );

    if (reviews.length === 0) {
      return 0; // Return 0 if there are no reviews to avoid division by zero
    }

    const averageRating = totalRatings / reviews.length;
    return averageRating;
  } catch (error) {
    console.error('Error calculating average rating:', error);
    throw error; // Rethrow the error for handling in the calling function or component
  }
};
