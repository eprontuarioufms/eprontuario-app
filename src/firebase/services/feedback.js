import { FEEDBACK } from "../../constants";
import { db } from "../../firebase";

export async function sendFeedback(feedback) {
  await db.collection(FEEDBACK).add(feedback);
}

export async function getFeedback() {
  const feedbackRefs = await db.collection(FEEDBACK).get();
  return feedbackRefs.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
}
