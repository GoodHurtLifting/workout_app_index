# Adjacent feature audit — November 5, 2026

Scope: all 37 app IDs returned by the public catalog on November 5, 2026. Six categories: nutrition, recovery, mindfulness, cardio, body composition and wearable integration. Public primary sources only; no hands-on testing, sign-in, developer correspondence or database changes.

Documented means the publisher/store describes the capability, not that WAI verified it works. Not established is an unknown, never a confirmed no. Separate product does not earn in-app preference points. Conflicting access terms do not earn points pending reconciliation. Platform and known paid-feature restrictions must be respected. An app-store navigation link to Apple Watch is not evidence; app compatibility, description or release notes must identify it. Generic health sync, calorie-burn estimates, rest timers, weight-only records and outcome promises are insufficient for unrelated feature claims.

Implementation: `lib/adjacent-feature-research.ts` contains all 222 category decisions, dated source links and concise scope notes. Public catalog serialization attaches this source-backed supplement by existing app ID. Existing saved edits, publication snapshots, review statuses and historical scores are not changed. The questionnaire, profile section and comparison table use these same facts. No commit, push or deployment is authorized by this audit.

## Coverage matrix

D = documented; ? = not established; S = separate product; C = conflicting; N = documented unavailable.

| App | Nutrition | Recovery | Mindfulness | Cardio | Body composition | Wearables |
|---|---|---|---|---|---|---|
| Aldo Coach | ? | D | ? | D | ? | D |
| ALO Wellness Club | D | D | D | D | ? | D |
| Alpha Progression | ? | ? | ? | ? | ? | ? |
| Apple Fitness+ | ? | D | D | D | ? | D |
| BODi | D | ? | ? | D | ? | D |
| Boostcamp | ? | ? | N | D | ? | ? |
| Caliber | D | ? | ? | D | D | D |
| Centr | D | D | D | D | ? | D |
| Evolve | D | ? | ? | ? | ? | ? |
| Fitbod | ? | D | ? | D | D | D |
| FitnessAI | ? | ? | ? | D | D | D |
| FitNotes | D | ? | ? | D | D | ? |
| Freeletics | S | D | ? | D | ? | D |
| Future | D | ? | ? | ? | ? | D |
| Gravl | S | D | ? | ? | ? | D |
| Gymshark Training | ? | ? | ? | ? | ? | ? |
| Hevy | ? | ? | ? | D | C | D |
| Home Workout – No Equipment | ? | ? | ? | D | ? | ? |
| iFIT | ? | D | D | D | ? | D |
| JEFIT | ? | D | ? | D | D | D |
| JuggernautAI | ? | D | ? | ? | ? | ? |
| Ladder | D | D | ? | D | ? | D |
| LES MILLS+ | D | D | D | D | ? | ? |
| Nike Training Club | D | D | D | D | ? | D |
| Peloton App | ? | D | D | D | ? | D |
| RP Hypertrophy | S | D | ? | ? | ? | ? |
| Seven | ? | D | ? | D | ? | D |
| SHRED | ? | ? | ? | D | ? | D |
| SmartGym | ? | D | ? | D | ? | D |
| StrengthLog | ? | ? | ? | D | D | D |
| Strong | D | ? | ? | D | D | D |
| StrongLifts | ? | ? | ? | ? | ? | D |
| Sweat | D | D | ? | D | ? | D |
| Sworkit | D | D | D | D | ? | D |
| The Lift League | ? | ? | ? | ? | ? | ? |
| TrainHeroic | D | D | ? | D | ? | ? |
| Volt Athletics | ? | D | ? | D | ? | N |

## Claim and source log

### Aldo Coach (`aldo-coach`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375)
- **Recovery — Documented:** Release notes describe a Recovery strip using sleep, resting heart rate and HRV from Apple Health. [source 1](https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375)
- **Cardio — Documented:** Release notes describe runs/walks with GPS pace, distance, splits and heart-rate zones, plus pool laps on Apple Watch. [source 1](https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375)
- **Body composition — Not established:** Reading body weight through Apple Health does not establish body-fat or lean-mass tracking. [source 1](https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375)
- **Wearable integration — Documented:** Apple Watch set logging, haptic rest alerts, coaching replies, heart rate and cardio tracking; watchOS 10+. [source 1](https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375)

