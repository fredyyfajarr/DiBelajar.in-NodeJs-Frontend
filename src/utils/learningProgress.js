export const REQUIRED_FORUM_POSTS = 2;

export const getMaterialProgress = (progress = [], materialId) => {
  if (!materialId) return null;

  return progress.find(
    (item) => item.materialId?.toString() === materialId.toString()
  );
};

export const materialHasTest = (material) =>
  Array.isArray(material?.testContent) && material.testContent.length > 0;

export const getMaterialProgressState = (material, progress) => {
  const hasTest = materialHasTest(material);
  const testCompleted = progress?.hasCompletedTest || false;
  const assignmentSubmitted = progress?.hasSubmittedAssignment || false;
  const forumPostCount = progress?.forumPostCount || 0;
  const forumCompleted = forumPostCount >= REQUIRED_FORUM_POSTS;
  const materialCompleted = progress?.isCompleted || false;

  const completedSteps = [
    ...(hasTest ? [testCompleted] : []),
    assignmentSubmitted,
    forumCompleted,
  ].filter(Boolean).length;
  const totalSteps = hasTest ? 3 : 2;

  return {
    hasTest,
    testCompleted,
    assignmentSubmitted,
    forumPostCount,
    forumCompleted,
    materialCompleted,
    canCompleteMaterial:
      (!hasTest || testCompleted) &&
      assignmentSubmitted &&
      forumCompleted &&
      !materialCompleted,
    progressPercentage:
      totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0,
  };
};
