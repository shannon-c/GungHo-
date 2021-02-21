import similarity from 'compute-cosine-similarity';

function getPoseVector(pose) {
  const xPos = pose.keypoints.map((k) => k.position.x);
  const yPos = pose.keypoints.map((k) => k.position.y);

  const minX = Math.min(...xPos);
  const minY = Math.min(...yPos);

  const vector = [];
  for (let i = 0; i < xPos.length; i++) {
    vector.push(xPos[i] - minX);
    vector.push(yPos[i] - minY);
  }
  return vector;
}

function cosineDistanceMatching(poseVector1, poseVector2) {
  const cosineSimilarity = similarity(poseVector1, poseVector2);
  const distance = 2 * (1 - cosineSimilarity);
  return Math.sqrt(distance);
}

export const poseSimilarity = (pose1, pose2) => {
  const poseVector1 = getPoseVector(pose1);
  const poseVector2 = getPoseVector(pose2);
  return cosineDistanceMatching(poseVector1, poseVector2);
};