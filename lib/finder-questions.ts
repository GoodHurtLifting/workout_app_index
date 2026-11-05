export type FinderQuestion = {key:string;title:string;help:string;options:string[];multiple?:boolean};
import { adjacentFeatureOptions } from "./adjacent-features.ts";
export { adjacentFeatureOptions } from "./adjacent-features.ts";
export const finderQuestions:FinderQuestion[] = [
  {key:"platform",title:"Where will you use the app?",help:"We will keep apps that support your chosen platform. Choose No preference to explore across devices.",options:["Android","iPhone","Web","No preference"]},
  {key:"goal",title:"What do you want help with?",help:"Choose your main training goal. You can compare other strengths in each profile.",options:["Build muscle","Get stronger","Powerlifting","General fitness","Learn resistance training","Stay consistent"]},
  {key:"level",title:"How experienced are you?",help:"Think about your experience with the training you want to do.",options:["Completely new","Beginner","Intermediate","Advanced","Not sure"]},
  {key:"planning",title:"How do you want the app to guide your training?",help:"Choose the relationship you want with the app, from a complete path to a simple logbook.",options:["Show me the next workout, with no decisions needed","Give me a few proven programs to choose from","Adjust the workout based on my recent training","Let me build exactly what I want","Just stay out of the way while I log"]},
  {key:"equipment",title:"What will you train with?",help:"Choose the equipment or setting you need the app to support.",options:["Commercial gym","Home gym","Dumbbells only","Barbell and plates","Bodyweight","It varies"]},
  {key:"priority",title:"Which extra would make the biggest difference?",help:"Pick one priority. This helps order compatible options; it does not replace your platform or access requirements.",options:["Fast logging","Expert programs","Automatic progression","Detailed analytics","Built-in motivation","Community","Human coaching","Offline use"]},
  {key:"extras",title:"What else would you like the app to include?",help:"Optional: check all that apply. These are preferences, not requirements. We only count features supported by the catalog information; some capabilities remain unconfirmed.",options:[...adjacentFeatureOptions],multiple:true},
  {key:"ai",title:"What role are you comfortable giving AI?",help:"We distinguish AI-generated training from optional AI features. Unknown AI use cannot satisfy Avoid all AI.",options:["Avoid all AI","Okay if it is optional","AI-assisted features are okay","I want AI-generated training","No preference"]},
  {key:"budget",title:"What access and price work for you?",help:"Free means the training experience you chose is usable without a paid subscription or time-limited trial. Check current offers before purchasing.",options:["Free only","Up to $5 monthly","Up to $10 monthly","Up to $20 monthly","One-time purchase","Price is not a major factor"]},
];

const planningJobs:Record<string,string>={
  "Show me the next workout, with no decisions needed":"Give me a complete program",
  "Give me a few proven programs to choose from":"Let me choose a proven program",
  "Adjust the workout based on my recent training":"Adapt training for me",
  "Let me build exactly what I want":"Help me build my own workouts",
  "Just stay out of the way while I log":"Log workouts quickly",
};
export function normalizeFinderAnswers(answers:Record<string,string>):Record<string,string> {
  return answers.job || !planningJobs[answers.planning] ? answers : {...answers,job:planningJobs[answers.planning]};
}


export function selectedAdjacentFeatures(value:string|undefined):Array<typeof adjacentFeatureOptions[number]> {
  const selected = new Set((value ?? "").split("|"));
  return adjacentFeatureOptions.filter(option => selected.has(option));
}

export function validFinderAnswers(value:unknown):value is Record<string,string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const answers = value as Record<string,unknown>;
  return finderQuestions.every(question => {
    const answer = answers[question.key];
    // The new optional step must not invalidate previously saved finder results.
    if (question.multiple) return answer === undefined || typeof answer === "string" &&
      (answer === "" || answer === "Not sure" || answer.split("|").every(option => question.options.includes(option)));
    return typeof answer === "string" && (question.options.includes(answer) || answer === "Not sure");
  });
}
