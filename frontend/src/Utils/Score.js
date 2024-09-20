const initialScore = localStorage.getItem("score") ? JSON.parse(localStorage.getItem("score")) : {
  wins: 0,
  tie: 0,
  lost: 0
};

export default function ScoreCalc(myPick, oppoPick) {
  let score = initialScore;
  let state;
  if (myPick === oppoPick) {
    score.tie += 1;
    state = "tie"
  } else if (
    (myPick === "Rock" && oppoPick === "Scissor") ||
    (myPick === "Paper" && oppoPick === "Rock") ||
    (myPick === "Scissor" && oppoPick === "Paper")
  ) {
    score.wins += 1;
    state = "win"
  } else if (
    (myPick === "Scissor" && oppoPick === "Rock") ||
    (myPick === "Rock" && oppoPick === "Paper") ||
    (myPick === "Paper" && oppoPick === "Scissor")
  ) {
    score.lost += 1;
    state = "lost"
  }
  localStorage.setItem("score", JSON.stringify(score));
  return state;
}