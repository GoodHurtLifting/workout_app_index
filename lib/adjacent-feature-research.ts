import type { AdjacentFeatureAudit } from "./adjacent-features.ts";

// Public-source audit, not firsthand testing. No saved catalog record is mutated.
export const adjacentFeatureResearch:Record<string,AdjacentFeatureAudit> = {
  "hevy": {
    "name": "Hevy",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.hevyapp.com/features/",
      "https://www.hevyapp.com/compare/bevel/",
      "https://help.hevyapp.com/hc/en-us/articles/38279350428695-What-will-happen-to-my-account-if-I-switch-from-Pro-to-the-free-version",
      "https://www.hevyapp.com/compare/lyfta/"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.hevyapp.com/features/",
          "https://www.hevyapp.com/compare/bevel/",
          "https://help.hevyapp.com/hc/en-us/articles/38279350428695-What-will-happen-to-my-account-if-I-switch-from-Pro-to-the-free-version",
          "https://www.hevyapp.com/compare/lyfta/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Muscle-volume charts do not establish recovery monitoring; the publisher says there is no Muscle Freshness equivalent.",
        "sourceUrls": [
          "https://www.hevyapp.com/features/",
          "https://www.hevyapp.com/compare/bevel/",
          "https://help.hevyapp.com/hc/en-us/articles/38279350428695-What-will-happen-to-my-account-if-I-switch-from-Pro-to-the-free-version",
          "https://www.hevyapp.com/compare/lyfta/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.hevyapp.com/features/",
          "https://www.hevyapp.com/compare/bevel/",
          "https://help.hevyapp.com/hc/en-us/articles/38279350428695-What-will-happen-to-my-account-if-I-switch-from-Pro-to-the-free-version",
          "https://www.hevyapp.com/compare/lyfta/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Duration/distance exercise logging and cardio progress statistics; not a GPS running-coach claim.",
        "sourceUrls": [
          "https://www.hevyapp.com/compare/bevel/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Conflicting",
        "summary": "Body-fat entry is documented, but the support page makes it Pro-only while a comparison table lists BF% in Free. The access tier needs reconciliation.",
        "sourceUrls": [
          "https://help.hevyapp.com/hc/en-us/articles/38279350428695-What-will-happen-to-my-account-if-I-switch-from-Pro-to-the-free-version",
          "https://www.hevyapp.com/compare/lyfta/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Workout logging on Apple Watch and Wear OS; device capabilities differ.",
        "sourceUrls": [
          "https://www.hevyapp.com/compare/bevel/"
        ],
        "platforms": [
          "iOS",
          "Android"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "boostcamp": {
    "name": "Boostcamp",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.boostcamp.app/features",
      "https://www.boostcamp.app/features/apple-health",
      "https://www.boostcamp.app/features/progress-photos",
      "https://www.boostcamp.app/vs/ntc",
      "https://www.boostcamp.app/users/Tt0rF5-body-fat-loss-hiit"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.boostcamp.app/features",
          "https://www.boostcamp.app/features/apple-health",
          "https://www.boostcamp.app/features/progress-photos"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "The publisher describes recovery classes as outside Boostcamp’s scope; scheduled rest/deloads are not a separate recovery tool.",
        "sourceUrls": [
          "https://www.boostcamp.app/vs/ntc"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not available",
        "summary": "The publisher comparison explicitly places mindfulness outside Boostcamp’s scope.",
        "sourceUrls": [
          "https://www.boostcamp.app/vs/ntc"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "The public library includes user-published HIIT plans with timed runs. This is limited program content, not GPS tracking or independently assessed program quality.",
        "sourceUrls": [
          "https://www.boostcamp.app/users/Tt0rF5-body-fat-loss-hiit"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Bodyweight and progress photos are documented; body-fat and lean-mass tracking are not established. Health sync explicitly excludes body fat.",
        "sourceUrls": [
          "https://www.boostcamp.app/features",
          "https://www.boostcamp.app/features/apple-health",
          "https://www.boostcamp.app/features/progress-photos"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Not established",
        "summary": "Apple Health/Health Connect sync workouts and bodyweight, not heart rate. The publisher says there is no Apple Watch app yet; wearable workout controls are not established.",
        "sourceUrls": [
          "https://www.boostcamp.app/features",
          "https://www.boostcamp.app/features/apple-health",
          "https://www.boostcamp.app/features/progress-photos"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "fitbod": {
    "name": "Fitbod",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://help.fitbod.me/hc/en-us/articles/18213217448983-Body-Composition",
      "https://help.fitbod.me/hc/en-us/articles/360006269014-Muscle-Recovery",
      "https://help.fitbod.me/hc/en-us/categories/1500000286421-Features-and-Integrations"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://help.fitbod.me/hc/en-us/articles/18213217448983-Body-Composition",
          "https://help.fitbod.me/hc/en-us/articles/360006269014-Muscle-Recovery",
          "https://help.fitbod.me/hc/en-us/categories/1500000286421-Features-and-Integrations"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Estimated per-muscle recovery derived from logged training; not a direct physiological measurement.",
        "sourceUrls": [
          "https://help.fitbod.me/hc/en-us/articles/360006269014-Muscle-Recovery"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://help.fitbod.me/hc/en-us/articles/18213217448983-Body-Composition",
          "https://help.fitbod.me/hc/en-us/articles/360006269014-Muscle-Recovery",
          "https://help.fitbod.me/hc/en-us/categories/1500000286421-Features-and-Integrations"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Cardio recommendations and logged cardio are documented; available choices may vary by platform.",
        "sourceUrls": [
          "https://help.fitbod.me/hc/en-us/articles/360006269014-Muscle-Recovery",
          "https://help.fitbod.me/hc/en-us/categories/1500000286421-Features-and-Integrations"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Documented",
        "summary": "Manual entry and health-platform imports include body-fat percentage and lean mass on iOS and Android. Fitbod does not measure or calculate those values.",
        "sourceUrls": [
          "https://help.fitbod.me/hc/en-us/articles/18213217448983-Body-Composition"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Official integrations include Apple Watch and Wear OS. Check the relevant device guide for supported controls.",
        "sourceUrls": [
          "https://help.fitbod.me/hc/en-us/categories/1500000286421-Features-and-Integrations"
        ],
        "platforms": [
          "iOS",
          "Android"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "strong": {
    "name": "Strong",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.strong.app/",
      "https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577",
      "https://help.strongapp.io/article/240-track-nutrition-with-strong",
      "https://help.strongapp.io/article/238-add-measurements"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Nutrition widgets import macros from Apple Health-compatible food apps; total calories can also be entered manually. This is not a food database.",
        "sourceUrls": [
          "https://help.strongapp.io/article/240-track-nutrition-with-strong"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.strong.app/",
          "https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.strong.app/",
          "https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Cardio exercises and duration-based logging; this is not evidence of GPS route tracking.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577"
        ],
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Documented",
        "summary": "The help guide lists body-fat percentage as a core tracked measurement on iPhone and Android; circumference measurements require Pro. Values are entered or imported, not measured by Strong.",
        "sourceUrls": [
          "https://help.strongapp.io/article/238-add-measurements"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch workout logging with or without the iPhone; Android watch support was not established.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "App-store documented"
      }
    }
  },
  "caliber": {
    "name": "Caliber",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://caliberstrong.com/",
      "https://caliberstrong.com/mcp/",
      "https://caliberstrong.freshdesk.com/support/solutions/folders/48000687948"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Nutrition data/targets and connected food apps are documented; personalized nutrition coaching is a separate paid service.",
        "sourceUrls": [
          "https://caliberstrong.com/",
          "https://caliberstrong.com/mcp/",
          "https://caliberstrong.freshdesk.com/support/solutions/folders/48000687948"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://caliberstrong.com/",
          "https://caliberstrong.com/mcp/",
          "https://caliberstrong.freshdesk.com/support/solutions/folders/48000687948"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://caliberstrong.com/",
          "https://caliberstrong.com/mcp/",
          "https://caliberstrong.freshdesk.com/support/solutions/folders/48000687948"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Manual/imported cardio activity records; personalized cardio programming is part of coaching.",
        "sourceUrls": [
          "https://caliberstrong.com/",
          "https://caliberstrong.com/mcp/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Documented",
        "summary": "Body-stat history includes body fat, weight and waist; this does not establish an in-app body-fat measurement.",
        "sourceUrls": [
          "https://caliberstrong.com/mcp/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch/Garmin activity syncing through health platforms; this is data sync, not a native watch workout logger.",
        "sourceUrls": [
          "https://caliberstrong.freshdesk.com/support/solutions/folders/48000687948"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "lift-league": {
    "name": "The Lift League",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://theliftleague.com/",
      "https://play.google.com/store/apps/details?id=com.theliftleague.app"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://theliftleague.com/",
          "https://play.google.com/store/apps/details?id=com.theliftleague.app"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://theliftleague.com/",
          "https://play.google.com/store/apps/details?id=com.theliftleague.app"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://theliftleague.com/",
          "https://play.google.com/store/apps/details?id=com.theliftleague.app"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Not established",
        "summary": "The exercise library includes carries and functional movements; dedicated cardio logging or cardio plans were not established.",
        "sourceUrls": [
          "https://theliftleague.com/",
          "https://play.google.com/store/apps/details?id=com.theliftleague.app"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Training scores and progress statistics are not body-composition tracking.",
        "sourceUrls": [
          "https://theliftleague.com/",
          "https://play.google.com/store/apps/details?id=com.theliftleague.app"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Not established",
        "summary": "No supported wearable integration was established in the public product information. WAI and this app share ownership.",
        "sourceUrls": [
          "https://theliftleague.com/",
          "https://play.google.com/store/apps/details?id=com.theliftleague.app"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "jefit": {
    "name": "JEFIT",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.jefit.com/",
      "https://www.jefit.com/watch",
      "https://apps.apple.com/us/app/jefit-workout-plan-gym-tracker/id449810000",
      "https://www.jefit.com/routines/112064/lean-and-large"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.jefit.com/",
          "https://www.jefit.com/watch",
          "https://apps.apple.com/us/app/jefit-workout-plan-gym-tracker/id449810000",
          "https://www.jefit.com/routines/112064/lean-and-large"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Muscle-recovery charts are advertised; estimates are not a direct physiological measurement.",
        "sourceUrls": [
          "https://www.jefit.com/",
          "https://apps.apple.com/us/app/jefit-workout-plan-gym-tracker/id449810000"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.jefit.com/",
          "https://www.jefit.com/watch",
          "https://apps.apple.com/us/app/jefit-workout-plan-gym-tracker/id449810000",
          "https://www.jefit.com/routines/112064/lean-and-large"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Published routines include walking/treadmill cardio entries; program content varies.",
        "sourceUrls": [
          "https://www.jefit.com/routines/112064/lean-and-large"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Documented",
        "summary": "Body weight, body fat and circumference tracking are listed.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/jefit-workout-plan-gym-tracker/id449810000"
        ],
        "evidenceClass": "App-store documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch and Wear OS logging, planned routines, timers and phone sync.",
        "sourceUrls": [
          "https://www.jefit.com/watch"
        ],
        "platforms": [
          "iOS",
          "Android"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "strengthlog": {
    "name": "StrengthLog",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.strengthlog.com/strengthlog-bodybuilding-app/",
      "https://www.strengthlog.com/body-fat-calculator/",
      "https://www.strengthlog.com/app-terms-privacy/"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "The app FAQ explicitly says it does not track macros or calories; on-site diet articles are not an in-app nutrition tool.",
        "sourceUrls": [
          "https://www.strengthlog.com/strengthlog-bodybuilding-app/",
          "https://www.strengthlog.com/body-fat-calculator/",
          "https://www.strengthlog.com/app-terms-privacy/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.strengthlog.com/strengthlog-bodybuilding-app/",
          "https://www.strengthlog.com/body-fat-calculator/",
          "https://www.strengthlog.com/app-terms-privacy/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.strengthlog.com/strengthlog-bodybuilding-app/",
          "https://www.strengthlog.com/body-fat-calculator/",
          "https://www.strengthlog.com/app-terms-privacy/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Cardio options are explicitly included in the exercise library and training logger.",
        "sourceUrls": [
          "https://www.strengthlog.com/strengthlog-bodybuilding-app/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Documented",
        "summary": "The publisher describes a US Navy circumference-based body-fat calculator in its free app. It produces an estimate.",
        "sourceUrls": [
          "https://www.strengthlog.com/body-fat-calculator/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "The current app policy explicitly describes recording workouts on Apple Watch; exact watch controls were not separately established.",
        "sourceUrls": [
          "https://www.strengthlog.com/app-terms-privacy/"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "stronglifts": {
    "name": "StrongLifts",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://stronglifts.com/app/",
      "https://support.stronglifts.com/article/175-body-weight"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://stronglifts.com/app/",
          "https://support.stronglifts.com/article/175-body-weight"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Automatic deloads and between-set rest timers alone do not establish a separate recovery feature.",
        "sourceUrls": [
          "https://stronglifts.com/app/",
          "https://support.stronglifts.com/article/175-body-weight"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://stronglifts.com/app/",
          "https://support.stronglifts.com/article/175-body-weight"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://stronglifts.com/app/",
          "https://support.stronglifts.com/article/175-body-weight"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Bodyweight logging and charts are documented. Body-fat or lean-mass tracking was not established.",
        "sourceUrls": [
          "https://stronglifts.com/app/",
          "https://support.stronglifts.com/article/175-body-weight"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch set logging, rest alerts, calculators, heart rate and Apple Health sync.",
        "sourceUrls": [
          "https://stronglifts.com/app/"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "alpha-progression": {
    "name": "Alpha Progression",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://alphaprogression.com/en",
      "https://alphaprogression.com/en/blog/alpha-progression-guide"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://alphaprogression.com/en",
          "https://alphaprogression.com/en/blog/alpha-progression-guide"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Deloads and RIR guidance are training tools; a separate recovery feature was not established.",
        "sourceUrls": [
          "https://alphaprogression.com/en",
          "https://alphaprogression.com/en/blog/alpha-progression-guide"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://alphaprogression.com/en",
          "https://alphaprogression.com/en/blog/alpha-progression-guide"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://alphaprogression.com/en",
          "https://alphaprogression.com/en/blog/alpha-progression-guide"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://alphaprogression.com/en",
          "https://alphaprogression.com/en/blog/alpha-progression-guide"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Not established",
        "summary": "The official guide says dedicated Apple Watch and Wear OS workout apps are on the roadmap, not currently offered. A separate wearable-data connection was not established.",
        "sourceUrls": [
          "https://alphaprogression.com/en",
          "https://alphaprogression.com/en/blog/alpha-progression-guide"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "fitnotes": {
    "name": "FitNotes",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes",
      "https://www.fitnotesapp.com/body_tracker/"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Custom numeric measurements can record calorie or macro totals manually; no food database or meal-planning tool is established.",
        "sourceUrls": [
          "https://www.fitnotesapp.com/body_tracker/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes"
        ],
        "evidenceClass": "App-store documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes"
        ],
        "evidenceClass": "App-store documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Distance/time logging is supported alongside weight/reps; custom categories and exercises can be created.",
        "sourceUrls": [
          "https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes"
        ],
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Documented",
        "summary": "Body Weight and Body Fat are default Body Tracker measurements with history and progress graphs; users supply the values.",
        "sourceUrls": [
          "https://www.fitnotesapp.com/body_tracker/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes"
        ],
        "evidenceClass": "App-store documented"
      }
    }
  },
  "rp-hypertrophy": {
    "name": "RP Hypertrophy",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://rpstrength.com/pages/hypertrophy-app",
      "https://rpstrength.com/blogs/articles/complete-hypertrophy-training-guide"
    ],
    "features": {
      "Nutrition": {
        "status": "Separate product",
        "summary": "RP Diet Coach is a separate app; its nutrition tools are not established as included in RP Hypertrophy.",
        "sourceUrls": [
          "https://rpstrength.com/blogs/articles/complete-hypertrophy-training-guide"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Training volume is adjusted using pump, soreness and workload feedback; not a wearable recovery measurement.",
        "sourceUrls": [
          "https://rpstrength.com/pages/hypertrophy-app"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://rpstrength.com/pages/hypertrophy-app",
          "https://rpstrength.com/blogs/articles/complete-hypertrophy-training-guide"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://rpstrength.com/pages/hypertrophy-app",
          "https://rpstrength.com/blogs/articles/complete-hypertrophy-training-guide"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://rpstrength.com/pages/hypertrophy-app",
          "https://rpstrength.com/blogs/articles/complete-hypertrophy-training-guide"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://rpstrength.com/pages/hypertrophy-app",
          "https://rpstrength.com/blogs/articles/complete-hypertrophy-training-guide"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "ladder": {
    "name": "Ladder",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.joinladder.com/",
      "https://www.joinladder.com/help-center/teams",
      "https://www.joinladder.com/pricing",
      "https://www.joinladder.com/groups"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Built-in meal logging and macro tracking are advertised. The exact nutrition add-on entitlement was not established.",
        "sourceUrls": [
          "https://www.joinladder.com/",
          "https://www.joinladder.com/groups"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Selected teams include intentional recovery and mobility days; availability depends on the team.",
        "sourceUrls": [
          "https://www.joinladder.com/help-center/teams"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.joinladder.com/",
          "https://www.joinladder.com/help-center/teams",
          "https://www.joinladder.com/pricing",
          "https://www.joinladder.com/groups"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Selected teams include cardio, HIIT and conditioning; not every strength team has the same focus.",
        "sourceUrls": [
          "https://www.joinladder.com/help-center/teams"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.joinladder.com/",
          "https://www.joinladder.com/help-center/teams",
          "https://www.joinladder.com/pricing",
          "https://www.joinladder.com/groups"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch connection is explicitly included in Pro. Group marketing also names Garmin/Fitbit, but detailed behavior was not established.",
        "sourceUrls": [
          "https://www.joinladder.com/pricing",
          "https://www.joinladder.com/groups"
        ],
        "platforms": [
          "iOS"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      }
    }
  },
  "juggernaut-ai": {
    "name": "JuggernautAI",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.juggernautai.app/"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Answering a nutrition-readiness question does not establish meal plans, calorie logging or macro tracking.",
        "sourceUrls": [
          "https://www.juggernautai.app/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Pre-session sleep, nutrition and recovery check-ins adjust training readiness and workload.",
        "sourceUrls": [
          "https://www.juggernautai.app/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.juggernautai.app/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.juggernautai.app/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.juggernautai.app/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.juggernautai.app/"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "trainheroic": {
    "name": "TrainHeroic",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.trainheroic.com/athlete/",
      "https://marketplace.trainheroic.com/workout-plan/program/kujat-program-1588104522",
      "https://support.trainheroic.com/hc/en-us/articles/18156689314701-Does-TrainHeroic-support-integrations-with-other-apps"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Athlete Pro displays calories/macros imported through Apple Health from a separate nutrition app; not native food logging.",
        "sourceUrls": [
          "https://support.trainheroic.com/hc/en-us/articles/18156689314701-Does-TrainHeroic-support-integrations-with-other-apps"
        ],
        "evidenceClass": "Officially documented",
        "platforms": [
          "iOS"
        ],
        "requiresPaid": true
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Readiness insights are explicitly offered to help manage recovery.",
        "sourceUrls": [
          "https://www.trainheroic.com/athlete/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.trainheroic.com/athlete/",
          "https://marketplace.trainheroic.com/workout-plan/program/kujat-program-1588104522"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Cardio programs are offered through the marketplace and logged in the app; content and cost depend on the purchased plan.",
        "sourceUrls": [
          "https://marketplace.trainheroic.com/workout-plan/program/kujat-program-1588104522"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.trainheroic.com/athlete/",
          "https://marketplace.trainheroic.com/workout-plan/program/kujat-program-1588104522"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.trainheroic.com/athlete/",
          "https://marketplace.trainheroic.com/workout-plan/program/kujat-program-1588104522"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "nike-training-club": {
    "name": "Nike Training Club",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.nike.com/ntc-app",
      "https://apps.apple.com/us/app/nike-training-club/id301521403"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Nutrition tips and educational guidance; not a food or macro logger.",
        "sourceUrls": [
          "https://www.nike.com/ntc-app"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Recovery content includes self-myofascial release, stretching and walking.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/nike-training-club/id301521403"
        ],
        "evidenceClass": "App-store documented"
      },
      "Mindfulness": {
        "status": "Documented",
        "summary": "Mindfulness guidance is listed in the app description.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/nike-training-club/id301521403"
        ],
        "evidenceClass": "App-store documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Conditioning includes high-intensity and sprint-interval sessions.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/nike-training-club/id301521403"
        ],
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.nike.com/ntc-app",
          "https://apps.apple.com/us/app/nike-training-club/id301521403"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "The US listing identifies Apple Watch compatibility; exact watch controls were not re-tested.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/nike-training-club/id301521403"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "App-store documented"
      }
    }
  },
  "future": {
    "name": "Future",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://future.co/",
      "https://apps.apple.com/us/app/future-pro-personal-training/id1288178982",
      "https://future.co/health-coach/progress",
      "https://faq.future.co/en/articles/12240765-does-future-pro-include-nutrition"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Future Pro coaches provide general eating guidance and accountability, but do not prescribe custom meal plans or specific calorie/macro targets. Future Health is a distinct offering.",
        "sourceUrls": [
          "https://faq.future.co/en/articles/12240765-does-future-pro-include-nutrition"
        ],
        "evidenceClass": "Officially documented",
        "requiresPaid": true
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://future.co/",
          "https://apps.apple.com/us/app/future-pro-personal-training/id1288178982",
          "https://future.co/health-coach/progress"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://future.co/",
          "https://apps.apple.com/us/app/future-pro-personal-training/id1288178982",
          "https://future.co/health-coach/progress"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://future.co/",
          "https://apps.apple.com/us/app/future-pro-personal-training/id1288178982",
          "https://future.co/health-coach/progress"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "DEXA is advertised in the separate Future Health offering; it is not established as an included Future Pro app feature.",
        "sourceUrls": [
          "https://future.co/",
          "https://apps.apple.com/us/app/future-pro-personal-training/id1288178982",
          "https://future.co/health-coach/progress"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "The Future Pro US listing includes Apple Watch; specific workout-control behavior was not independently verified.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/future-pro-personal-training/id1288178982"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "App-store documented"
      }
    }
  },
  "peloton-app": {
    "name": "Peloton App",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.onepeloton.com/app",
      "https://www.onepeloton.com/blog/peloton-apple-watch-fire-tv"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.onepeloton.com/app",
          "https://www.onepeloton.com/blog/peloton-apple-watch-fire-tv"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Stretching and restorative sessions; not a physiological readiness score.",
        "sourceUrls": [
          "https://www.onepeloton.com/app",
          "https://www.onepeloton.com/blog/peloton-apple-watch-fire-tv"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Documented",
        "summary": "Meditation classes are part of the app offering.",
        "sourceUrls": [
          "https://www.onepeloton.com/app"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Running, cycling, rowing, walking and cardio classes; equipment-class access depends on membership.",
        "sourceUrls": [
          "https://www.onepeloton.com/app"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.onepeloton.com/app",
          "https://www.onepeloton.com/blog/peloton-apple-watch-fire-tv"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch and Wear OS workout tracking and heart-rate metrics; supported outdoor sessions can run without the phone.",
        "sourceUrls": [
          "https://www.onepeloton.com/blog/peloton-apple-watch-fire-tv"
        ],
        "platforms": [
          "iOS",
          "Android"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "freeletics": {
    "name": "Freeletics",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212",
      "https://help.freeletics.com/hc/en-us/articles/115004739849-Freeletics-Nutrition-Explained"
    ],
    "features": {
      "Nutrition": {
        "status": "Separate product",
        "summary": "Freeletics Nutrition is a separate download and coach subscription/bundle; not an included Training-app food logger.",
        "sourceUrls": [
          "https://help.freeletics.com/hc/en-us/articles/115004739849-Freeletics-Nutrition-Explained"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Training plans include cooldowns, mobility and recovery workouts.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212"
        ],
        "requiresPaid": true,
        "evidenceClass": "App-store documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212",
          "https://help.freeletics.com/hc/en-us/articles/115004739849-Freeletics-Nutrition-Explained"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "HIIT, running, cycling and rowing are described; plan/access varies.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212"
        ],
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212",
          "https://help.freeletics.com/hc/en-us/articles/115004739849-Freeletics-Nutrition-Explained"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch workout controls are listed under Training Coach features.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212"
        ],
        "platforms": [
          "iOS"
        ],
        "requiresPaid": true,
        "evidenceClass": "App-store documented"
      }
    }
  },
  "apple-fitness-plus": {
    "name": "Apple Fitness+",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.apple.com/apple-fitness-plus/"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.apple.com/apple-fitness-plus/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Mindful Cooldown sessions combine cooldown movement and mindfulness.",
        "sourceUrls": [
          "https://www.apple.com/apple-fitness-plus/"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Documented",
        "summary": "Meditation sessions are included.",
        "sourceUrls": [
          "https://www.apple.com/apple-fitness-plus/"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Cycling, treadmill, rowing, HIIT and dance workouts are offered.",
        "sourceUrls": [
          "https://www.apple.com/apple-fitness-plus/"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.apple.com/apple-fitness-plus/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch, supported heart-rate earbuds and Bluetooth heart-rate monitors provide live workout metrics.",
        "sourceUrls": [
          "https://www.apple.com/apple-fitness-plus/"
        ],
        "platforms": [
          "iOS"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      }
    }
  },
  "sweat": {
    "name": "Sweat",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://sweat.com/",
      "https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Recipe library and meal ideas are advertised; not evidence of a complete food/macro logger.",
        "sourceUrls": [
          "https://sweat.com/"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Recovery workouts are explicitly listed.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587"
        ],
        "requiresPaid": true,
        "evidenceClass": "App-store documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://sweat.com/",
          "https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Cardio, HIIT and circuit workouts are listed.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587"
        ],
        "requiresPaid": true,
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://sweat.com/",
          "https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch compatibility is listed; exact controls and Android wearable support were not established.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587"
        ],
        "platforms": [
          "iOS"
        ],
        "requiresPaid": true,
        "evidenceClass": "App-store documented"
      }
    }
  },
  "centr": {
    "name": "Centr",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://help.centr.com/en-US/what-is-centr-coach-and-how-does-it-work-5977034",
      "https://help.centr.com/en-US/how-do-i-access-meditation-content-3233658?isEmbedded=true",
      "https://centr.com/pages/centr-coach-app",
      "https://help.centr.com/en-US/how-do-i-connect-my-apple-watch-3233662",
      "https://help.centr.com/en-US/how-do-i-log-my-meals-3233655?isEmbedded=true"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Recipes and meal plans with recipe-completion tracking; support explicitly says this is not detailed daily calorie/macro logging.",
        "sourceUrls": [
          "https://help.centr.com/en-US/what-is-centr-coach-and-how-does-it-work-5977034",
          "https://help.centr.com/en-US/how-do-i-log-my-meals-3233655?isEmbedded=true"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Recovery programs and relaxation support are advertised.",
        "sourceUrls": [
          "https://help.centr.com/en-US/how-do-i-access-meditation-content-3233658?isEmbedded=true",
          "https://centr.com/pages/centr-coach-app"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Documented",
        "summary": "Guided meditation and mindfulness sessions are included in the membership.",
        "sourceUrls": [
          "https://help.centr.com/en-US/how-do-i-access-meditation-content-3233658?isEmbedded=true"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "HIIT, boxing and hybrid conditioning workouts are included.",
        "sourceUrls": [
          "https://help.centr.com/en-US/what-is-centr-coach-and-how-does-it-work-5977034"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://help.centr.com/en-US/what-is-centr-coach-and-how-does-it-work-5977034",
          "https://help.centr.com/en-US/how-do-i-access-meditation-content-3233658?isEmbedded=true",
          "https://centr.com/pages/centr-coach-app",
          "https://help.centr.com/en-US/how-do-i-connect-my-apple-watch-3233662",
          "https://help.centr.com/en-US/how-do-i-log-my-meals-3233655?isEmbedded=true"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch connection through HealthKit tracks workout data; this does not establish standalone watch coaching.",
        "sourceUrls": [
          "https://help.centr.com/en-US/how-do-i-connect-my-apple-watch-3233662"
        ],
        "platforms": [
          "iOS"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      }
    }
  },
  "gravl": {
    "name": "Gravl",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://gravl.ai/",
      "https://gravl.ai/macros"
    ],
    "features": {
      "Nutrition": {
        "status": "Separate product",
        "summary": "Gravl Macros has its own app downloads. Inclusion of this companion food logger in the workout app/subscription was not established.",
        "sourceUrls": [
          "https://gravl.ai/macros"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Per-muscle recovery tracking is advertised, including imported workout context.",
        "sourceUrls": [
          "https://gravl.ai/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://gravl.ai/",
          "https://gravl.ai/macros"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://gravl.ai/",
          "https://gravl.ai/macros"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://gravl.ai/",
          "https://gravl.ai/macros"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch, Wear OS and Garmin workout logging are advertised; health/activity connections are also listed.",
        "sourceUrls": [
          "https://gravl.ai/"
        ],
        "platforms": [
          "iOS",
          "Android"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "shred": {
    "name": "SHRED",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.shred.app/",
      "https://www.shred.app/pricing"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.shred.app/",
          "https://www.shred.app/pricing"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.shred.app/",
          "https://www.shred.app/pricing"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.shred.app/",
          "https://www.shred.app/pricing"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Studio classes include dance cardio and HIIT.",
        "sourceUrls": [
          "https://www.shred.app/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.shred.app/",
          "https://www.shred.app/pricing"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch integration is listed for Annual/Monthly memberships; exact controls were not established.",
        "sourceUrls": [
          "https://www.shred.app/pricing"
        ],
        "platforms": [
          "iOS"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      }
    }
  },
  "bodi": {
    "name": "BODi",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.bodi.com/products/bodi-subscription",
      "https://faq.bodi.com/us/en/help?a=Supported-Apple-Watch-Devices-for-BODi---id--MazdCPp7RuSdxxX9Y6oQYg",
      "https://www.bodi.com/blog/stream-beachbody-demand-tv"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "The subscription includes meal plans and recipes; not a confirmed daily macro logger.",
        "sourceUrls": [
          "https://www.bodi.com/products/bodi-subscription"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "The subscription page mentions scheduled recovery, but a dedicated recovery-content offering was not established from this source.",
        "sourceUrls": [
          "https://www.bodi.com/products/bodi-subscription"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.bodi.com/products/bodi-subscription"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "HIIT, cardio and dance-cardio workouts are explicitly included.",
        "sourceUrls": [
          "https://www.bodi.com/products/bodi-subscription"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.bodi.com/products/bodi-subscription"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch support requires a paired iPhone with BODi installed. The current support FAQ excludes Super Blocks from watch support.",
        "sourceUrls": [
          "https://faq.bodi.com/us/en/help?a=Supported-Apple-Watch-Devices-for-BODi---id--MazdCPp7RuSdxxX9Y6oQYg",
          "https://www.bodi.com/blog/stream-beachbody-demand-tv"
        ],
        "evidenceClass": "Officially documented",
        "platforms": [
          "iOS"
        ],
        "requiresPaid": true
      }
    }
  },
  "ifit": {
    "name": "iFIT",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://apps.apple.com/us/app/ifit-workouts/id1274601042"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/ifit-workouts/id1274601042"
        ],
        "evidenceClass": "App-store documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Trainer-led stretching and mobility content are listed; not a readiness score.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/ifit-workouts/id1274601042"
        ],
        "evidenceClass": "App-store documented"
      },
      "Mindfulness": {
        "status": "Documented",
        "summary": "Mindfulness sessions are explicitly listed.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/ifit-workouts/id1274601042"
        ],
        "evidenceClass": "App-store documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Running, cycling, rowing, walking and HIIT content; some experiences use compatible machines.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/ifit-workouts/id1274601042"
        ],
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/ifit-workouts/id1274601042"
        ],
        "evidenceClass": "App-store documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch companion app is documented in compatibility and release notes; exact device behavior varies.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/ifit-workouts/id1274601042"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "App-store documented"
      }
    }
  },
  "les-mills-plus": {
    "name": "LES MILLS+",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.lesmills.com/ondemand",
      "https://shop.lesmills.com/us/faqs",
      "https://support.lesmillsondemand.com/support/solutions/articles/6000230320-what-devices-can-i-use-to-watch-les-mills-on-demand-"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Equipment-store FAQ describes nutrition knowledge with LES MILLS+; educational content, not meal/macro logging.",
        "sourceUrls": [
          "https://shop.lesmills.com/us/faqs"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Active recovery, stretching and foam-rolling sessions are listed.",
        "sourceUrls": [
          "https://www.lesmills.com/ondemand"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Documented",
        "summary": "Mindfulness and meditation content is listed.",
        "sourceUrls": [
          "https://www.lesmills.com/ondemand"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Cardio, cycling and HIIT classes are listed; content varies between Base and Premium.",
        "sourceUrls": [
          "https://www.lesmills.com/ondemand"
        ],
        "requiresPaid": true,
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.lesmills.com/ondemand",
          "https://shop.lesmills.com/us/faqs"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Not established",
        "summary": "The supported-device guide covers mobile/TV streaming but does not establish a wearable connection. A watch.lesmillsondemand.com address refers to streaming, not a smartwatch app.",
        "sourceUrls": [
          "https://support.lesmillsondemand.com/support/solutions/articles/6000230320-what-devices-can-i-use-to-watch-les-mills-on-demand-"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "alo-wellness-club": {
    "name": "ALO Wellness Club",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://apps.apple.com/us/app/alo-wellness-club/id601617403",
      "https://wellnessclub.aloyoga.com/"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Nutrition/wellness content is advertised; meal/macro logging was not established.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/alo-wellness-club/id601617403"
        ],
        "evidenceClass": "App-store documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Restorative and Yin yoga plus sleep-oriented wellness content; not a recovery score.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/alo-wellness-club/id601617403"
        ],
        "evidenceClass": "App-store documented"
      },
      "Mindfulness": {
        "status": "Documented",
        "summary": "Guided meditation, breathwork, Yoga Nidra and sound-healing sessions are listed.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/alo-wellness-club/id601617403"
        ],
        "evidenceClass": "App-store documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Cardio, HIIT and dance classes are listed.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/alo-wellness-club/id601617403"
        ],
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/alo-wellness-club/id601617403",
          "https://wellnessclub.aloyoga.com/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "The US listing identifies Apple Watch compatibility. Exact on-watch controls were not established.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/alo-wellness-club/id601617403"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "App-store documented"
      }
    }
  },
  "gymshark-training": {
    "name": "Gymshark Training",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app",
      "https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation.",
        "sourceUrls": [
          "https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app",
          "https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation.",
        "sourceUrls": [
          "https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app",
          "https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation.",
        "sourceUrls": [
          "https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app",
          "https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Not established",
        "summary": "The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation.",
        "sourceUrls": [
          "https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app",
          "https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation.",
        "sourceUrls": [
          "https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app",
          "https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Not established",
        "summary": "The former official help page and US store URL were unavailable on this check. Current feature availability is not established; this is not proof of discontinuation.",
        "sourceUrls": [
          "https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app",
          "https://apps.apple.com/us/app/gymshark-training-and-fitness/id1139151320"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "smartgym": {
    "name": "SmartGym",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://smartgymapp.com/",
      "https://apps.apple.com/us/app/smartgym-gym-home-workouts/id922744883"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://smartgymapp.com/",
          "https://apps.apple.com/us/app/smartgym-gym-home-workouts/id922744883"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "The Smart Trainer uses muscle-group recovery in training adjustments; a model, not a direct measurement.",
        "sourceUrls": [
          "https://smartgymapp.com/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://smartgymapp.com/",
          "https://apps.apple.com/us/app/smartgym-gym-home-workouts/id922744883"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "The store listing advertises HIIT routines; GPS cardio route tracking was not established.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/smartgym-gym-home-workouts/id922744883"
        ],
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://smartgymapp.com/",
          "https://apps.apple.com/us/app/smartgym-gym-home-workouts/id922744883"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Independent Apple Watch routines, set logging and Smart Trainer; works without a nearby iPhone or internet.",
        "sourceUrls": [
          "https://smartgymapp.com/"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "evolve": {
    "name": "Evolve",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.evolvetrainingapp.com/"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Personalized nutrition/macronutrient targets alongside strength programming; detailed food logging was not established.",
        "sourceUrls": [
          "https://www.evolvetrainingapp.com/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.evolvetrainingapp.com/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.evolvetrainingapp.com/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.evolvetrainingapp.com/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.evolvetrainingapp.com/"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Not established",
        "summary": "No wearable connection was established for this specific Evolve product. Similarly named apps were not treated as the same product.",
        "sourceUrls": [
          "https://www.evolvetrainingapp.com/"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "volt-athletics": {
    "name": "Volt Athletics",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://voltathletics.com/individuals",
      "https://help.voltathletics.com/what-devices-are-supported-for-volt-apps",
      "https://help.voltathletics.com/how-can-i-best-utilize-primers-and-finishers"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://voltathletics.com/individuals",
          "https://help.voltathletics.com/what-devices-are-supported-for-volt-apps"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Cooldown finishers include breathwork and flexibility routines; not a physiological recovery score.",
        "sourceUrls": [
          "https://help.voltathletics.com/how-can-i-best-utilize-primers-and-finishers"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://voltathletics.com/individuals",
          "https://help.voltathletics.com/what-devices-are-supported-for-volt-apps"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Conditioning routines can be added to workouts; not a confirmed GPS cardio tracker.",
        "sourceUrls": [
          "https://voltathletics.com/individuals"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://voltathletics.com/individuals",
          "https://help.voltathletics.com/what-devices-are-supported-for-volt-apps"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Not available",
        "summary": "The device-support page explicitly says Volt is not available on wearables.",
        "sourceUrls": [
          "https://help.voltathletics.com/what-devices-are-supported-for-volt-apps"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "sworkit": {
    "name": "Sworkit",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://sworkit.com/get-started/sworkit-user-guide",
      "https://sworkit.com/faq"
    ],
    "features": {
      "Nutrition": {
        "status": "Documented",
        "summary": "Members can ask trainers/health coaches for nutrition advice; availability depends on membership benefits.",
        "sourceUrls": [
          "https://sworkit.com/faq"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Guided stretching content is available; not a physiological recovery score.",
        "sourceUrls": [
          "https://sworkit.com/get-started/sworkit-user-guide"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Documented",
        "summary": "Mindfulness and meditation content are explicitly documented.",
        "sourceUrls": [
          "https://sworkit.com/faq"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Cardio is one of the Sworkit Essentials workout categories.",
        "sourceUrls": [
          "https://sworkit.com/get-started/sworkit-user-guide"
        ],
        "evidenceClass": "Officially documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://sworkit.com/get-started/sworkit-user-guide",
          "https://sworkit.com/faq"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "The FAQ names Apple Watch, Garmin, Fitbit and Android/Wear OS connections via health platforms; not a promise of native workout controls for every watch.",
        "sourceUrls": [
          "https://sworkit.com/faq"
        ],
        "platforms": [
          "iOS",
          "Android"
        ],
        "evidenceClass": "Officially documented"
      }
    }
  },
  "fitnessai": {
    "name": "FitnessAI",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://www.fitnessai.com/",
      "https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156",
      "https://www.fitnessai.com/bodyscan"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.fitnessai.com/",
          "https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.fitnessai.com/",
          "https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://www.fitnessai.com/",
          "https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "The developer description lists personalized daily lifting and cardio plans.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156"
        ],
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Documented",
        "summary": "Paid BodyScan uses iPhone-camera images processed by Prism Labs to estimate body fat and lean mass. Availability and subscription terms differ from ordinary workout access; accuracy is a publisher claim, not verified here.",
        "sourceUrls": [
          "https://www.fitnessai.com/bodyscan"
        ],
        "evidenceClass": "Officially documented",
        "platforms": [
          "iOS"
        ],
        "requiresPaid": true
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch compatibility is listed. Exact on-watch controls were not established.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "App-store documented"
      }
    }
  },
  "seven": {
    "name": "Seven",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://seven.app/",
      "https://apps.apple.com/us/app/seven-7-minute-workout/id650276551",
      "https://seven.app/articles/explore-seven/what-is-the-7-month-challenge"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://seven.app/",
          "https://apps.apple.com/us/app/seven-7-minute-workout/id650276551"
        ],
        "evidenceClass": "Officially documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "The publisher describes mobility and low-impact workouts for active recovery; not a readiness measurement.",
        "sourceUrls": [
          "https://seven.app/articles/explore-seven/what-is-the-7-month-challenge"
        ],
        "evidenceClass": "Officially documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Other Perigee bundle apps are separate products; Seven itself was not established as providing mindfulness sessions.",
        "sourceUrls": [
          "https://seven.app/",
          "https://apps.apple.com/us/app/seven-7-minute-workout/id650276551"
        ],
        "evidenceClass": "Officially documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Short HIIT bodyweight workouts; not an outdoor GPS running tracker.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/seven-7-minute-workout/id650276551"
        ],
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://seven.app/",
          "https://apps.apple.com/us/app/seven-7-minute-workout/id650276551"
        ],
        "evidenceClass": "Officially documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch app launches and guides short workouts; supported watchOS versions are listed in the store.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/seven-7-minute-workout/id650276551"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "App-store documented"
      }
    }
  },
  "home-workout-leap": {
    "name": "Home Workout – No Equipment",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment"
        ],
        "evidenceClass": "App-store documented"
      },
      "Recovery": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment"
        ],
        "evidenceClass": "App-store documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment"
        ],
        "evidenceClass": "App-store documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "HIIT/bodyweight routines are advertised; this is not evidence of GPS cardio tracking.",
        "sourceUrls": [
          "https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment"
        ],
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment"
        ],
        "evidenceClass": "App-store documented"
      },
      "Wearable integration": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment"
        ],
        "evidenceClass": "App-store documented"
      }
    }
  },
  "aldo-coach": {
    "name": "Aldo Coach",
    "checkedAt": "2026-11-05",
    "reviewScope": "Public English-language product/help pages and US store listings where linked; documentation review, not hands-on verification. Platform and paid-access limits are stated where established.",
    "sourcesChecked": [
      "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375"
    ],
    "features": {
      "Nutrition": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375"
        ],
        "evidenceClass": "App-store documented"
      },
      "Recovery": {
        "status": "Documented",
        "summary": "Release notes describe a Recovery strip using sleep, resting heart rate and HRV from Apple Health.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "App-store documented"
      },
      "Mindfulness": {
        "status": "Not established",
        "summary": "Not established in the public sources checked; this does not confirm absence.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375"
        ],
        "evidenceClass": "App-store documented"
      },
      "Cardio": {
        "status": "Documented",
        "summary": "Release notes describe runs/walks with GPS pace, distance, splits and heart-rate zones, plus pool laps on Apple Watch.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "App-store documented"
      },
      "Body composition": {
        "status": "Not established",
        "summary": "Reading body weight through Apple Health does not establish body-fat or lean-mass tracking.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375"
        ],
        "evidenceClass": "App-store documented"
      },
      "Wearable integration": {
        "status": "Documented",
        "summary": "Apple Watch set logging, haptic rest alerts, coaching replies, heart rate and cardio tracking; watchOS 10+.",
        "sourceUrls": [
          "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375"
        ],
        "platforms": [
          "iOS"
        ],
        "evidenceClass": "App-store documented"
      }
    }
  }
};
