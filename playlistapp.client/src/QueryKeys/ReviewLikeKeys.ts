const ReviewLikeKeys = {
  AddReviewLike: ["ReviewLike", "AddReviewLike"] as const,
  GetAllReviewLikesByUser: ["ReviewLike", "GetAllReviewLikesByUser"] as const,
  RemoveReviewLike: ["ReviewLike", "RemoveReviewLike"] as const,
  UpdateReviewLike: ["ReviewLike", "UpdateReviewLike"] as const,
  GetReviewLike: ["ReviewLike", "GetReviewLike"] as const,
};

export default ReviewLikeKeys;
