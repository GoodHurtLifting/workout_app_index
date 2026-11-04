export const finderQuestions = [
  {key:"platform",title:"Where will you use the app?",help:"We will keep apps that support your chosen platform. Choose No preference to explore across devices.",options:["Android","iPhone","Web","No preference"]},
  {key:"goal",title:"What do you want help with?",help:"Choose your main training goal. You can compare other strengths in each profile.",options:["Build muscle","Get stronger","Powerlifting","General fitness","Learn resistance training","Stay consistent"]},
  {key:"level",title:"How experienced are you?",help:"Think about your experience with the training you want to do.",options:["Completely new","Beginner","Intermediate","Advanced","Not sure"]},
  {key:"planning",title:"How do you want the app to guide your training?",help:"Choose the relationship you want with the app, from a complete path to a simple logbook.",options:["Show me the next workout, with no decisions needed","Give me a few proven programs to choose from","Adjust the workout based on my recent training","Let me build exactly what I want","Just stay out of the way while I log"]},
  {key:"equipment",title:"What will you train with?",help:"Choose the equipment or setting you need the app to support.",options:["Commercial gym","Home gym","Dumbbells only","Barbell and plates","Bodyweight","It varies"]},
  {key:"priority",title:"Which extra would make the biggest difference?",help:"Pick one priority. This helps order compatible options; it does not replace your platform or access requirements.",options:["Fast logging","Expert programs","Automatic progression","Detailed analytics","Built-in motivation","Community","Human coaching","Offline use"]},
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