### ALO Wellness Club (`alo-wellness-club`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Nutrition/wellness content is advertised; meal/macro logging was not established. [source 1](https://apps.apple.com/us/app/alo-wellness-club/id601617403)
- **Recovery — Documented:** Restorative and Yin yoga plus sleep-oriented wellness content; not a recovery score. [source 1](https://apps.apple.com/us/app/alo-wellness-club/id601617403)
- **Mindfulness — Documented:** Guided meditation, breathwork, Yoga Nidra and sound-healing sessions are listed. [source 1](https://apps.apple.com/us/app/alo-wellness-club/id601617403)
- **Cardio — Documented:** Cardio, HIIT and dance classes are listed. [source 1](https://apps.apple.com/us/app/alo-wellness-club/id601617403)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://apps.apple.com/us/app/alo-wellness-club/id601617403), [source 2](https://wellnessclub.aloyoga.com/)
- **Wearable integration — Documented:** The US listing identifies Apple Watch compatibility. Exact on-watch controls were not established. [source 1](https://apps.apple.com/us/app/alo-wellness-club/id601617403)

### Alpha Progression (`alpha-progression`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://alphaprogression.com/en), [source 2](https://alphaprogression.com/en/blog/alpha-progression-guide)
- **Recovery — Not established:** Deloads and RIR guidance are training tools; a separate recovery feature was not established. [source 1](https://alphaprogression.com/en), [source 2](https://alphaprogression.com/en/blog/alpha-progression-guide)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://alphaprogression.com/en), [source 2](https://alphaprogression.com/en/blog/alpha-progression-guide)
- **Cardio — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://alphaprogression.com/en), [source 2](https://alphaprogression.com/en/blog/alpha-progression-guide)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://alphaprogression.com/en), [source 2](https://alphaprogression.com/en/blog/alpha-progression-guide)
- **Wearable integration — Not established:** The official guide says dedicated Apple Watch and Wear OS workout apps are on the roadmap, not currently offered. A separate wearable-data connection was not established. [source 1](https://alphaprogression.com/en), [source 2](https://alphaprogression.com/en/blog/alpha-progression-guide)

### Apple Fitness+ (`apple-fitness-plus`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.apple.com/apple-fitness-plus/)
- **Recovery — Documented:** Mindful Cooldown sessions combine cooldown movement and mindfulness. [source 1](https://www.apple.com/apple-fitness-plus/)
- **Mindfulness — Documented:** Meditation sessions are included. [source 1](https://www.apple.com/apple-fitness-plus/)
- **Cardio — Documented:** Cycling, treadmill, rowing, HIIT and dance workouts are offered. [source 1](https://www.apple.com/apple-fitness-plus/)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.apple.com/apple-fitness-plus/)
- **Wearable integration — Documented:** Apple Watch, supported heart-rate earbuds and Bluetooth heart-rate monitors provide live workout metrics. [source 1](https://www.apple.com/apple-fitness-plus/)

### BODi (`bodi`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** The subscription includes meal plans and recipes; not a confirmed daily macro logger. [source 1](https://www.bodi.com/products/bodi-subscription)
- **Recovery — Not established:** The subscription page mentions scheduled recovery, but a dedicated recovery-content offering was not established from this source. [source 1](https://www.bodi.com/products/bodi-subscription)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.bodi.com/products/bodi-subscription)
- **Cardio — Documented:** HIIT, cardio and dance-cardio workouts are explicitly included. [source 1](https://www.bodi.com/products/bodi-subscription)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.bodi.com/products/bodi-subscription)
- **Wearable integration — Documented:** Apple Watch support requires a paired iPhone with BODi installed. The current support FAQ excludes Super Blocks from watch support. [source 1](https://faq.bodi.com/us/en/help?a=Supported-Apple-Watch-Devices-for-BODi---id--MazdCPp7RuSdxxX9Y6oQYg), [source 2](https://www.bodi.com/blog/stream-beachbody-demand-tv)

### Boostcamp (`boostcamp`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.boostcamp.app/features), [source 2](https://www.boostcamp.app/features/apple-health), [source 3](https://www.boostcamp.app/features/progress-photos)
- **Recovery — Not established:** The publisher describes recovery classes as outside Boostcamp’s scope; scheduled rest/deloads are not a separate recovery tool. [source 1](https://www.boostcamp.app/vs/ntc)
- **Mindfulness — Not available:** The publisher comparison explicitly places mindfulness outside Boostcamp’s scope. [source 1](https://www.boostcamp.app/vs/ntc)
- **Cardio — Documented:** The public library includes user-published HIIT plans with timed runs. This is limited program content, not GPS tracking or independently assessed program quality. [source 1](https://www.boostcamp.app/users/Tt0rF5-body-fat-loss-hiit)
- **Body composition — Not established:** Bodyweight and progress photos are documented; body-fat and lean-mass tracking are not established. Health sync explicitly excludes body fat. [source 1](https://www.boostcamp.app/features), [source 2](https://www.boostcamp.app/features/apple-health), [source 3](https://www.boostcamp.app/features/progress-photos)
- **Wearable integration — Not established:** Apple Health/Health Connect sync workouts and bodyweight, not heart rate. The publisher says there is no Apple Watch app yet; wearable workout controls are not established. [source 1](https://www.boostcamp.app/features), [source 2](https://www.boostcamp.app/features/apple-health), [source 3](https://www.boostcamp.app/features/progress-photos)

### Caliber (`caliber`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Nutrition data/targets and connected food apps are documented; personalized nutrition coaching is a separate paid service. [source 1](https://caliberstrong.com/), [source 2](https://caliberstrong.com/mcp/), [source 3](https://caliberstrong.freshdesk.com/support/solutions/folders/48000687948)
- **Recovery — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://caliberstrong.com/), [source 2](https://caliberstrong.com/mcp/), [source 3](https://caliberstrong.freshdesk.com/support/solutions/folders/48000687948)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://caliberstrong.com/), [source 2](https://caliberstrong.com/mcp/), [source 3](https://caliberstrong.freshdesk.com/support/solutions/folders/48000687948)
- **Cardio — Documented:** Manual/imported cardio activity records; personalized cardio programming is part of coaching. [source 1](https://caliberstrong.com/), [source 2](https://caliberstrong.com/mcp/)
- **Body composition — Documented:** Body-stat history includes body fat, weight and waist; this does not establish an in-app body-fat measurement. [source 1](https://caliberstrong.com/mcp/)
- **Wearable integration — Documented:** Apple Watch/Garmin activity syncing through health platforms; this is data sync, not a native watch workout logger. [source 1](https://caliberstrong.freshdesk.com/support/solutions/folders/48000687948)

### Centr (`centr`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Recipes and meal plans with recipe-completion tracking; support explicitly says this is not detailed daily calorie/macro logging. [source 1](https://help.centr.com/en-US/what-is-centr-coach-and-how-does-it-work-5977034), [source 2](https://help.centr.com/en-US/how-do-i-log-my-meals-3233655?isEmbedded=true)
- **Recovery — Documented:** Recovery programs and relaxation support are advertised. [source 1](https://help.centr.com/en-US/how-do-i-access-meditation-content-3233658?isEmbedded=true), [source 2](https://centr.com/pages/centr-coach-app)
- **Mindfulness — Documented:** Guided meditation and mindfulness sessions are included in the membership. [source 1](https://help.centr.com/en-US/how-do-i-access-meditation-content-3233658?isEmbedded=true)
- **Cardio — Documented:** HIIT, boxing and hybrid conditioning workouts are included. [source 1](https://help.centr.com/en-US/what-is-centr-coach-and-how-does-it-work-5977034)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://help.centr.com/en-US/what-is-centr-coach-and-how-does-it-work-5977034), [source 2](https://help.centr.com/en-US/how-do-i-access-meditation-content-3233658?isEmbedded=true), [source 3](https://centr.com/pages/centr-coach-app), [source 4](https://help.centr.com/en-US/how-do-i-connect-my-apple-watch-3233662), [source 5](https://help.centr.com/en-US/how-do-i-log-my-meals-3233655?isEmbedded=true)
- **Wearable integration — Documented:** Apple Watch connection through HealthKit tracks workout data; this does not establish standalone watch coaching. [source 1](https://help.centr.com/en-US/how-do-i-connect-my-apple-watch-3233662)

### Evolve (`evolve`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Personalized nutrition/macronutrient targets alongside strength programming; detailed food logging was not established. [source 1](https://www.evolvetrainingapp.com/)
- **Recovery — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.evolvetrainingapp.com/)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.evolvetrainingapp.com/)
- **Cardio — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.evolvetrainingapp.com/)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.evolvetrainingapp.com/)
- **Wearable integration — Not established:** No wearable connection was established for this specific Evolve product. Similarly named apps were not treated as the same product. [source 1](https://www.evolvetrainingapp.com/)

### Fitbod (`fitbod`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://help.fitbod.me/hc/en-us/articles/18213217448983-Body-Composition), [source 2](https://help.fitbod.me/hc/en-us/articles/360006269014-Muscle-Recovery), [source 3](https://help.fitbod.me/hc/en-us/categories/1500000286421-Features-and-Integrations)
- **Recovery — Documented:** Estimated per-muscle recovery derived from logged training; not a direct physiological measurement. [source 1](https://help.fitbod.me/hc/en-us/articles/360006269014-Muscle-Recovery)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://help.fitbod.me/hc/en-us/articles/18213217448983-Body-Composition), [source 2](https://help.fitbod.me/hc/en-us/articles/360006269014-Muscle-Recovery), [source 3](https://help.fitbod.me/hc/en-us/categories/1500000286421-Features-and-Integrations)
- **Cardio — Documented:** Cardio recommendations and logged cardio are documented; available choices may vary by platform. [source 1](https://help.fitbod.me/hc/en-us/articles/360006269014-Muscle-Recovery), [source 2](https://help.fitbod.me/hc/en-us/categories/1500000286421-Features-and-Integrations)
- **Body composition — Documented:** Manual entry and health-platform imports include body-fat percentage and lean mass on iOS and Android. Fitbod does not measure or calculate those values. [source 1](https://help.fitbod.me/hc/en-us/articles/18213217448983-Body-Composition)
- **Wearable integration — Documented:** Official integrations include Apple Watch and Wear OS. Check the relevant device guide for supported controls. [source 1](https://help.fitbod.me/hc/en-us/categories/1500000286421-Features-and-Integrations)

### FitnessAI (`fitnessai`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.fitnessai.com/), [source 2](https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156)
- **Recovery — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.fitnessai.com/), [source 2](https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.fitnessai.com/), [source 2](https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156)
- **Cardio — Documented:** The developer description lists personalized daily lifting and cardio plans. [source 1](https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156)
- **Body composition — Documented:** Paid BodyScan uses iPhone-camera images processed by Prism Labs to estimate body fat and lean mass. Availability and subscription terms differ from ordinary workout access; accuracy is a publisher claim, not verified here. [source 1](https://www.fitnessai.com/bodyscan)
- **Wearable integration — Documented:** Apple Watch compatibility is listed. Exact on-watch controls were not established. [source 1](https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156)

### FitNotes (`fitnotes`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Custom numeric measurements can record calorie or macro totals manually; no food database or meal-planning tool is established. [source 1](https://www.fitnotesapp.com/body_tracker/)
- **Recovery — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes)
- **Cardio — Documented:** Distance/time logging is supported alongside weight/reps; custom categories and exercises can be created. [source 1](https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes)
- **Body composition — Documented:** Body Weight and Body Fat are default Body Tracker measurements with history and progress graphs; users supply the values. [source 1](https://www.fitnotesapp.com/body_tracker/)
- **Wearable integration — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes)

### Freeletics (`freeletics`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Separate product:** Freeletics Nutrition is a separate download and coach subscription/bundle; not an included Training-app food logger. [source 1](https://help.freeletics.com/hc/en-us/articles/115004739849-Freeletics-Nutrition-Explained)
- **Recovery — Documented:** Training plans include cooldowns, mobility and recovery workouts. [source 1](https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212), [source 2](https://help.freeletics.com/hc/en-us/articles/115004739849-Freeletics-Nutrition-Explained)
- **Cardio — Documented:** HIIT, running, cycling and rowing are described; plan/access varies. [source 1](https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212), [source 2](https://help.freeletics.com/hc/en-us/articles/115004739849-Freeletics-Nutrition-Explained)
- **Wearable integration — Documented:** Apple Watch workout controls are listed under Training Coach features. [source 1](https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212)

### Future (`future`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Future Pro coaches provide general eating guidance and accountability, but do not prescribe custom meal plans or specific calorie/macro targets. Future Health is a distinct offering. [source 1](https://faq.future.co/en/articles/12240765-does-future-pro-include-nutrition)
- **Recovery — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://future.co/), [source 2](https://apps.apple.com/us/app/future-pro-personal-training/id1288178982), [source 3](https://future.co/health-coach/progress)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://future.co/), [source 2](https://apps.apple.com/us/app/future-pro-personal-training/id1288178982), [source 3](https://future.co/health-coach/progress)
- **Cardio — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://future.co/), [source 2](https://apps.apple.com/us/app/future-pro-personal-training/id1288178982), [source 3](https://future.co/health-coach/progress)
- **Body composition — Not established:** DEXA is advertised in the separate Future Health offering; it is not established as an included Future Pro app feature. [source 1](https://future.co/), [source 2](https://apps.apple.com/us/app/future-pro-personal-training/id1288178982), [source 3](https://future.co/health-coach/progress)
- **Wearable integration — Documented:** The Future Pro US listing includes Apple Watch; specific workout-control behavior was not independently verified. [source 1](https://apps.apple.com/us/app/future-pro-personal-training/id1288178982)

### Gravl (`gravl`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Separate product:** Gravl Macros has its own app downloads. Inclusion of this companion food logger in the workout app/subscription was not established. [source 1](https://gravl.ai/macros)
- **Recovery — Documented:** Per-muscle recovery tracking is advertised, including imported workout context. [source 1](https://gravl.ai/)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://gravl.ai/), [source 2](https://gravl.ai/macros)
- **Cardio — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://gravl.ai/), [source 2](https://gravl.ai/macros)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://gravl.ai/), [source 2](https://gravl.ai/macros)
- **Wearable integration — Documented:** Apple Watch, Wear OS and Garmin workout logging are advertised; health/activity connections are also listed. [source 1](https://gravl.ai/)

### Gymshark Training (`gymshark-training`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation. [source 1](https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app), [source 2](https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320)
- **Recovery — Not established:** The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation. [source 1](https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app), [source 2](https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320)
- **Mindfulness — Not established:** The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation. [source 1](https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app), [source 2](https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320)
- **Cardio — Not established:** The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation. [source 1](https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app), [source 2](https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320)
- **Body composition — Not established:** The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation. [source 1](https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app), [source 2](https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320)
- **Wearable integration — Not established:** The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation. [source 1](https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app), [source 2](https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320)

### Hevy (`hevy`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.hevyapp.com/features/), [source 2](https://www.hevyapp.com/compare/bevel/), [source 3](https://help.hevyapp.com/hc/en-us/articles/38279350428695-What-will-happen-to-my-account-if-I-switch-from-Pro-to-the-free-version), [source 4](https://www.hevyapp.com/compare/lyfta/)
- **Recovery — Not established:** Muscle-volume charts do not establish recovery monitoring; the publisher says there is no Muscle Freshness equivalent. [source 1](https://www.hevyapp.com/features/), [source 2](https://www.hevyapp.com/compare/bevel/), [source 3](https://help.hevyapp.com/hc/en-us/articles/38279350428695-What-will-happen-to-my-account-if-I-switch-from-Pro-to-the-free-version), [source 4](https://www.hevyapp.com/compare/lyfta/)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.hevyapp.com/features/), [source 2](https://www.hevyapp.com/compare/bevel/), [source 3](https://help.hevyapp.com/hc/en-us/articles/38279350428695-What-will-happen-to-my-account-if-I-switch-from-Pro-to-the-free-version), [source 4](https://www.hevyapp.com/compare/lyfta/)
- **Cardio — Documented:** Duration/distance exercise logging and cardio progress statistics; not a GPS running-coach claim. [source 1](https://www.hevyapp.com/compare/bevel/)
- **Body composition — Conflicting:** Body-fat entry is documented, but the support page makes it Pro-only while a comparison table lists BF% in Free. The access tier needs reconciliation. [source 1](https://help.hevyapp.com/hc/en-us/articles/38279350428695-What-will-happen-to-my-account-if-I-switch-from-Pro-to-the-free-version), [source 2](https://www.hevyapp.com/compare/lyfta/)
- **Wearable integration — Documented:** Workout logging on Apple Watch and Wear OS; device capabilities differ. [source 1](https://www.hevyapp.com/compare/bevel/)

### Home Workout – No Equipment (`home-workout-leap`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment)
- **Recovery — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment)
- **Cardio — Documented:** HIIT/bodyweight routines are advertised; this is not evidence of GPS cardio tracking. [source 1](https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment)
- **Wearable integration — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment)

### iFIT (`ifit`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://apps.apple.com/us/app/ifit-workouts/id1274601042)
- **Recovery — Documented:** Trainer-led stretching and mobility content are listed; not a readiness score. [source 1](https://apps.apple.com/us/app/ifit-workouts/id1274601042)
- **Mindfulness — Documented:** Mindfulness sessions are explicitly listed. [source 1](https://apps.apple.com/us/app/ifit-workouts/id1274601042)
- **Cardio — Documented:** Running, cycling, rowing, walking and HIIT content; some experiences use compatible machines. [source 1](https://apps.apple.com/us/app/ifit-workouts/id1274601042)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://apps.apple.com/us/app/ifit-workouts/id1274601042)
- **Wearable integration — Documented:** Apple Watch companion app is documented in compatibility and release notes; exact device behavior varies. [source 1](https://apps.apple.com/us/app/ifit-workouts/id1274601042)

### JEFIT (`jefit`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.jefit.com/), [source 2](https://www.jefit.com/watch), [source 3](https://apps.apple.com/us/app/jefit-workout-plan-gym-tracker/id449810000), [source 4](https://www.jefit.com/routines/112064/lean-and-large)
- **Recovery — Documented:** Muscle-recovery charts are advertised; estimates are not a direct physiological measurement. [source 1](https://www.jefit.com/), [source 2](https://apps.apple.com/us/app/jefit-workout-plan-gym-tracker/id449810000)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.jefit.com/), [source 2](https://www.jefit.com/watch), [source 3](https://apps.apple.com/us/app/jefit-workout-plan-gym-tracker/id449810000), [source 4](https://www.jefit.com/routines/112064/lean-and-large)
- **Cardio — Documented:** Published routines include walking/treadmill cardio entries; program content varies. [source 1](https://www.jefit.com/routines/112064/lean-and-large)
- **Body composition — Documented:** Body weight, body fat and circumference tracking are listed. [source 1](https://apps.apple.com/us/app/jefit-workout-plan-gym-tracker/id449810000)
- **Wearable integration — Documented:** Apple Watch and Wear OS logging, planned routines, timers and phone sync. [source 1](https://www.jefit.com/watch)

### JuggernautAI (`juggernaut-ai`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Answering a nutrition-readiness question does not establish meal plans, calorie logging or macro tracking. [source 1](https://www.juggernautai.app/)
- **Recovery — Documented:** Pre-session sleep, nutrition and recovery check-ins adjust training readiness and workload. [source 1](https://www.juggernautai.app/)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.juggernautai.app/)
- **Cardio — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.juggernautai.app/)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.juggernautai.app/)
- **Wearable integration — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.juggernautai.app/)

### Ladder (`ladder`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Built-in meal logging and macro tracking are advertised. The exact nutrition add-on entitlement was not established. [source 1](https://www.joinladder.com/), [source 2](https://www.joinladder.com/groups)
- **Recovery — Documented:** Selected teams include intentional recovery and mobility days; availability depends on the team. [source 1](https://www.joinladder.com/help-center/teams)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.joinladder.com/), [source 2](https://www.joinladder.com/help-center/teams), [source 3](https://www.joinladder.com/pricing), [source 4](https://www.joinladder.com/groups)
- **Cardio — Documented:** Selected teams include cardio, HIIT and conditioning; not every strength team has the same focus. [source 1](https://www.joinladder.com/help-center/teams)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.joinladder.com/), [source 2](https://www.joinladder.com/help-center/teams), [source 3](https://www.joinladder.com/pricing), [source 4](https://www.joinladder.com/groups)
- **Wearable integration — Documented:** Apple Watch connection is explicitly included in Pro. Group marketing also names Garmin/Fitbit, but detailed behavior was not established. [source 1](https://www.joinladder.com/pricing), [source 2](https://www.joinladder.com/groups)

### LES MILLS+ (`les-mills-plus`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Equipment-store FAQ describes nutrition knowledge with LES MILLS+; educational content, not meal/macro logging. [source 1](https://shop.lesmills.com/us/faqs)
- **Recovery — Documented:** Active recovery, stretching and foam-rolling sessions are listed. [source 1](https://www.lesmills.com/ondemand)
- **Mindfulness — Documented:** Mindfulness and meditation content is listed. [source 1](https://www.lesmills.com/ondemand)
- **Cardio — Documented:** Cardio, cycling and HIIT classes are listed; content varies between Base and Premium. [source 1](https://www.lesmills.com/ondemand)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.lesmills.com/ondemand), [source 2](https://shop.lesmills.com/us/faqs)
- **Wearable integration — Not established:** The supported-device guide covers mobile/TV streaming but does not establish a wearable connection. A watch.lesmillsondemand.com address refers to streaming, not a smartwatch app. [source 1](https://support.lesmillsondemand.com/support/solutions/articles/6000230320-what-devices-can-i-use-to-watch-les-mills-on-demand-)

### Nike Training Club (`nike-training-club`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Nutrition tips and educational guidance; not a food or macro logger. [source 1](https://www.nike.com/ntc-app)
- **Recovery — Documented:** Recovery content includes self-myofascial release, stretching and walking. [source 1](https://apps.apple.com/us/app/nike-training-club/id301521403)
- **Mindfulness — Documented:** Mindfulness guidance is listed in the app description. [source 1](https://apps.apple.com/us/app/nike-training-club/id301521403)
- **Cardio — Documented:** Conditioning includes high-intensity and sprint-interval sessions. [source 1](https://apps.apple.com/us/app/nike-training-club/id301521403)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.nike.com/ntc-app), [source 2](https://apps.apple.com/us/app/nike-training-club/id301521403)
- **Wearable integration — Documented:** The US listing identifies Apple Watch compatibility; exact watch controls were not re-tested. [source 1](https://apps.apple.com/us/app/nike-training-club/id301521403)

### Peloton App (`peloton-app`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.onepeloton.com/app), [source 2](https://www.onepeloton.com/blog/peloton-apple-watch-fire-tv)
- **Recovery — Documented:** Stretching and restorative sessions; not a physiological readiness score. [source 1](https://www.onepeloton.com/app), [source 2](https://www.onepeloton.com/blog/peloton-apple-watch-fire-tv)
- **Mindfulness — Documented:** Meditation classes are part of the app offering. [source 1](https://www.onepeloton.com/app)
- **Cardio — Documented:** Running, cycling, rowing, walking and cardio classes; equipment-class access depends on membership. [source 1](https://www.onepeloton.com/app)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.onepeloton.com/app), [source 2](https://www.onepeloton.com/blog/peloton-apple-watch-fire-tv)
- **Wearable integration — Documented:** Apple Watch and Wear OS workout tracking and heart-rate metrics; supported outdoor sessions can run without the phone. [source 1](https://www.onepeloton.com/blog/peloton-apple-watch-fire-tv)

### RP Hypertrophy (`rp-hypertrophy`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Separate product:** RP Diet Coach is a separate app; its nutrition tools are not established as included in RP Hypertrophy. [source 1](https://rpstrength.com/blogs/articles/complete-hypertrophy-training-guide)
- **Recovery — Documented:** Training volume is adjusted using pump, soreness and workload feedback; not a wearable recovery measurement. [source 1](https://rpstrength.com/pages/hypertrophy-app)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://rpstrength.com/pages/hypertrophy-app), [source 2](https://rpstrength.com/blogs/articles/complete-hypertrophy-training-guide)
- **Cardio — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://rpstrength.com/pages/hypertrophy-app), [source 2](https://rpstrength.com/blogs/articles/complete-hypertrophy-training-guide)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://rpstrength.com/pages/hypertrophy-app), [source 2](https://rpstrength.com/blogs/articles/complete-hypertrophy-training-guide)
- **Wearable integration — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://rpstrength.com/pages/hypertrophy-app), [source 2](https://rpstrength.com/blogs/articles/complete-hypertrophy-training-guide)

### Seven (`seven`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://seven.app/), [source 2](https://apps.apple.com/us/app/seven-7-minute-workout/id650276551)
- **Recovery — Documented:** The publisher describes mobility and low-impact workouts for active recovery; not a readiness measurement. [source 1](https://seven.app/articles/explore-seven/what-is-the-7-month-challenge)
- **Mindfulness — Not established:** Other Perigee bundle apps are separate products; Seven itself was not established as providing mindfulness sessions. [source 1](https://seven.app/), [source 2](https://apps.apple.com/us/app/seven-7-minute-workout/id650276551)
- **Cardio — Documented:** Short HIIT bodyweight workouts; not an outdoor GPS running tracker. [source 1](https://apps.apple.com/us/app/seven-7-minute-workout/id650276551)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://seven.app/), [source 2](https://apps.apple.com/us/app/seven-7-minute-workout/id650276551)
- **Wearable integration — Documented:** Apple Watch app launches and guides short workouts; supported watchOS versions are listed in the store. [source 1](https://apps.apple.com/us/app/seven-7-minute-workout/id650276551)

### SHRED (`shred`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.shred.app/), [source 2](https://www.shred.app/pricing)
- **Recovery — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.shred.app/), [source 2](https://www.shred.app/pricing)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.shred.app/), [source 2](https://www.shred.app/pricing)
- **Cardio — Documented:** Studio classes include dance cardio and HIIT. [source 1](https://www.shred.app/)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.shred.app/), [source 2](https://www.shred.app/pricing)
- **Wearable integration — Documented:** Apple Watch integration is listed for Annual/Monthly memberships; exact controls were not established. [source 1](https://www.shred.app/pricing)

### SmartGym (`smartgym`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://smartgymapp.com/), [source 2](https://apps.apple.com/us/app/smartgym-gym-home-workouts/id922744883)
- **Recovery — Documented:** The Smart Trainer uses muscle-group recovery in training adjustments; a model, not a direct measurement. [source 1](https://smartgymapp.com/)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://smartgymapp.com/), [source 2](https://apps.apple.com/us/app/smartgym-gym-home-workouts/id922744883)
- **Cardio — Documented:** The store listing advertises HIIT routines; GPS cardio route tracking was not established. [source 1](https://apps.apple.com/us/app/smartgym-gym-home-workouts/id922744883)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://smartgymapp.com/), [source 2](https://apps.apple.com/us/app/smartgym-gym-home-workouts/id922744883)
- **Wearable integration — Documented:** Independent Apple Watch routines, set logging and Smart Trainer; works without a nearby iPhone or internet. [source 1](https://smartgymapp.com/)

### StrengthLog (`strengthlog`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** The app FAQ explicitly says it does not track macros or calories; on-site diet articles are not an in-app nutrition tool. [source 1](https://www.strengthlog.com/strengthlog-bodybuilding-app/), [source 2](https://www.strengthlog.com/body-fat-calculator/), [source 3](https://www.strengthlog.com/app-terms-privacy/)
- **Recovery — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.strengthlog.com/strengthlog-bodybuilding-app/), [source 2](https://www.strengthlog.com/body-fat-calculator/), [source 3](https://www.strengthlog.com/app-terms-privacy/)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.strengthlog.com/strengthlog-bodybuilding-app/), [source 2](https://www.strengthlog.com/body-fat-calculator/), [source 3](https://www.strengthlog.com/app-terms-privacy/)
- **Cardio — Documented:** Cardio options are explicitly included in the exercise library and training logger. [source 1](https://www.strengthlog.com/strengthlog-bodybuilding-app/)
- **Body composition — Documented:** The publisher describes a US Navy circumference-based body-fat calculator in its free app. It produces an estimate. [source 1](https://www.strengthlog.com/body-fat-calculator/)
- **Wearable integration — Documented:** The current app policy explicitly describes recording workouts on Apple Watch; exact watch controls were not separately established. [source 1](https://www.strengthlog.com/app-terms-privacy/)

### Strong (`strong`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Nutrition widgets import macros from Apple Health-compatible food apps; total calories can also be entered manually. This is not a food database. [source 1](https://help.strongapp.io/article/240-track-nutrition-with-strong)
- **Recovery — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.strong.app/), [source 2](https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.strong.app/), [source 2](https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577)
- **Cardio — Documented:** Cardio exercises and duration-based logging; this is not evidence of GPS route tracking. [source 1](https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577)
- **Body composition — Documented:** The help guide lists body-fat percentage as a core tracked measurement on iPhone and Android; circumference measurements require Pro. Values are entered or imported, not measured by Strong. [source 1](https://help.strongapp.io/article/238-add-measurements)
- **Wearable integration — Documented:** Apple Watch workout logging with or without the iPhone; Android watch support was not established. [source 1](https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577)

### StrongLifts (`stronglifts`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://stronglifts.com/app/), [source 2](https://support.stronglifts.com/article/175-body-weight)
- **Recovery — Not established:** Automatic deloads and between-set rest timers alone do not establish a separate recovery feature. [source 1](https://stronglifts.com/app/), [source 2](https://support.stronglifts.com/article/175-body-weight)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://stronglifts.com/app/), [source 2](https://support.stronglifts.com/article/175-body-weight)
- **Cardio — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://stronglifts.com/app/), [source 2](https://support.stronglifts.com/article/175-body-weight)
- **Body composition — Not established:** Bodyweight logging and charts are documented. Body-fat or lean-mass tracking was not established. [source 1](https://stronglifts.com/app/), [source 2](https://support.stronglifts.com/article/175-body-weight)
- **Wearable integration — Documented:** Apple Watch set logging, rest alerts, calculators, heart rate and Apple Health sync. [source 1](https://stronglifts.com/app/)

### Sweat (`sweat`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Recipe library and meal ideas are advertised; not evidence of a complete food/macro logger. [source 1](https://sweat.com/)
- **Recovery — Documented:** Recovery workouts are explicitly listed. [source 1](https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://sweat.com/), [source 2](https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587)
- **Cardio — Documented:** Cardio, HIIT and circuit workouts are listed. [source 1](https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://sweat.com/), [source 2](https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587)
- **Wearable integration — Documented:** Apple Watch compatibility is listed; exact controls and Android wearable support were not established. [source 1](https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587)

### Sworkit (`sworkit`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Members can ask trainers/health coaches for nutrition advice; availability depends on membership benefits. [source 1](https://sworkit.com/faq)
- **Recovery — Documented:** Guided stretching content is available; not a physiological recovery score. [source 1](https://sworkit.com/get-started/sworkit-user-guide)
- **Mindfulness — Documented:** Mindfulness and meditation content are explicitly documented. [source 1](https://sworkit.com/faq)
- **Cardio — Documented:** Cardio is one of the Sworkit Essentials workout categories. [source 1](https://sworkit.com/get-started/sworkit-user-guide)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://sworkit.com/get-started/sworkit-user-guide), [source 2](https://sworkit.com/faq)
- **Wearable integration — Documented:** The FAQ names Apple Watch, Garmin, Fitbit and Android/Wear OS connections via health platforms; not a promise of native workout controls for every watch. [source 1](https://sworkit.com/faq)

### The Lift League (`lift-league`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://theliftleague.com/), [source 2](https://play.google.com/store/apps/details?id=com.theliftleague.app)
- **Recovery — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://theliftleague.com/), [source 2](https://play.google.com/store/apps/details?id=com.theliftleague.app)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://theliftleague.com/), [source 2](https://play.google.com/store/apps/details?id=com.theliftleague.app)
- **Cardio — Not established:** The exercise library includes carries and functional movements; dedicated cardio logging or cardio plans were not established. [source 1](https://theliftleague.com/), [source 2](https://play.google.com/store/apps/details?id=com.theliftleague.app)
- **Body composition — Not established:** Training scores and progress statistics are not body-composition tracking. [source 1](https://theliftleague.com/), [source 2](https://play.google.com/store/apps/details?id=com.theliftleague.app)
- **Wearable integration — Not established:** No supported wearable integration was established in the public product information. WAI and this app share ownership. [source 1](https://theliftleague.com/), [source 2](https://play.google.com/store/apps/details?id=com.theliftleague.app)

### TrainHeroic (`trainheroic`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Documented:** Athlete Pro displays calories/macros imported through Apple Health from a separate nutrition app; not native food logging. [source 1](https://support.trainheroic.com/hc/en-us/articles/18156689314701-Does-TrainHeroic-support-integrations-with-other-apps)
- **Recovery — Documented:** Readiness insights are explicitly offered to help manage recovery. [source 1](https://www.trainheroic.com/athlete/)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.trainheroic.com/athlete/), [source 2](https://marketplace.trainheroic.com/workout-plan/program/kujat-program-1588104522)
- **Cardio — Documented:** Cardio programs are offered through the marketplace and logged in the app; content and cost depend on the purchased plan. [source 1](https://marketplace.trainheroic.com/workout-plan/program/kujat-program-1588104522)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.trainheroic.com/athlete/), [source 2](https://marketplace.trainheroic.com/workout-plan/program/kujat-program-1588104522)
- **Wearable integration — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://www.trainheroic.com/athlete/), [source 2](https://marketplace.trainheroic.com/workout-plan/program/kujat-program-1588104522)

### Volt Athletics (`volt-athletics`)

Checked 2026-11-05. Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.

- **Nutrition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://voltathletics.com/individuals), [source 2](https://help.voltathletics.com/what-devices-are-supported-for-volt-apps)
- **Recovery — Documented:** Cooldown finishers include breathwork and flexibility routines; not a physiological recovery score. [source 1](https://help.voltathletics.com/how-can-i-best-utilize-primers-and-finishers)
- **Mindfulness — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://voltathletics.com/individuals), [source 2](https://help.voltathletics.com/what-devices-are-supported-for-volt-apps)
- **Cardio — Documented:** Conditioning routines can be added to workouts; not a confirmed GPS cardio tracker. [source 1](https://voltathletics.com/individuals)
- **Body composition — Not established:** Not established in the public sources checked; this does not confirm absence. [source 1](https://voltathletics.com/individuals), [source 2](https://help.voltathletics.com/what-devices-are-supported-for-volt-apps)
- **Wearable integration — Not available:** The device-support page explicitly says Volt is not available on wearables. [source 1](https://help.voltathletics.com/what-devices-are-supported-for-volt-apps)
